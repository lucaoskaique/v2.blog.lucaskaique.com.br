mod git;
mod post;
mod rss;
mod translator;

use anyhow::{Context, Result};
use clap::{Parser, Subcommand};
use std::env;
use std::path::PathBuf;
use std::process::Command as StdCommand;

use git::{create_pull_request, Git};
use post::Post;
use rss::fetch_newsletter;
use translator::Translator;

#[derive(Parser)]
#[command(name = "twir")]
#[command(about = "This Week in Rust translation CLI", long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Check if there is a new Rust newsletter available
    Check {
        /// Show content preview
        #[arg(short, long)]
        verbose: bool,

        /// Specific edition number (e.g., 641)
        #[arg(short, long)]
        edition: Option<u32>,
    },
    /// Translate the latest newsletter and create a blog post
    Translate {
        /// Force translation even if post exists
        #[arg(short, long)]
        force: bool,

        /// Skip the check step
        #[arg(long)]
        skip_check: bool,

        /// Specific edition number (e.g., 641)
        #[arg(short, long)]
        edition: Option<u32>,
    },
    /// Create a pull request with the translated post
    Pr {
        /// Custom PR title
        #[arg(short, long)]
        title: Option<String>,

        /// Custom branch name
        #[arg(short, long)]
        branch: Option<String>,
    },
}

fn get_repo_root() -> Result<PathBuf> {
    let cwd = env::current_dir().context("Failed to get current directory")?;

    let output = StdCommand::new("git")
        .arg("-C")
        .arg(&cwd)
        .arg("rev-parse")
        .arg("--show-toplevel")
        .output();

    if let Ok(output) = output {
        if output.status.success() {
            let path = String::from_utf8(output.stdout)?;
            return Ok(PathBuf::from(path.trim()));
        }
    }

    // Fallback to current directory
    Ok(cwd)
}

async fn cmd_check(verbose: bool, edition: Option<u32>) -> Result<()> {
    if let Some(ed) = edition {
        println!("Fetching newsletter edition {} from RSS...", ed);
    } else {
        println!("Fetching latest newsletter from RSS...");
    }
    let newsletter = fetch_newsletter(edition).await?;

    let repo_root = get_repo_root()?;
    let posts_dir = repo_root.join("posts");

    let exists = newsletter.exists(&posts_dir);
    let status = if exists { "Already exists" } else { "New" };

    println!();
    println!("Newsletter found!");
    println!();
    if edition.is_some() {
        println!("Newsletter Edition {}:", edition.unwrap());
    } else {
        println!("Latest Newsletter:");
    }
    println!("--------------------------------------------------");
    println!("Title: {}", newsletter.title);
    println!("Link:  {}", newsletter.link);
    println!("Slug:  {}", newsletter.slug);
    println!("Published: {}", newsletter.published.format("%Y-%m-%d %H:%M:%S"));
    println!("Status: {}", status);
    println!("--------------------------------------------------");

    if verbose {
        println!();
        println!("Content Preview:");
        let preview = newsletter.description.chars().take(300).collect::<String>();
        println!("{}...", preview);
    }

    if exists {
        println!();
        println!("This newsletter has already been translated.");
        println!("Use --force with translate to override.");
        std::process::exit(1);
    }

    println!();
    println!("New newsletter available for translation.");

    Ok(())
}

async fn cmd_translate(force: bool, skip_check: bool, edition: Option<u32>) -> Result<()> {
    if let Some(ed) = edition {
        println!("Fetching newsletter edition {} from RSS...", ed);
    } else {
        println!("Fetching latest newsletter from RSS...");
    }
    let newsletter = fetch_newsletter(edition).await?;

    let repo_root = get_repo_root()?;
    let posts_dir = repo_root.join("posts");

    if !skip_check && newsletter.exists(&posts_dir) && !force {
        println!("Post already exists: {:?}", newsletter.post_path(&posts_dir));
        println!("Use --force to override.");
        std::process::exit(1);
    }

    let translator = Translator::new(true);
    let translated = translator
        .translate(&newsletter.description)
        .await
        .context("Translation failed")?;

    let post = Post::new(newsletter.clone(), translated);
    post.write_to_file(&posts_dir)
        .await
        .context("Failed to write post")?;

    println!();
    println!("Success!");
    println!("Post: {}", newsletter.title);
    println!("Path: {:?}", newsletter.post_path(&posts_dir));
    println!();
    println!("Next steps:");
    println!("  1. Review the translation");
    println!("  2. Run: twir pr");

    Ok(())
}

async fn cmd_pr(title: Option<String>, branch: Option<String>) -> Result<()> {
    let repo_root = get_repo_root()?;
    let git = Git::new(repo_root.to_string_lossy().to_string());

    let status_output = git.status_porcelain("posts/").await?;

    if status_output.trim().is_empty() {
        println!("No changes found in posts directory.");
        println!("Run: twir translate");
        std::process::exit(1);
    }

    let new_post = status_output
        .lines()
        .next()
        .and_then(|line| line.split_whitespace().nth(1))
        .context("Could not determine post file")?;

    // Read post title from file
    let post_path = repo_root.join(new_post);
    let post_content = std::fs::read_to_string(&post_path)
        .context("Failed to read post file")?;

    let post_title = post_content
        .lines()
        .find(|line| line.trim().starts_with("title:"))
        .and_then(|line| {
            line.split('"')
                .nth(1)
                .or_else(|| line.split('\'').nth(1))
        })
        .unwrap_or_else(|| {
            // Extract from filename
            post_path
                .file_stem()
                .and_then(|s| s.to_str())
                .unwrap_or("newsletter")
        });

    let slug = post_path
        .file_stem()
        .and_then(|s| s.to_str())
        .unwrap_or("newsletter");

    let branch_name = branch.unwrap_or_else(|| format!("twir/{}", slug));
    let commit_title = title.unwrap_or_else(|| format!("feat: add {} translation", post_title));

    let base_branch = git.current_branch().await?;

    // Try to create branch, if it fails, checkout existing
    if git.checkout_branch(&branch_name, true).await.is_err() {
        git.checkout_branch(&branch_name, false).await?;
    }

    git.add(new_post).await?;
    git.commit(&commit_title).await?;
    git.push(&branch_name).await?;

    let pr_body = format!(
        r#"## New translation: This Week in Rust

This PR adds the Brazilian Portuguese translation for **{}**.

### Checklist
- [x] Content translated automatically
- [ ] Manual review pending
- [ ] Links verified
- [ ] Markdown formatting verified

### File
- `{}`

---
*This PR was created automatically by the twir Rust CLI.*"#,
        post_title, new_post
    );

    create_pull_request(&commit_title, &pr_body, &base_branch).await?;

    println!();
    println!("Pull request created successfully!");

    Ok(())
}

#[tokio::main]
async fn main() -> Result<()> {
    let cli = Cli::parse();

    match cli.command {
        Commands::Check { verbose, edition } => cmd_check(verbose, edition).await?,
        Commands::Translate { force, skip_check, edition } => cmd_translate(force, skip_check, edition).await?,
        Commands::Pr { title, branch } => cmd_pr(title, branch).await?,
    }

    Ok(())
}

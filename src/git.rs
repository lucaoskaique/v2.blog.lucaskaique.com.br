use anyhow::{Context, Result};
use std::process::Stdio;
use tokio::process::Command;

pub struct Git {
    repo_root: String,
}

impl Git {
    pub fn new(repo_root: String) -> Self {
        Self { repo_root }
    }

    pub async fn status_porcelain(&self, path: &str) -> Result<String> {
        let output = Command::new("git")
            .arg("-C")
            .arg(&self.repo_root)
            .arg("status")
            .arg("--porcelain")
            .arg(path)
            .output()
            .await
            .context("Failed to run git status")?;

        if !output.status.success() {
            anyhow::bail!("git status failed");
        }

        Ok(String::from_utf8(output.stdout)?)
    }

    pub async fn current_branch(&self) -> Result<String> {
        let output = Command::new("git")
            .arg("-C")
            .arg(&self.repo_root)
            .arg("branch")
            .arg("--show-current")
            .output()
            .await
            .context("Failed to get current branch")?;

        if !output.status.success() {
            anyhow::bail!("Failed to get current branch");
        }

        Ok(String::from_utf8(output.stdout)?.trim().to_string())
    }

    pub async fn checkout_branch(&self, branch: &str, create: bool) -> Result<()> {
        let mut cmd = Command::new("git");
        cmd.arg("-C")
            .arg(&self.repo_root)
            .arg("checkout");

        if create {
            cmd.arg("-b");
        }

        cmd.arg(branch);

        let status = cmd
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .status()
            .await
            .context("Failed to checkout branch")?;

        if !status.success() {
            anyhow::bail!("Failed to checkout branch {}", branch);
        }

        Ok(())
    }

    pub async fn add(&self, path: &str) -> Result<()> {
        let status = Command::new("git")
            .arg("-C")
            .arg(&self.repo_root)
            .arg("add")
            .arg(path)
            .status()
            .await
            .context("Failed to git add")?;

        if !status.success() {
            anyhow::bail!("git add failed");
        }

        Ok(())
    }

    pub async fn commit(&self, message: &str) -> Result<()> {
        let status = Command::new("git")
            .arg("-C")
            .arg(&self.repo_root)
            .arg("commit")
            .arg("-m")
            .arg(message)
            .status()
            .await
            .context("Failed to git commit")?;

        if !status.success() {
            anyhow::bail!("git commit failed");
        }

        Ok(())
    }

    pub async fn push(&self, branch: &str) -> Result<()> {
        let status = Command::new("git")
            .arg("-C")
            .arg(&self.repo_root)
            .arg("push")
            .arg("-u")
            .arg("origin")
            .arg(branch)
            .status()
            .await
            .context("Failed to git push")?;

        if !status.success() {
            anyhow::bail!("git push failed");
        }

        Ok(())
    }
}

pub async fn create_pull_request(
    title: &str,
    body: &str,
    base_branch: &str,
) -> Result<()> {
    let status = Command::new("gh")
        .arg("pr")
        .arg("create")
        .arg("--title")
        .arg(title)
        .arg("--body")
        .arg(body)
        .arg("--base")
        .arg(base_branch)
        .status()
        .await
        .context("Failed to create pull request")?;

    if !status.success() {
        anyhow::bail!("Failed to create pull request");
    }

    Ok(())
}

use anyhow::{Context, Result};
use chrono::{DateTime, Utc};
use regex::Regex;
use serde::Deserialize;
use std::path::{Path, PathBuf};

const RSS_URL: &str = "https://this-week-in-rust.org/rss.xml";

#[derive(Debug, Clone)]
pub struct Newsletter {
    pub title: String,
    pub link: String,
    pub slug: String,
    pub description: String,
    pub published: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
struct RssChannel {
    item: Vec<RssItem>,
}

#[derive(Debug, Deserialize)]
struct RssItem {
    title: String,
    link: String,
    description: Option<String>,
    #[serde(rename = "pubDate")]
    pub_date: Option<String>,
}

#[derive(Debug, Deserialize)]
struct Rss {
    channel: RssChannel,
}

impl Newsletter {
    pub fn post_path(&self, posts_dir: &Path) -> PathBuf {
        posts_dir.join(format!("{}.md", self.slug))
    }

    pub fn exists(&self, posts_dir: &Path) -> bool {
        self.post_path(posts_dir).exists()
    }
}

pub async fn fetch_newsletter(edition: Option<u32>) -> Result<Newsletter> {
    let response = reqwest::get(RSS_URL)
        .await
        .context("Failed to fetch RSS feed")?;

    let body = response
        .text()
        .await
        .context("Failed to read RSS response body")?;

    let rss: Rss = quick_xml::de::from_str(&body).context("Failed to parse RSS XML")?;

    let item = if let Some(edition_num) = edition {
        // Find specific edition
        rss.channel
            .item
            .into_iter()
            .find(|item| {
                item.title
                    .to_lowercase()
                    .contains(&format!("rust {}", edition_num))
            })
            .with_context(|| format!("Edition {} not found in RSS feed", edition_num))?
    } else {
        // Get latest
        rss.channel
            .item
            .into_iter()
            .next()
            .context("No items found in RSS feed")?
    };

    let title = item.title;
    let link = item.link;
    let description = item
        .description
        .unwrap_or_default()
        .trim()
        .to_string();

    let description = html_escape::decode_html_entities(&description).to_string();

    let published = if let Some(pub_date) = item.pub_date {
        DateTime::parse_from_rfc2822(&pub_date)
            .ok()
            .map(|dt| dt.with_timezone(&Utc))
            .unwrap_or_else(Utc::now)
    } else {
        Utc::now()
    };

    let slug = create_slug(&title);

    Ok(Newsletter {
        title,
        link,
        slug,
        description,
        published,
    })
}

pub fn create_slug(title: &str) -> String {
    let slug = title.to_lowercase().trim().to_string();
    
    // Replace whitespace with hyphens
    let re_spaces = Regex::new(r"\s+").unwrap();
    let slug = re_spaces.replace_all(&slug, "-");
    
    // Remove non-alphanumeric characters except hyphens
    let re_chars = Regex::new(r"[^a-z0-9-]").unwrap();
    let slug = re_chars.replace_all(&slug, "");
    
    // Replace multiple hyphens with single hyphen
    let re_hyphens = Regex::new(r"-+").unwrap();
    let slug = re_hyphens.replace_all(&slug, "-");
    
    // Remove leading/trailing hyphens
    let re_trim = Regex::new(r"^-+|-+$").unwrap();
    let slug = re_trim.replace_all(&slug, "");
    
    slug.to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_slug() {
        assert_eq!(
            create_slug("This Week in Rust 574"),
            "this-week-in-rust-574"
        );
        assert_eq!(
            create_slug("Hello World! 123"),
            "hello-world-123"
        );
        assert_eq!(
            create_slug("  Multiple   Spaces  "),
            "multiple-spaces"
        );
    }
}

use anyhow::{Context, Result};
use std::fs;
use std::path::Path;

use crate::rss::Newsletter;

pub struct Post {
    pub newsletter: Newsletter,
    pub translated_content: String,
}

impl Post {
    pub fn new(newsletter: Newsletter, translated_content: String) -> Self {
        Self {
            newsletter,
            translated_content,
        }
    }

    pub async fn write_to_file(&self, posts_dir: &Path) -> Result<()> {
        fs::create_dir_all(posts_dir).context("Failed to create posts directory")?;

        let post_path = self.newsletter.post_path(posts_dir);

        let content = self.generate_frontmatter();

        fs::write(&post_path, content)
            .with_context(|| format!("Failed to write post to {:?}", post_path))?;

        Ok(())
    }

    fn generate_frontmatter(&self) -> String {
        let title = self.escape_yaml(&self.newsletter.title);
        let description = format!("Traducao em portugues da newsletter {}", self.newsletter.title);
        let description = self.escape_yaml(&description);
        let datetime = self.newsletter.published.format("%Y-%m-%d %H:%M:%S");

        let body_with_footer = format!(
            "{}

---

*Artigo original: [{}]({})*

*Traduzido automaticamente por IA. Para sugestoes de melhorias, abra uma issue no repositorio.*",
            self.translated_content, self.newsletter.link, self.newsletter.link
        );

        let body_indented = body_with_footer
            .lines()
            .map(|line| format!("    {}", line))
            .collect::<Vec<_>>()
            .join("\n");

        format!(
            "---\npt-BR:\n  title: \"{}\"\n  description: \"{}\"\n  body: >-\n{}\n  date: {}\n  image: /images/ESSA-SEMANA-COM-RUST-FINAL.png\n  main-class: rust\n  color: \"#CE422B\"\n  tags:\n    - rust\n    - newsletter\n    - this-week-in-rust\n    - traducao\nen:\n  title: \"{}\"\n  description: \"Original newsletter link\"\n  body: >-\n    *Original post: [{}]({})*\n---\n",
            title,
            description,
            body_indented,
            datetime,
            title,
            self.newsletter.link,
            self.newsletter.link
        )
    }

    fn escape_yaml(&self, s: &str) -> String {
        s.replace('"', r#"\""#)
    }
}

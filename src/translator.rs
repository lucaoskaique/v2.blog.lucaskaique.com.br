use anyhow::{Context, Result};
use std::io::Write;
use std::process::Stdio;
use tokio::io::{AsyncBufReadExt, BufReader};
use tokio::process::Command;

pub struct Translator {
    show_progress: bool,
}

impl Translator {
    pub fn new(show_progress: bool) -> Self {
        Self { show_progress }
    }

    pub async fn translate(&self, content: &str) -> Result<String> {
        let prompt = format!(
            r#"Translate the following "This Week in Rust" newsletter content from English to Brazilian Portuguese.

IMPORTANT RULES:
- Keep all links unchanged
- Keep all markdown formatting (headings, lists, code blocks, etc)
- Keep project names, libraries, and technical terms in English
- Translate only descriptive and explanatory text
- Preserve the document structure
- Output only the translation, no labels or preamble

Content:
{}"#,
            content
        );

        if self.show_progress {
            println!("Starting translation with opencode...");
            println!();
        }

        let mut child = Command::new("opencode")
            .arg("run")
            .arg(&prompt)
            .stdout(Stdio::piped())
            .stderr(Stdio::piped())
            .spawn()
            .context("Failed to spawn opencode process")?;

        let stdout = child
            .stdout
            .take()
            .context("Failed to capture stdout")?;

        let mut reader = BufReader::new(stdout).lines();
        let mut result = String::new();

        if self.show_progress {
            print!("Translating");
            std::io::stdout().flush().ok();
        }

        while let Some(line) = reader.next_line().await? {
            result.push_str(&line);
            result.push('\n');

            if self.show_progress {
                print!(".");
                std::io::stdout().flush().ok();
            }
        }

        if self.show_progress {
            println!();
            println!();
        }

        let status = child
            .wait()
            .await
            .context("Failed to wait for opencode process")?;

        if !status.success() {
            anyhow::bail!("Translation failed with exit code: {:?}", status.code());
        }

        Ok(result.trim().to_string())
    }
}

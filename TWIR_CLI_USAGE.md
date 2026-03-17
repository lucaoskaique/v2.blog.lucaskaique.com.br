# TWIR Rust CLI - Usage Examples

## Quick Start

```bash
# Build and install
./install-twir.sh

# Or build manually
cargo build --release
```

## Basic Commands

### 1. Check for New Newsletter

```bash
# Basic check
twir check
```

Output:
```
Fetching latest newsletter from RSS...

Newsletter found!

Latest Newsletter:
--------------------------------------------------
Title: This Week in Rust 642
Link:  https://this-week-in-rust.org/blog/2026/03/11/this-week-in-rust-642/
Slug:  this-week-in-rust-642
Published: 2026-03-11 04:00:00
Status: New
--------------------------------------------------

New newsletter available for translation.
```

### 2. Check with Content Preview

```bash
# Show content preview
twir check --verbose
```

Output includes a 300-character preview of the content.

### 3. Translate Newsletter

```bash
# Translate the latest newsletter
twir translate
```

Output:
```
Fetching latest newsletter from RSS...
Starting translation with opencode...

Translating...............................

Success!
Post: This Week in Rust 642
Path: "/path/to/posts/this-week-in-rust-642.md"

Next steps:
  1. Review the translation
  2. Run: twir pr
```

### 4. Force Translation (Overwrite Existing)

```bash
# Force translation even if post exists
twir translate --force
```

### 5. Translate Without Initial Check

```bash
# Skip the existence check
twir translate --skip-check
```

### 6. Create Pull Request

```bash
# Create PR with auto-generated title and branch
twir pr
```

Output:
```
Pull request created successfully!
```

### 7. Custom PR Title and Branch

```bash
# Custom title and branch name
twir pr --title "feat: add TWIR 642 translation" --branch "twir/custom-642"
```

## Complete Workflow

### Typical Usage

```bash
# 1. Check if there's a new newsletter
twir check

# 2. If new, translate it
twir translate

# 3. Review the generated post
cat posts/this-week-in-rust-*.md

# 4. Create a pull request
twir pr
```

### One-Line Workflow

```bash
# Check, translate, and create PR in sequence
twir check && twir translate && twir pr
```

## Advanced Usage

### Multiple Newsletters

```bash
# Check current status
twir check

# Translate older newsletter (manual editing needed)
# Edit the RSS URL in src/rss.rs if needed
```

### Custom Post Directory

The CLI automatically detects the repository root and uses `posts/` directory.
To change this, modify `src/main.rs`:

```rust
let posts_dir = repo_root.join("content/posts"); // Custom path
```

### Debugging

```bash
# Set RUST_LOG for detailed logs
RUST_LOG=debug twir check

# Or for even more detail
RUST_LOG=trace twir translate
```

## Integration with CI/CD

### GitHub Actions

```yaml
- name: Install Rust CLI
  run: |
    cargo build --release
    
- name: Check for new newsletter
  id: check
  run: |
    ./target/release/twir check
  continue-on-error: true

- name: Translate if new
  if: steps.check.outcome == 'success'
  run: |
    ./target/release/twir translate
```

### Local Automation (cron)

```bash
# Add to crontab
# Run every Wednesday at 12:00 PM
0 12 * * 3 cd /path/to/repo && /usr/local/bin/twir translate && /usr/local/bin/twir pr
```

## Error Handling

### Common Errors

#### 1. Newsletter Already Exists

```bash
twir translate
# Error: Post already exists: posts/this-week-in-rust-642.md
# Use --force to override.

# Solution:
twir translate --force
```

#### 2. No Changes to Commit

```bash
twir pr
# No changes found in posts directory.
# Run: twir translate

# Solution:
twir translate
```

#### 3. OpenCode Not Found

```bash
twir translate
# Error: 'opencode' is required but not installed

# Solution:
# Install opencode CLI
npm install -g @opencode/cli
```

#### 4. Git Repository Not Found

```bash
twir check
# Failed to get repository root

# Solution:
# Make sure you're in a git repository
git init
```

## Performance Tips

### 1. Build with Native CPU Optimizations

```bash
# Already configured in .cargo/config.toml
cargo build --release
```

### 2. Pre-compile for Multiple Architectures

```bash
# Linux x86_64
cargo build --release --target x86_64-unknown-linux-gnu

# macOS
cargo build --release --target x86_64-apple-darwin

# Windows
cargo build --release --target x86_64-pc-windows-msvc
```

### 3. Strip Binary for Minimal Size

```bash
# Already configured in Cargo.toml
strip target/release/twir
```

## Comparison with Bash Version

| Command | Bash | Rust | Notes |
|---------|------|------|-------|
| `check` | `./twir check` | `twir check` | Same interface |
| `translate` | `./twir translate` | `twir translate` | Rust shows streaming progress |
| `pr` | `./twir pr` | `twir pr` | Same interface |
| Help | `./twir --help` | `twir --help` | Rust has better formatting |

The Rust version is **drop-in compatible** with the bash version!

## Troubleshooting

### Build Issues

```bash
# Clean and rebuild
cargo clean
cargo build --release

# Update dependencies
cargo update
cargo build --release
```

### Runtime Issues

```bash
# Check dependencies
which git
which gh
which opencode

# Test git authentication
gh auth status

# Test opencode
opencode run "translate hello to portuguese"
```

## Contributing

To contribute to the Rust CLI:

1. Make changes to `src/` files
2. Test locally: `cargo test`
3. Build: `cargo build --release`
4. Test the binary: `./target/release/twir check`
5. Submit a PR

## License

Same as the main repository.

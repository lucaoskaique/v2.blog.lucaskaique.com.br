#!/usr/bin/env bash
set -euo pipefail

echo "Building TWIR Rust CLI..."
cargo build --release

echo ""
echo "Build complete!"
echo ""
echo "You can now use the CLI:"
echo "  ./target/release/twir --help"
echo ""
echo "To install globally, copy the binary to your PATH:"
echo "  sudo cp target/release/twir /usr/local/bin/"
echo ""
echo "Or create a symlink:"
echo "  ln -sf $(pwd)/target/release/twir /usr/local/bin/twir"

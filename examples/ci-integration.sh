#!/usr/bin/env bash
set -euo pipefail

echo "⚡ Running TurboForge CI validation pipeline..."
node dist/bin.js --version
echo "✔ TurboForge executable verified."

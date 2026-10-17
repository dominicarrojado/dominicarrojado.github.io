#!/usr/bin/env bash
# Generates a .webp next to every project screenshot (served via <picture>).
# Requires cwebp (brew install webp). Re-run after adding or changing images.
set -euo pipefail

cd "$(dirname "$0")/../public/images"

for file in projects/*.png; do
  cwebp -quiet -q 80 "$file" -o "${file%.*}.webp"
done

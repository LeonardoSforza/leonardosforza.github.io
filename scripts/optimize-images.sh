#!/usr/bin/env bash
# Strip EXIF/GPS from images under public/letters and public/entries.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="${1:-$ROOT/public}"

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 required"
  exit 1
fi

python3 - <<PY
from pathlib import Path
import sys

try:
    from PIL import Image
    import piexif
except ImportError:
    print("Install pillow + piexif in a venv, or skip optimize.")
    sys.exit(0)

root = Path(${repr('${TARGET}')})
exts = {'.jpg', '.jpeg', '.png', '.webp'}
count = 0
for path in root.rglob('*'):
    if path.suffix.lower() not in exts:
        continue
    try:
        img = Image.open(path)
        data = list(img.getdata())
        clean = Image.new(img.mode, img.size)
        clean.putdata(data)
        if path.suffix.lower() in {'.jpg', '.jpeg'}:
            clean.save(path, quality=92, optimize=True, exif=b'')
        else:
            clean.save(path, optimize=True)
        count += 1
    except Exception as e:
        print(f"skip {path}: {e}")
print(f"Optimized {count} images under {root}")
PY

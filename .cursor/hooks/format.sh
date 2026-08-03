#!/usr/bin/env bash
# Format edited source files with Prettier when applicable.
set -euo pipefail

input=$(cat)
file=$(printf '%s' "$input" | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d.get("file_path") or d.get("path") or "")' 2>/dev/null || true)

if [[ -z "$file" || ! -f "$file" ]]; then
	exit 0
fi

case "$file" in
	*.astro|*.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs|*.css|*.json|*.md|*.mdoc|*.yml|*.yaml)
		if [[ -x node_modules/.bin/prettier ]] || command -v npx >/dev/null 2>&1; then
			npx prettier --write "$file" >/dev/null 2>&1 || true
		fi
		;;
esac

exit 0

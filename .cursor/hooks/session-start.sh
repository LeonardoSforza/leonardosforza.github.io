#!/usr/bin/env bash
# Inject a short reminder about the local → PR content workflow.
set -euo pipefail
cat >/dev/null
printf '%s\n' '{"additional_context":"Leonardo Sforza letters: edit via /keystatic or src/content/**/*.mdoc locally, then branch → commit → PR. Keystatic is dev-only; production is static GitHub Pages. Logo: public/brand/logo.svg. Sahaj Work status is a placeholder only."}'

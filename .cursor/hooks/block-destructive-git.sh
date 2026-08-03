#!/usr/bin/env bash
# Ask before destructive git operations.
set -euo pipefail

input=$(cat)
command=$(printf '%s' "$input" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("command",""))' 2>/dev/null || true)

if [[ "$command" =~ git[[:space:]]+push[[:space:]]+.*(--force|--force-with-lease) ]] ||
	[[ "$command" =~ git[[:space:]]+reset[[:space:]]+--hard ]] ||
	[[ "$command" =~ git[[:space:]]+clean[[:space:]]+-[a-zA-Z]*f ]]; then
	python3 - <<'PY'
import json
print(json.dumps({
  "permission": "ask",
  "user_message": "This looks like a destructive git command. Confirm before continuing.",
  "agent_message": "Hook flagged a potentially destructive git command (force push, hard reset, or clean -f)."
}))
PY
	exit 0
fi

printf '%s\n' '{"permission":"allow"}'
exit 0

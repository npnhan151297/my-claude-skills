#!/bin/bash
# Install this repo's skills (.claude/skills/*) and the official Remotion skills into ~/.claude/skills.
# Sessions that open this repo already load .claude/skills; this script covers environments without the repo.
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
mkdir -p ~/.claude/skills
for d in "$DIR"/.claude/skills/*/ "$DIR"/*/; do
  [ -f "$d/SKILL.md" ] && cp -r "$d" ~/.claude/skills/
done
TMP="$(mktemp -d)"
if git clone -q --depth 1 https://github.com/remotion-dev/skills "$TMP/remotion"; then
  for d in "$TMP"/remotion/skills/*/; do
    [ -f "$d/SKILL.md" ] && cp -r "$d" ~/.claude/skills/
  done
else
  echo "Warning: could not fetch Remotion skills" >&2
fi
rm -rf "${TMP:?}"
echo "Installed skills: $(ls ~/.claude/skills | wc -l)"

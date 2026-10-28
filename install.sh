#!/bin/bash
# Copy every skill folder in this repo into ~/.claude/skills
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
mkdir -p ~/.claude/skills
for d in "$DIR"/*/; do
  [ -f "$d/SKILL.md" ] && cp -r "$d" ~/.claude/skills/
done
echo "Installed skills: $(ls ~/.claude/skills | tr '\n' ' ')"

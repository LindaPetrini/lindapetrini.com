#!/bin/bash
set -e

# Copy credentials from read-only host mount to writable user location
if [ -f /tmp/claude-creds/.credentials.json ]; then
  mkdir -p /home/claude/.claude
  cp /tmp/claude-creds/.credentials.json /home/claude/.claude/.credentials.json
  chown claude:claude /home/claude/.claude/.credentials.json
  chmod 600 /home/claude/.claude/.credentials.json
fi

# Drop to claude user and run command
exec gosu claude "$@"

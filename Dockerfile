FROM node:20-bookworm-slim

# Install gosu, ca-certificates, git
RUN apt-get update && apt-get install -y --no-install-recommends \
    gosu \
    ca-certificates \
    git \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user (required for --dangerously-skip-permissions)
RUN useradd -m -s /bin/bash claude && \
    mkdir -p /home/claude/.claude /workspace && \
    chown -R claude:claude /home/claude /workspace

# Install Claude Code globally (accessible to all users)
RUN npm install -g @anthropic-ai/claude-code

# Entrypoint runs as root briefly to copy credentials, then drops to claude
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

WORKDIR /workspace
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["sleep", "infinity"]

// Text people copy from the Reflex docs.

export const CLAUDE_ADD = `claude mcp add reflex -- npx -y "github:JohanSardar/reflex#npx" mcp`;

export const CODEX_BLOCK = `[mcp_servers.reflex]
command = "npx"
args = ["-y", "github:JohanSardar/reflex#npx", "mcp"]
tool_timeout_sec = 300`;

export const CLAUDE_PROMPT = `Set up Reflex so I can send drawings and speech from my iPad to you.

1. Check that Node.js 22 or later and Git are installed. If either is missing, stop and tell me.
2. In this folder, run
   ${CLAUDE_ADD}
3. Run \`claude mcp get reflex\` and confirm it shows a stdio server with the command npx.
4. Tell me to start a new Claude Code session in this folder and say "connect my iPad". The server loads only in a new session, so do not try to pair in this one.`;

export const CODEX_PROMPT = `Set up Reflex so I can send drawings and speech from my iPad to you.

1. Check that Node.js 22 or later and Git are installed. If either is missing, stop and tell me.
2. Add this block to ~/.codex/config.toml. If a [mcp_servers.reflex] block is already there, replace it and keep only one.

   [mcp_servers.reflex]
   command = "npx"
   args = ["-y", "github:JohanSardar/reflex#npx", "mcp"]
   tool_timeout_sec = 300

3. Tell me to start a new Codex session and say "connect my iPad to Reflex". The server loads only in a new session, so do not try to pair in this one.`;

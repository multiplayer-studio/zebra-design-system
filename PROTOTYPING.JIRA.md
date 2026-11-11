# Prototyping with Jira

Prototypes can be linked to a Jira ticket. Follow this at the start of every new prototype.

## 1. Ask for the ticket

Before building anything, ask: "Is there a Jira ticket for this prototype? If so, what's the key (e.g. `PROJ-123`)?" Ask only this, in a message of its own. The GitHub question (`PROTOTYPING.GITHUB.md`) comes after the designer answers, in a separate message.

- If the designer has none, or says skip, build the prototype as normal and don't ask again in this conversation.
- If they give a key, continue below.

## 2. Use the Jira MCP

Check whether the `zebra-jira` MCP tools are available (`jira_get_issue`, `jira_add_comment`).

**If they are:**
1. Call `jira_get_issue` with the key. Confirm the ticket title with the designer, and use its summary and description as the brief, alongside what the designer tells you. If the two disagree, ask.
2. When the designer is happy with the prototype, ask before posting, then call `jira_add_comment` with: what the prototype shows, the screens and states it covers, anything faked or left out, any draft components with placeholder measurements, and its path (`prototypes/<name>/index.html`).
3. The MCP can't attach files. Tell the designer to attach the file `prototypes/<name>/index.html` to the ticket themselves if they want it there, and give them the ticket link as a clickable URL: `https://jira.zebra.com/browse/<KEY>` (e.g. `https://jira.zebra.com/browse/PROJ-123`).

**If they aren't** (no tools, or a call fails with an auth or connection error): say so, give the designer the setup steps below, and carry on building the prototype without Jira. Never ask for or store their token in a chat, file or prototype.

## Setting up the zebra-jira MCP

Give these steps to the designer as written. They need [Node.js](https://nodejs.org) (LTS) installed, which the MCP server runs on. This is the only exception to "never ask the user to install Node" in `PROTOTYPING.AGENTS.md`, and only when they want Jira.

1. **Create a Jira token.** In Jira (`https://jira.zebra.com`), click your avatar → **Profile** → **Personal Access Tokens** → **Create token**. Give it a name, copy the token, and keep it private.
2. **Open the Claude config.** In the Claude desktop app, go to **Settings** → **Developer** → **Edit Config**. This opens `claude_desktop_config.json`.
3. **Add the server.** Put this inside the file, replacing `YOUR_TOKEN` with your token. If the file already has a `"mcpServers"` section, add only the `"zebra-jira"` entry to it.
   ```json
   {
     "mcpServers": {
       "zebra-jira": {
         "command": "npx",
         "args": ["-y", "mcp-jira-server"],
         "env": {
           "JIRA_BASE_URL": "https://jira.zebra.com",
           "JIRA_PAT": "YOUR_TOKEN"
         }
       }
     }
   }
   ```
4. **Restart Claude** fully (quit and reopen), then open the prototyping folder again and say: **"Link this prototype to PROJ-123."**

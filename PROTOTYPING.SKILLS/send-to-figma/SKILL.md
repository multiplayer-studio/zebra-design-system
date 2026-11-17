---
name: send-to-figma
description: Send a finished prototype to a Figma file, as editable design layers or a clickable code layer, through the Figma MCP. Use when a prototype is done and the designer is happy with it (offer it then), or whenever the designer asks to put a prototype in Figma.
---

# Send a prototype to Figma

A finished prototype can be sent to a Figma file. Follow this whenever a prototype is done.

## 1. Offer it

When the designer is happy with a prototype, ask with the question prompt (see Asking the designer in `PROTOTYPING.AGENTS.md`): "Do you want this prototype in Figma too?" (**Yes** / **No**). Ask the questions below the same way.

- If they say no, stop. Don't offer again for that prototype unless they ask.
- If they say yes, continue below.

## 2. Ask where it should go

Ask for the link to the Figma file where they want the design (offer **Create a new file**; they paste a link in the prompt's text field), e.g. `https://www.figma.com/design/<fileKey>/<name>`. If they want it on a particular page or inside a particular frame, they can copy the link to that page or frame (right-click → **Copy link to selection**), which adds `?node-id=…`.

- If they have no file, offer to create a new Figma Design file instead, and ask what to call it.
- If the link isn't a `figma.com/design/` (or `figma.com/file/`) link, say so and ask again.

Then ask which output they want, unless they've already said:
- **Editable design layers** (the usual choice): frames and layers they can edit in Figma.
- **A code layer**: the working HTML prototype, clickable inside Figma.

## 3. Use the Figma MCP

Check whether the Figma MCP tools are available (e.g. `whoami`, `html_to_figma`, `send_code_to_figma`, `create_new_file`). Follow each tool's own description and its returned next steps; don't guess its parameters.

**If they are:**
- **Editable design layers:** call `html_to_figma` with `prototypes/<name>/index.html` and the designer's link. If the tool needs a self-contained page, make a temporary copy with `tokens.css` inlined. Never change the prototype itself.
- **Code layer:** call `whoami` first. Use `send_code_to_figma` with the prototype folder and the link. If code layers aren't enabled for their account, say so and offer editable design layers instead.
- **New file:** call `create_new_file` (Design file) first, then continue as above.
- When it's done, give the designer the link to the result as a clickable URL, and say anything that didn't come across (e.g. states that only exist when you click, or icons shown as text).

**If they aren't** (no tools, or a call fails with an auth or connection error): say so, give the designer the setup steps below, and keep the prototype as it is.

## Setting up Figma in Claude

Give these steps to the designer as written. No extra software is needed.

1. In the Claude desktop app, go to **Settings** → **Connectors**.
2. Find **Figma** and click **Connect**. If it isn't listed, choose **Add custom connector**, name it `Figma` and use the URL `https://mcp.figma.com/mcp`.
3. Sign in to Figma in the window that opens and click **Allow access**.
4. Back in the chat, say: **"Send this prototype to Figma."**

They need edit access to the Figma file they want the design in.

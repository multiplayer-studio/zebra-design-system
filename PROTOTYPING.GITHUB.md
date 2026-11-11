# Prototyping with GitHub

A prototype for a project that's already in flight should fit the real app: its screens, navigation, layouts, copy and data. Follow this at the start of every new prototype, after the Jira step in `PROTOTYPING.JIRA.md`. Ask the Jira question on its own and wait for the answer (and read the ticket, if there is one) before asking anything here, in a new message. Never ask about Jira and GitHub in the same message.

Claude reads the project's code from a copy the designer downloads from GitHub into this folder. That needs no connector, token or install, and it works for any private repo the designer can open on GitHub.

## 1. Find the repo

Work through these in order and stop at the first that applies:

1. **`github.json` at the kit root** (`{ "repo": "owner/name", "branch": "main", "path": "design-system" }`): ask "Is this prototype for `<repo>`?"
2. **A GitHub link in the Jira ticket** you just read: ask "The ticket links to `<repo>`. Is that the project's repo?"
3. **Otherwise ask:** "Is there a GitHub repo for the project this prototype belongs to? If so, paste its link (a branch or pull-request link works too)."

- If the designer has none, or says skip, build the prototype as normal and don't ask again in this conversation.
- Accept `https://github.com/<owner>/<repo>`, `…/tree/<branch>` (use that branch) and `…/pull/<number>` (use that pull request's branch). Otherwise use the branch in `github.json`, or `main`. If the link is anything else, say so and ask again.
- When the designer confirms a new repo, or says it has changed, write `github.json` with the repo and its branch. A branch or pull request they give is for this prototype only, unless they say it's the project's working branch. Never write anything else to `github.json`.

## 2. Get a copy

If `github/` already has a folder for that repo and branch (`github/<repo>-<branch>/`, with any `/` in the branch name as `-`), tell the designer when it was downloaded (the folder's date) and ask whether that's recent enough. If it is, go to step 3.

Otherwise give them these steps as written, filling in the link:

1. Open **`https://github.com/<owner>/<repo>/archive/refs/heads/<branch>.zip`** in your browser, signed in to GitHub. It downloads the code as a `.zip`. (For a pull request, the branch name is shown at the top of the pull request page. Or, on GitHub, pick the branch and click **Code** → **Download ZIP**.)
2. Drag the downloaded `.zip` into this chat. Don't unzip it; Claude does that.
3. If Claude says it can't open a file dropped into the chat, drag the `.zip` into this kit's folder instead (in Finder or File Explorer), then say: **"The zip is in the kit folder."**

Then put it in place yourself. If a step fails, give the designer the manual steps below.
- **Find the zip:** use the path of the file dropped into the chat. If the drop gave you no path, look for a `.zip` at the kit root and in `github/`. If there's none, or more than one, ask.
- **Check it:** its top-level folder should be `<repo>-<branch>`. If it's a different repo, say so and ask.
- **Unzip it into `github/`** (create it if it's missing), replacing any older copy of the same repo and branch: `unzip -q -o <zip> -d github` on a Mac, `tar -xf <zip> -C github` on Windows. The designer may need to click **Allow**.
- **Delete the `.zip`** if it was in the kit folder. Leave one dropped from elsewhere where it is.

Manual steps, only if unzipping fails: unzip it by double-clicking on a Mac, or on Windows right-click → **Extract All…** → **Extract**. Move the unzipped folder into the `github` folder inside this kit's folder (create `github` if it's missing), replacing any older copy. Then say: **"The repo is in the github folder."**

If the link gives a 404, the designer can't see that repo: they need read access, which the project's developer can arrange. Until then, offer to work from screenshots of the live app pasted into the chat, or build the prototype without repo context.

## 3. Read it

Once it's unzipped, the copy is **reference only.** Never edit, move, run or install anything in `github/`, and never run its scripts or package installs.

Read only what the brief needs. Don't read the whole repo:
- the README, then the routes or pages and the navigation, so you know which screens exist and how they connect;
- the screens closest to the brief and the shared layout around them (header, side navigation, page shell);
- the copy those screens use (including translation files), and their data shapes (types, mock data, fixtures);
- the empty, loading and error states they already handle.

Skip the repo's design-system folder (`path` in `github.json`, else `design-system/`; this kit's docs are the source), dependencies (`node_modules/` and the like) and build output.

## 4. Write the context note

Write `prototypes/<name>/CONTEXT.md` with:
- **Source:** the repo, the branch or pull request, and the date the copy was downloaded. Note that it's a snapshot that doesn't update when the repo changes.
- **Screens and flow:** the screens this prototype touches and how the user gets to and from them.
- **Layout:** how those screens are arranged, and the Zebra component that fills each part.
- **Content:** real labels, field names and data shapes to use as mock data.
- **States:** the empty, loading and error states the app already has.
- **Design system gaps:** wherever the live app uses colours, components or patterns that aren't in this design system, and what the prototype uses instead.

Give the designer a short summary in the chat and ask them to confirm it before you build. If they correct it, update the note.

`CONTEXT.md` may hold details of private code. Keep it in the prototype folder: never add it to a Jira comment, and never send it to Figma.

## 5. Build

Take structure, flow and content from the repo. Build only with this design system: every rule in `PROTOTYPING.AGENTS.md` still applies, so never copy a colour, size or component from the live app. Name each difference from the live app in your reply, as well as under Design system gaps.

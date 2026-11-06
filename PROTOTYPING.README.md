# Prototyping the Zebra Design System with Claude

Describe a screen in plain English and Claude builds a clickable prototype using the Zebra Design System you can see right in the Claude app. You don't need to write any code.

---

## Step 1: Set up (one time)

1. **Unzip `zebra-design-system-prototyping.zip`.**
   - **Mac:** double-click the `.zip` file. A `zebra-design-system-prototyping` folder appears next to it.
   - **Windows:** right-click the `.zip`, choose **Extract All…**, then **Extract**.
2. **Move the unzipped folder somewhere easy to find**, like Documents. Don't work from inside the `.zip` file.
3. **Open the Claude desktop app** and sign in. If you don't have it yet, download it from [claude.com/download](https://claude.com/download).

---

## Step 2: Open the folder in Claude

1. In the Claude app, open a new chat.
2. Click on the button with the folder icon above the prompt input to select your working directory and choose the unzipped `zebra-design-system-prototyping` folder.
3. If Claude asks for permission to work in the folder, click **Allow**.

---

## Step 3: Ask for a prototype

Type what you want in the message box, in plain English. For example:

> Make a prototype of a login screen with email, password, and a Sign in button.

> Build a settings page with sections for Notifications, Privacy and Account.

Tips:
- Say what the screen is for and who will use it. The more context, the better the result.
- Ask for changes the same way: *"Make the button full width"* or *"Add a message for when there are no results."*
- If your screen uses a common layout, Claude may offer to save it as a **template** so later prototypes can reuse it. Say yes and give your project name, or say no.
- Claude will ask if there's a **Jira ticket** for the prototype. Give the key (like `PROJ-123`) or say no. If Jira isn't connected yet, Claude explains how to set it up.
- When a prototype is done, Claude will ask if you want it in **Figma**. Say yes and paste the link to the Figma file (or ask for a new one). If Figma isn't connected yet, Claude explains how to connect it.
- If Claude asks to edit a file or run something, click **Allow**. You can choose **Always allow** to stop being asked.

---

## Step 4: See your prototype

Claude shows the prototype in the **Browser pane** inside the app. If you don't see it, say: **"Show me the prototype."**

After each change you ask for, the prototype updates in the pane.

---

## Step 5: Come back later

Close the app whenever you like. Your prototypes are saved in the `prototypes` folder inside `zebra-design-system-prototyping`, one folder per prototype. There's already one there, `showcase`, that shows every component; say **"Open the showcase prototype"** to look around. To pick up where you left off, open the same folder again (Step 2) and say: **"Open the prototype I made earlier"** or name it, like **"Open the login prototype."**

---

## If something goes wrong

| Problem | Try this |
|---|---|
| I can't see the prototype | Say: **"Show me the prototype."** |
| It looks out of date | Say: **"Refresh the prototype."** |
| The page is blank or looks unstyled | Say: **"Something looks broken. Please fix it."** |
| It doesn't look right | Say: **"Follow the design rules in this folder."** |

> Everything made here is a **prototype**. It uses made-up data and is meant to show an idea, not to be a finished product.

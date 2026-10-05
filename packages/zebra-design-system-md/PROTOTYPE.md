# Prototype Mode

Everything produced from this design system is a **prototype**. Its purpose is to communicate design concepts, not to ship. It will be rebuilt as production code later.

## Stack

Every prototype is a React + Vite app. Do not use any other framework or build tool. Map `tokens.json` keys into CSS variables or a theme object, keeping key names traceable.

## Rules

- Optimize for clarity of the design idea: layout, hierarchy, spacing, color, typography, states, and flow.
- Build the minimum needed to show the concept. Use static or mock data and hardcoded content.
- Skip production concerns unless asked: backend or API integration, auth, persistence, error handling, performance tuning, build tooling, tests, and scalable architecture.
- Keep code simple and throwaway. Do not abstract, generalize, or future-proof.
- Stay faithful to the design system. Prototypes still follow `tokens.json`, `icons.json`, `components/*.md` and `DESIGN.md`. Never hardcode values, and never invent icons, variants, states, or anatomy.
- Keep accessibility baselines from `CLAUDE.md` (WCAG 2.2 AA contrast, focus rings, 40px touch targets, no meaning in color alone). They are part of the design, not production polish.
- Make intent obvious. Name things after the design concept, and add a brief comment where a shortcut stands in for real behavior (e.g. `// mock data`).
- If something is faked, simplified, or left out, say so briefly so it is not mistaken for production behavior.

## Running 

At the start of a conversation run the prototype using `npm run dev` and then shift focus to the browser window and open the tab or just print the link after each prompt so it's easy for the user to access. 

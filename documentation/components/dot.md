# Component: Dot

**Figma ID:** `3817:51`
**Source Page:** Carousel

## Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `active`: Enum ["false", "true"] (Default: `false`)

## 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

### Variant: `active=false`
- **Node:** `active=false` (COMPONENT)
  - *Children:*
    - **Node:** `Ellipse 1` (ELLIPSE)
      - **Fill:** `var(--color/background/disabled)`

### Variant: `active=true`
- **Node:** `active=true` (COMPONENT)
  - *Children:*
    - **Node:** `Ellipse 1` (ELLIPSE)
      - **Fill:** `var(--color/background/inverse)`


---


# Component: Profilt Icons

**Figma ID:** `4032:454`
**Source Page:** Avatar

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `status`: Enum ["close", "available", "away", "busy", "onShift", "dnd", "edit"] (Default: `available`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `status=available`
- **Node:** `status=available` (COMPONENT)
  - *Children:*
    - **Node:** `Check Circle` (INSTANCE)
      - *Children:*
        - **Node:** `Icon: false` (VECTOR)
          - **Fill:** `var(--color/foreground/positive)`

#### Variant: `status=away`
- **Node:** `status=away` (COMPONENT)
  - *Children:*
    - **Node:** `Clock` (INSTANCE)
      - *Children:*
        - **Node:** `Icon: false` (VECTOR)
          - **Fill:** `var(--color/foreground/warning)`

#### Variant: `status=busy`
- **Node:** `status=busy` (COMPONENT)
  - *Children:*
    - **Node:** `Remove Circle` (INSTANCE)
      - *Children:*
        - **Node:** `Icon: false` (VECTOR)
          - **Fill:** `var(--color/foreground/negative)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---


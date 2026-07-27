# Component: Companion Combination Mark

**Figma ID:** `3852:10210`
**Source Page:** Logos

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `Type`: Enum ["Full", "Companion"] (Default: `Full`)
- `Fill`: Enum ["Default", "inverse"] (Default: `Default`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `Type=Full, Fill=Default`
- **Node:** `Type=Full, Fill=Default` (COMPONENT)
  - *Children:*
    - **Node:** `Vector` (VECTOR)
      - **Fill:** `var(--color/foreground/primary)`

#### Variant: `Type=Companion, Fill=Default`
- **Node:** `Type=Companion, Fill=Default` (COMPONENT)
  - *Children:*
    - **Node:** `Vector` (VECTOR)
      - **Fill:** `var(--color/foreground/primary)`

#### Variant: `Type=Full, Fill=inverse`
- **Node:** `Type=Full, Fill=inverse` (COMPONENT)
  - *Children:*
    - **Node:** `Vector` (VECTOR)
      - **Fill:** `var(--color/foreground/inverse)`

*(Note: Additional variants exist but structural logic remains identical. Adapt token mapping based on Variant Prop Enums).*

---


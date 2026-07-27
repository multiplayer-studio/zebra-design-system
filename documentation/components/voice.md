# Component: Voice

**Figma ID:** `2874:31`
**Source Page:** Acitivity Indicator

### Properties (Variants)
The LLM must expose these as props/parameters in the target language:

- `type`: Enum ["static", "animated"] (Default: `static`)

### 🏗️ Visual Blueprint (Strict AST)
*The LLM MUST strictly adhere to the following DOM structure and CSS properties. Map all token names to the target framework.*

#### Variant: `type=static`
- **Node:** `type=static` (COMPONENT)
  - *Children:*
    - **Node:** `Mask Group` (GROUP)
      - *Children:*
        - **Node:** `Mask` (VECTOR)
        - **Node:** `Rings` (GROUP)
          - *Children:*
            - **Node:** `Ellipse 170` (VECTOR)
              - **Fill:** `var(--color/background/gradient/start)`
            - **Node:** `Ellipse 169` (VECTOR)
              - **Fill:** `var(--color/background/gradient/start)`
            - **Node:** `Ellipse 168` (VECTOR)
              - **Fill:** `var(--color/background/gradient/start)`
            - **Node:** `Ellipse 171` (VECTOR)
              - **Fill:** `var(--color/background/gradient/start)`
            - **Node:** `Ellipse 172` (VECTOR)
              - **Fill:** `var(--color/background/gradient/start)`
            - **Node:** `Ellipse 173` (VECTOR)
              - **Fill:** `var(--color/background/gradient/start)`
            - **Node:** `Ellipse 167` (ELLIPSE)
    - **Node:** `Mic` (VECTOR)
      - **Fill:** `var(--color/background/gradient/start)`

#### Variant: `type=animated`
- **Node:** `type=animated` (COMPONENT)
  - *Children:*
    - **Node:** `_Voice Animated` (INSTANCE)
      - *Children:*
        - **Node:** `Mask Group` (GROUP)
          - *Children:*
            - **Node:** `Mask` (VECTOR)
            - **Node:** `Rings` (GROUP)
              - *Children:*
                - **Node:** `Ellipse 170` (VECTOR)
                  - **Fill:** `var(--color/background/gradient/start)`
                - **Node:** `Ellipse 169` (VECTOR)
                  - **Fill:** `var(--color/background/gradient/start)`
                - **Node:** `Ellipse 168` (VECTOR)
                  - **Fill:** `var(--color/background/gradient/start)`
                - **Node:** `Ellipse 171` (VECTOR)
                  - **Fill:** `var(--color/background/gradient/start)`
                - **Node:** `Ellipse 172` (VECTOR)
                  - **Fill:** `var(--color/background/gradient/start)`
                - **Node:** `Ellipse 173` (VECTOR)
                  - **Fill:** `var(--color/background/gradient/start)`
                - **Node:** `Ellipse 167` (ELLIPSE)
        - **Node:** `Mic` (VECTOR)
          - **Fill:** `var(--color/background/gradient/start)`


---


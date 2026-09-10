---
name: component-scope-analysis
description: Systematically compare component design specs (JSON, Figma) against implementation code to identify gaps, mismatches, and alignment across any framework or language.
tags:
  - component
  - analysis
  - design-system
  - specification
  - qa
prerequisites: []
tools_required:
  - Read
  - Bash
scope:
  - Compare design intent to code implementation
  - Identify missing features and property mismatches
  - Trace inheritance chains and mixins
  - Discover default value discrepancies
  - Generate full scope analysis reports
applies_to:
  - Web Components (Lit, Web Components API)
  - React components
  - Vue components
  - Svelte components
  - Flutter widgets
  - Python components
  - Kotlin components
  - Any framework/language with design specs
output_format: Markdown report with traffic-light severity indicators
---

# Component Scope Analysis Skill

Analyze a component against its design specification to produce a comprehensive gap report.

## Overview

This skill enables you to compare a design component specification (from a metadata file like Figma exports) against its actual implementation code to identify alignment, gaps, and discrepancies. Works technology-agnostic across any component framework and language.

## Input Requirements

The skill requires two inputs:

1. **Design Specification File** (JSON, YAML, or text)
   - A metadata/export file containing the intended design
   - Examples: Figma scraper output, design system spec, component documentation
   - Contains: properties, sizes, colors, states, behaviors, animations

2. **Component Implementation File(s)**
   - The actual component source code
   - Can be single file or multiple related files (base classes, mixins, styles, parent components)
   - Any language/framework: TypeScript/JavaScript (Web Components, React, Vue), Python, Kotlin, etc.

## Analysis Methodology

Follow these steps in order:

### Phase 1: Parse Design Intent
- [ ] Extract all specified properties/variants from the design file
  - Property names, types, possible values, defaults
  - Visual states (hover, pressed, focused, disabled, etc.)
  - Dimensions, spacing, typography, colors
  - Animations, transitions, motion
  - Content/slots
- [ ] Document the complete spec as a structured list
- [ ] Note any ambiguities or unclear specifications

### Phase 2: Map Code Architecture
- [ ] Identify the component's inheritance chain
  - Base classes / parent classes / superclasses
  - Mixins or composition patterns
  - Framework-specific wrappers
- [ ] List all file dependencies (imports, extends, includes)
- [ ] Trace the full inheritance/composition tree to the root

### Phase 3: Extract Available Properties
- [ ] For each level of the inheritance chain:
  - Find `@property`, `prop`, `attribute`, `computed`, or equivalent declarations
  - Record property name, type, default value, whether it's reflected/reactive
- [ ] Include properties from parent classes and mixins
- [ ] List all available CSS properties/variables the component accepts
- [ ] Check for state management (disabled, focus, hover, etc.)

### Phase 4: Discover Styling & Behavior
- [ ] Find all style files (CSS, CSS-in-JS, SCSS, etc.)
- [ ] Extract size/shape/flavor/color variants and their implementations
- [ ] Look for transition/animation definitions
- [ ] Check for media queries or responsive behavior
- [ ] Identify default values for each variant
- [ ] Check shadow DOM and slot implementations
- [ ] Document state selectors (`:disabled`, `:hover`, `[data-state]`, etc.)

### Phase 5: Deep Dive on Gaps
For each design spec property that lacks code implementation:
- [ ] Confirm it's truly missing (search all related files)
- [ ] Determine if it's a naming mismatch (e.g., `size` vs `scale`)
- [ ] Check if it's hidden in CSS classes or data attributes
- [ ] Verify if it should be in a parent/shared component
- [ ] Note if it's documented as "TODO" or "future"

### Phase 6: Default Value Comparison
- [ ] For each property, record both design default and code default
- [ ] Flag all mismatches (shape: sharp vs rounded, size: small vs medium, etc.)
- [ ] Check dimension mappings (36px design vs 28px token in code)

## Output Format

Generate a **Full Scope Analysis** with these sections:

```markdown
## Full Scope Analysis: [Component Name]

### Inheritance Chain
[Tree diagram showing the complete class/mixin hierarchy]

### Available Properties
[Table with: Property | Type | Possible Values | Code Default | Design Default]

### Gap Report: Design Intent vs Implementation

#### 🔴 MISSING FEATURES (Critical - not implemented at all)
- Feature name: Description and where it's specified in design

#### 🟡 MISMATCHES (Important - implemented differently than designed)
- Mismatch name: Design spec → Code reality

#### 🟠 UNCLEAR IMPLEMENTATION (Moderate - unclear if feature is present)
- Feature name: What's unclear and where to investigate

#### 🟢 WHAT WORKS (Fully implemented correctly)
- Feature: Implementation confirms it matches design

### Summary
[1-2 paragraphs: Overall alignment percentage, main gaps, design debt, recommendations]
```

## Decision Points

When running this skill, ask the user:

1. **Technology/Framework**: "Is this component TypeScript/JavaScript (Web Components/React/Vue), Python, Kotlin, or something else?"
   - Helps you know what syntax and patterns to look for

2. **Scope**: "Should I analyze ONLY the component file(s) you provided, or trace through ALL parent classes/mixins/base components?"
   - Tracing deeper finds more context but takes longer

3. **Styling Approach**: "Where are styles defined for this component?"
   - Inline CSS, CSS file, CSS-in-JS library (styled-components, Lit CSS, etc.), Tailwind, SCSS?
   - Helps you know where to look for property implementations

4. **Design File Format**: "How should I interpret the design spec file?"
   - Is each property at a specific path in the JSON?
   - Are there sections I should weight more heavily than others?
   - Any context about the scraper or export tool?

## Search Strategy

When you can't find a property implementation, search in this order:

1. **Direct in component file** - `@property`, `prop()`, `const [x, setX]`, etc.
2. **Parent/base classes** - trace imports
3. **Mixins** - look for composition/mixin patterns
4. **CSS files** - color, shape, size defined via CSS vars or class selectors
5. **Inline styles** - style attributes or style blocks
6. **Comments/TODOs** - "// TODO: add flavor support" = known gap
7. **Tests/stories** - sometimes show intended API better than implementation
8. **Framework defaults** - browser defaults, framework-provided behavior
9. **Ask**: If still not found after thorough search, note it as "MISSING"

## Deep-Dive Checklist for Each Gap

For gaps you find, investigate:

- [ ] Is it a naming/terminology mismatch? (flavour vs flavor, size vs scale)
- [ ] Is it a version mismatch? (old design, outdated implementation)
- [ ] Is it in a sibling/related component? (maybe split between two components)
- [ ] Is it planned but not built? (search for TODO, FIXME, issue references)
- [ ] Is it intentionally omitted? (search for comments explaining why)
- [ ] Is the design spec itself wrong? (vs the actual design intention)

## Tips for Each Technology

**Web Components (Lit, Lit-Element):**
- Look for `@property`, `@customElement`
- Check `styles = css\`...\``
- Search for `:host()` selectors
- Mixins use HOF pattern

**React:**
- Look for `useState`, `useCallback`, props destructuring
- Check className logic and conditional rendering
- Search for styled-components, CSS Modules, or .css imports

**Vue:**
- Look for `props:`, `<template>`, `computed`
- Check `:class` and `v-bind` bindings
- Search for `<style scoped>`

**Python/Kotlin:**
- Look for `@dataclass`, `@property`, or `init` params
- Check for enums or type hints
- Search for styling in associated theme/style files

**Flutter:**
- Look for `@required`, `final` properties in widget constructors
- Check for `StatefulWidget` vs `StatelessWidget` patterns
- Search for `build()` method and `ThemeData` usage
- Look for `GlobalKey`, `State` class for state management
- Check MaterialApp theme for colors, sizing tokens
- Search for animation controllers and transitions (`AnimatedBuilder`, `AnimatedOpacity`, etc.)

## Common Gaps to Watch For

These are frequently found discrepancies:

- Size defaults (design: "small", code: "medium")
- Shape/corner radius defaults
- Missing color/flavor variants (gradient, text-gradient, etc.)
- Transition timing not implemented (instant vs 0.2s ease-in-out)
- Icon sizing wrong (16px design vs 24px token)
- Focus ring styling (custom vs browser default)
- Responsive/breakpoint behavior
- Disabled state styling
- Slot vs property naming for content

## Output Checklist

Before finalizing your analysis:

- [ ] All design properties accounted for (found or marked as MISSING)
- [ ] All code properties mapped back to design intent
- [ ] Default values for both design and code documented
- [ ] At least 2-3 gaps identified (or confirmed zero gaps)
- [ ] Inheritance chain fully traced
- [ ] Confidence level noted for borderline cases
- [ ] Recommendations included for critical gaps

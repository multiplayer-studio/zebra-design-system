# Stepper

Shows where a person is in a fixed sequence of steps, marking what is finished, what is current and what is still ahead. Two sets: Horizontal Stepper, default for desktop or compact for mobile, and Vertical Stepper, a rail or a column of cards. All stepper variants excluding the horizontal compact variant names only the current step above a segmented bar.

Source: [Stepper page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7357-18457) · extracted 2026-11-03

The page has two public components: **Horizontal Stepper** and **Vertical Stepper**. They share four step parts: Step / Horizontal, Step / Vertical, Step Card (Round and Sharp) and Step Segment. The steppers paint nothing themselves. Every colour comes from the step parts.

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues. Measurements end in Px.

## API

### Horizontal Stepper

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `size` | enum | default, compact | `default` | variant |
| `steps` | slot | Step / Horizontal | — | steps (default only) |
| `segments` | slot | Step Segment | — | segments (compact only) |
| `currentStep` | string | | `3` | step info (compact only) |
| `totalSteps` | string | | `5` | step info (compact only) |
| `label` | string | | `Label` | title (compact only) |
| `subtitle` | string | | `Subtitle` | subtitle (compact only) |
| `showSubtitle` | boolean | true, false | `true` | subtitle (compact only) |

**size**: default: "The desktop variant of a horizontal stepper. Every step is named, its label centered under its indicator, and the connector runs indicator to indicator." · compact: "The scaled down variant of a horizontal stepper, ideally used for mobile screens. The count, the current title and subtitle, over the segment bar."

**steps**: "Holds the Step / Horizontal instances on Default variant. Turn Show Line off on the last one."

**segments**: "Holds one Step Segment per step on Compact variant."

**currentStep**: "This shows the current step number on Compact variant." · **totalSteps**: "This shows the total number of steps on Compact variant." · **label**: "This shows the current step title on Compact variant." · **subtitle**: "This shows the current step subtitle on Compact variant."

**showSubtitle**: true: "On default, subtitles are hidden but can be toggled on to show additional context to the step. Ideally, limit to using one or few words, rather than a longer description." · false: "Drops the subtitle, surfacing just the count and the step title."

### Vertical Stepper

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `card` | enum | false, true | `false` | variant |
| `rounded` | enum | false, true | `false` | variant (only when `card` is true) |
| `steps` | slot | Step / Vertical, or Step Card | — | steps |

**card**: false: "The desktop variant of a vertical stepper. Every step is named, its label centered under its indicator, and the connector connects and runs from indicator to indicator. This is the default variant used for vertical stepper." · true: "A card style of the vertical stepper. Each step used a Step Card, with active and completed steps highlighted for prominence. Ideally, use this variant if your prefer to show more visual-focused step progress."

**rounded**: true: "Only applicable when vertical stepper card property is set to true. The default state of the card vertical stepper shows step cards with rounded corners. This property should be used consistently with the rest of the page’s styling." · false: "Only applicable when vertical stepper card property is set to false. This property shows step cards with sharp corners and should be used consistently with the rest of the page’s styling."

**steps**: "Holds Step / Vertical or Step Card instances. Turn Show Line off on the last one." The step type follows the variant: Step / Vertical when `card` is false, Step Card/Round when `card` and `rounded` are true, and Step Card/Sharp when `card` is true and `rounded` is false.

## Internal variations & content inputs

There are no swap-only variations.

**Steps.** Each step is one instance with its own label, subtitle, showSubtitle, stepNumber, status and, on rails, showLine. Figma samples five steps (complete, complete, active, default, default), and three in the card variants.

**Segments.** There is one Step Segment per step, each with its own status. Figma samples five.

## Anatomy

### Horizontal Stepper

**Root.** On default it is a row with gap `space/none`, padding `space/md` inline and `space/none` block, and a fixed size (630Px wide, measured). On compact it is a column with gap `space/md`, padding `space/none`, a fixed width and hug height (340Px wide, measured).

1. **Step** (default only): "One step of the sequence, carrying its indicator, its label and the connector that follows it. Which component draws it depends on the set and its Size or Card value." The steps sit in a hugging row with gap `space/none`.
2. **Step Number** (compact only): "A line showing the step number, formatted as “STEP [current] OF [total]”." It is a hugging row with gap `space/2xs`. Its four texts are the fixed words STEP and OF plus `currentStep` and `totalSteps`. Each text is `label/medium` in `foreground/tertiary` on one line.
3. **Label + Subtitle** (compact only): "On the compact variant, the label and subtitles comes above the step indicators." It is a column with gap `space/2xs` that fills the width. The title is `title/medium` in `foreground/primary`. The subtitle is `body/small` in `foreground/secondary`, shown when `showSubtitle` is on. Both wrap. The step number and this heading sit together in a summary column, also gap `space/2xs`.
4. **Segment** (compact only): "The equivalent of a connector but optimized with reduced states and complexity for compact spacing." It is a row with gap `space/xs` that fills the width. Every Step Segment in it fills, so they share the width equally.

### Vertical Stepper

**Root** and **steps**: a column with gap `space/none` and padding `space/none`. It has a fixed width and hugs its height (150Px wide, measured). With `card` true, the gap is `space/sm` and both directions are fixed (200Px wide, measured). Each step fills the width and hugs its height.

## Variants

| Horizontal `size` | direction | gap | inline padding | shows | width |
|---|---|---|---|---|---|
| default | row | `space/none` | `space/md` | steps | 630Px |
| compact | column | `space/md` | `space/none` | summary, segments | 340Px |

| Vertical `card` | `rounded` | step | gap | width |
|---|---|---|---|---|
| false | false | Step / Vertical | `space/none` | 150Px |
| true | false | Step Card/Sharp | `space/sm` | 200Px |
| true | true | Step Card/Round | `space/sm` | 200Px |

Figma has no variant with `rounded` true and `card` false.

## Subcomponents

### Step / Horizontal and Step / Vertical

"Each step that is used within a stepper parent component. Step / Horizontal puts the label under its indicator and runs the connector on to the next step. Step / Vertical sets the label beside it and drops the connector towards the next. Status sets how the step reads at a glance, from default through complete to error."

| Prop | Type | Values | Default |
|---|---|---|---|
| `status` | enum | default, complete, active, partial, error, disabled | `default` |
| `label` | string | | `Label` |
| `stepNumber` | string | | `1` |
| `subtitle` | string | | `Subtitle` |
| `showSubtitle` | boolean | | `false` |
| `showLine` | boolean | | `true` |

**status**: default: "A step not yet reached. The indicator is outlined and the label stays muted, so it recedes behind the step in progress." · complete: "A step finished and passed. A tick replaces the number, so the number set on this step stops being visible." · active: "The step a user is actively on. It is the only value that promotes the label to the primary tone, so use exactly one in a row or column." · partial: "A step entered and left unfinished. It keeps its number on a tinted ground, which is what tells it apart from complete." · error: "A step that failed. It is the only value that recolours the label, so a failure stays legible without reading the indicator." · disabled: "A step not available in this run. Every part mutes together, so it reads as out of scope rather than merely unreached."

**label**: "Names the step in a word or two. Horizontally, the label sits below the indicator whereas vertically, the label sits to the right of the indicator." · **stepNumber**: "The number in the indicator. Only two states that show glyphs in place of step numbers are complete and error." · **subtitle**: "A qualifier under the label for a step which needs extra context. Ideally, this subtitle should be no longer than a word or two. It is only drawn when Show Subtitle is on."

**showSubtitle**: false: "Leaves the step to its label alone, which keeps every step in a row or column the same height." · true: "Adds the subtitle line and makes the respective step taller."

**showLine**: true: "Keeps the connector running on to the next step, across or down. It is what makes the steps read as one path rather than separate markers." · false: "Drops the connector. Using this property is recommended for last end steps on steppers where there is nothing further to connect to."

**Anatomy, Step / Horizontal.** The root is a hugging row with padding `space/2xs` block.
1. **Indicator**: "The numbered circle at the head of the step. Its fill, its border and whether it shows a number or a glyph all come from Status." It is `control/icon-lg` square at `radius/pill`, with a `stroke/thick` inside border. It sits in a head column `control/icon-lg` wide, with gap `space/sm` to the text. The number is `label/small`, centred. Complete shows glyph `check-mark` and error shows glyph `priority`, both Icon Size=small in the rounded family.
2. **Text**: "The label, with the subtitle beneath it when Show Subtitle is on: centred under the indicator on Step / Horizontal, beside it on Step / Vertical." It is a column with gap `space/none` and `space/3xs` above it. The label is `label/large`, centred and unwrapped. The subtitle is `body/small`. The text overflows the head on both sides by design.
3. **Connector**: "The line from this step to the next, to the right on Step / Horizontal and below on Step / Vertical, carried by this step rather than the next. Show Line turns it off on the last step." It is a track `control/icon-lg` tall and 116Px wide (fixed, measured). The line is centred in the track, `stroke/thick` tall, and fills the track.

**Anatomy, Step / Vertical.** The root is a row with gap `space/xl`, filling its stepper's width and hugging its height. The rail is a hugging, centred column: the indicator (as above), then the connector, a `stroke/thick` line of fixed length below it (22Px, measured). The text column fills the rest, with `space/3xs` above it. The label is `label/large`, start-aligned and wrapping. The subtitle is `body/small`.

| status | indicator fill | indicator border | number | label | subtitle | line |
|---|---|---|---|---|---|---|
| default | `interactive/neutral/background/default` | `border/default` | `foreground/primary` | `foreground/tertiary` | `foreground/tertiary` | `border/default` |
| complete | `feedback/success/background/strong` | `feedback/success/background/strong` | glyph `check-mark` | `foreground/tertiary` | `foreground/tertiary` | `border/success` |
| active | `interactive/primary/background/default` | `interactive/primary/background/default` | `interactive/primary/foreground/default` | `foreground/primary` | `foreground/tertiary` | `border/default` |
| partial | `feedback/success/background/subtle` | `border/success`, dashed | `foreground/primary` | `foreground/tertiary` | `foreground/tertiary` | `border/success`, dashed |
| error | `feedback/error/background/strong` | `feedback/error/background/strong` | glyph `priority` | `foreground/error` | `foreground/tertiary` | `border/default` |
| disabled | `border/subtle` | `border/subtle` | `foreground/disabled` | `foreground/disabled` | `foreground/disabled` | `border/default` |

### Step Card (Round and Sharp)

"One step of the cards arrangement: a bordered surface carrying a numbered indicator and the step’s label side by side. There is no connector, so a column of cards reads as a set of stages rather than one drawn path, and Stepper places them rather than a consumer using one alone. This variant is intended to bring more visual clarity to steps, without needing more detail."

Its props are `status`, `label`, `stepNumber`, `subtitle` and `showSubtitle`, as on the steps. There is no `showLine`. Round and Sharp are two Figma sets that differ only in corner radius.

**status**: default: "A step not yet reached. The card keeps the plain surface and default border, so the outlined indicator is what marks it as pending." · complete: "A step finished and passed. The card takes feedback/success/background/subtle behind border/success, and the indicator a tick in place of the number." · partial: "A step entered and left unfinished. The card does not change, so the tinted indicator alone carries the difference." · active: "The step a person is on now. It is the only value that takes surface/brand and promotes its label, which is what makes the current step findable in a column." · error: "A step that failed. The border turns and the label recolours, so a failed card is readable without reading the indicator." · disabled: "A step not available in this run. The border and every piece of text mute together, so the card reads as out of scope."

**set**: Round: "Use where the card sits in open space and reads as its own surface. It is the softer of the two and the usual choice." · Sharp: "Use where cards meet a panel edge and a rounded corner would break the line. Nothing but the corner changes."

**label**: "Names the step beside its indicator. The card is fixed in both directions, so a label long enough to wrap overruns it." · **stepNumber**: "The number in the indicator. complete and error show a glyph instead, so it is hidden there." · **subtitle**: "A qualifier under the label for a step whose name is ambiguous. It is only drawn when Show Subtitle is on." · **showSubtitle**: false: "Leaves the card to its label alone, which is the content the fixed card height is set for." · true: "Adds the subtitle line. The card height does not grow with it, so both lines have to fit the height already set."

**Anatomy**
1. **Card surface**: "The bordered ground the step sits on. Its fill and border come from Status, and its corner from the set." It is a row with gap `space/md`, padding `space/sm` block and `space/md` inline, and a `stroke/thin` inside border. Its radius is `radius/sm` on Round and `radius/none` on Sharp.
2. **Indicator**: "The numbered circle on the leading edge. It matches the rail steps' indicator, and with the card's tint it carries the status reading." Same build as the steps.
3. **Text**: "The label, with the subtitle beneath it when Show Subtitle is on, filling the width left beside the indicator." It is a column with `space/3xs` above it. The label is `label/large` and the subtitle `body/small`.

| status | card fill | card border | indicator fill | indicator border | number | label | subtitle |
|---|---|---|---|---|---|---|---|
| default | `surface/card` | `border/default` | `interactive/neutral/background/default` | `border/default` | `foreground/primary` | `foreground/secondary` | `foreground/tertiary` |
| complete | `feedback/success/background/subtle` | `border/success` | `feedback/success/background/strong` | `feedback/success/background/strong` | glyph `check-mark` | `foreground/secondary` | `foreground/tertiary` |
| partial | `surface/card` | `border/default` | `feedback/success/background/subtle` | `border/success`, dashed | `foreground/primary` | `foreground/secondary` | `foreground/tertiary` |
| active | `surface/brand` | `interactive/primary/border/default` | `interactive/primary/background/default` | `interactive/primary/background/default` | `interactive/primary/foreground/default` | `foreground/primary` | `foreground/tertiary` |
| error | `surface/card` | `border/error` | `feedback/error/background/strong` | `feedback/error/background/strong` | glyph `priority` | `foreground/error` | `foreground/tertiary` |
| disabled | `surface/card` | `border/subtle` | `border/subtle` | `border/subtle` | `foreground/disabled` | `foreground/disabled` | `foreground/disabled` |

### Step Segment

"The equivalent of step connectors but for the compact variant of horizontal stepper. It is a flat capsule split into two halves, and Status fills neither, one or both of them. It carries no text, so the count and title above the bar do the naming."

Its only prop is `status`, with the same six values, default `default`.

**status**: default: "A step not yet reached. Both halves stay muted, so the segment reads as empty track waiting to be filled." · complete: "A step finished and passed. Both halves fill, which is what lets a run of finished steps read as one continuous bar." · partial: "A step entered and left unfinished. Only the leading half fills, and it is the one value that shows progress inside a single step." · active: "The step a person is on now. It fills both halves exactly as complete does, so the title above the bar is what names the current step." · error: "A step that failed. Both halves take the error tone, the only colour the bar uses besides the primary one." · disabled: "A step not available in this run. Both halves stay muted, so it is drawn the same as default."

**Anatomy**
1. **Segment**: "One step of the bar, rounded at both ends. Five of them with a gap between each is what a five step sequence looks like on mobile." It is `space/2xs` tall at `radius/pill` and fills its share of the bar.
2. **Start**: "The leading half. On partial this is the half that fills, which is the only way the bar reports progress within a step."
3. **End**: "The trailing half. It fills alongside Start on complete, active and error, and stays muted otherwise."

The two halves fill the segment equally and are clipped by its radius.

| status | start | end |
|---|---|---|
| default | `border/subtle` | `border/subtle` |
| complete | `interactive/primary/background/default` | `interactive/primary/background/default` |
| partial | `interactive/primary/background/default` | `border/subtle` |
| active | `interactive/primary/background/default` | `interactive/primary/background/default` |
| error | `foreground/error` | `foreground/error` |
| disabled | `border/subtle` | `border/subtle` |

### Icon

Icons are delivered as font glyphs from `packages/icons`: `check-mark` for complete and `priority` for error. Both are in the font. No glyph colour is bound in Figma, so code must set a foreground on the indicator (see issues).

## Tokens & theming

Every token resolves in `tokens/`.

- **Colour:** `surface/card`, `surface/brand`, `border/default`, `border/subtle`, `border/success`, `border/error`, `foreground/primary`, `foreground/secondary`, `foreground/tertiary`, `foreground/error`, `foreground/disabled`, `interactive/neutral/background/default`, `interactive/primary/background/default`, `interactive/primary/foreground/default`, `interactive/primary/border/default`, `feedback/success/background/subtle`, `feedback/success/background/strong`, `feedback/error/background/strong`
- **Dimension:** `space/none`, `space/3xs`, `space/2xs`, `space/xs`, `space/sm`, `space/md`, `space/xl`, `radius/none`, `radius/sm`, `radius/pill`, `stroke/thin`, `stroke/thick`, `control/icon-lg`
- **Typography:** `label/small`, `label/medium`, `label/large`, `title/medium`, `body/small`
- **Theme axes:** palette (Light, Dark, AAA Light, AAA Dark); size and typography (Desktop, Tablet, Mobile, Desktop Compact); extensions companion, target and condensed

## States, behavior & motion

**Stepper.** Static: "The default state features the step at hand, with respective progress states indicated for steps that follow before and after it."

- Motion: "No transition is defined. Progress changes by resetting each step’s Status, and the page decides whether anything moves as the content behind it changes."
- Width change: "Horizontal stepper steps should equally fill to the width of the overall component."
- Height change: "Vertical stepper steps should equally fill to the width of each individual step’s height."

**Steps.** These are the per-status rows. The step tables above give the tokens.

- default: "Outlined indicator on the neutral background with the number in the primary tone, a muted label, and a default connector."
- complete: "Solid success indicator carrying a tick in place of the number, a muted label, and a success connector."
- active: "Solid primary indicator with the number reversed out, the label promoted to the primary tone, and a default connector."
- partial: "Subtle success fill behind the number with a success border, a muted label, and a success connector."
- error: "Solid error indicator carrying a priority glyph, the label in the error tone, and a default connector."
- disabled: "Indicator, number, label and subtitle all drop to the disabled tone, with a default connector."

Behavior rows for the steps:

- Height: "The step hugs its content. For horizontal steps, the row top aligns to the tallest step. For vertical steps, the step grows downward and the connector carries the height of the step component."
- Head frame width: "On horizontal steps, the head frame should hug to fit the indicator with the label and subtitle texts center aligned in frame. This will mean the label and subtitle texts will overflow from the head frame width. This is to ensure equal sizing and spacing of steps."
- Horizontal step indicator responsiveness: "Indicator lengths on horizontal steps are set fixed for consistency but if the full length of the stepper component must be adjusted, all indicators must be treated with same length and fill behavior, to ensure equal spacing."

**Step Card.** No connector: "Cards carry no line between them. Order is conveyed by the numbers in the indicators and by the stacking itself, which is why the arrangement is built for a vertical column."

**Step Segment.**

- Two halves: "The segment is split in two so that a single step can report partial progress. Every other value fills both halves or neither. The partial fill aspect ratio is always kept to fill 50% of it’s container to denote partial progress."
- Width: "Each segment takes an equal share of the bar. The more steps a sequence holds, the shorter the width of every segment equally becomes."

## Content & slots

**Stepper**

- Steps (Step / Horizontal, Step / Vertical): "One step each, documented in their own frames. Horizontal and vertical are separate components rather than one component turned on its side."
- Steps, Cards (Step Card/Round, Step Card/Sharp): "One step of the cards arrangement, in two sets that differ only in their corners. It carries a surface and no connector."
- Steps, Mobile (Step Segment): "One division of the mobile bar, documented in its own frame. Segments carry no text, so the summary above them does the naming. These steps have reduced set of properties, featured with more simplification."
- Step content (Slot): "Steps go in through the component’s slot. Compact variant uses segments in place of steps. Label, Subtitle, Step Number and Status are set on each step instance."

**Steps**

- Indicator: "Drawn from the step's own Status. Step Number sets the number it shows; complete and error replace it with a glyph."
- Label: "Consumer owned, set through Label. It is the step’s name and the only text always present. Ideally, this should be a word or two at maximum."
- Subtitle: "Consumer owned, set through Subtitle and drawn only when Show Subtitle is on. Ideally, this should be a word or two at maximum."
- Connector: "Drawn by the step, horizontal on Step / Horizontal and vertical on Step / Vertical, its status taken from the step's own Status."
- Glyphs: "Chosen by Status rather than passed in. complete takes Check Mark, error takes Priority, and neither can be swapped."

**Step Card**

- Indicator: "Drawn from the card's own Status. Step Number sets the number it shows; complete and error replace it with a glyph."
- Label: "Consumer owned, set through Label. It fills whatever width is left beside the indicator."
- Subtitle: "Consumer owned, set through Subtitle and drawn only when Show Subtitle is on."
- Surface: "The card draws its own background, border and corner. None of the three is passed in."

## Usage (do / don't)

**Stepper**

- Do: "Give every step a short noun label, ideally single word. The rail divides its width evenly between steps, so a long label pushes into its neighbour before it wraps."
- Do: "Keep the sequence fixed for the whole task. A stepper promises a known number of steps, and adding one part way through breaks that promise."
- Don't: "Don’t use steppers for progress that is less than two steps and more than 8 steps. If so necessary to use more, consider which steps can be grouped."
- Don't: "Don't treat default and compact as one arrangement resized. Mobile drops every step label but the current one, so the whole path stops being visible."

**Steps**

- Do: "Keep exactly one step on active. That value is what marks a person’s position, and two of them leave the row or column with no single current step."
- Do: "Turn Show Line off on the last step. Each step draws the connector after itself, so the last one otherwise trails a line into nothing."
- Don't: "Don't treat complete and partial as interchangeable. partial says a step was entered and left unfinished, complete says it is done."
- Don't: "Don't use vertical and horizontal steps interchangeably for steppers, but rather use them for their respective orientation intended for consistency."

**Step Card**

- Do: "Keep exactly one card on active. It is the only value that takes surface/brand, so two of them give a column two current steps."
- Do: "Match the set to the surrounding UI: Step Card/Sharp where it is flat or cards meet a panel edge, Step Card/Round where it is rounded."
- Don't: "Don't rely on the card to tell partial from default. The two share a surface and a border, and only the indicator differs."
- Don't: "Don't give a card more text than its height holds. It is fixed in both directions and does not grow to its content."

**Step Segment**

- Do: "Let the bar carry progress and the summary carry naming. The segment has no text, so the count and title above it are the only place a step is named."
- Do: "Use partial where a step was left half done. It is the only value that fills one half, and it is the reason the segment is split at all."
- Don't: "Don't rely on the bar to show which step is current. Active and complete fill identically, so the title above the bar has to say so."
- Don't: "Don't put a long sequence on the mobile bar. Segments divide the width evenly, so every one of them shortens in width as steps are added."

## Accessibility

**Stepper**

- "The ability to move between steps with flexibility depends on choice when implementing."
- "Give the stepper an accessible name, so position is read out alongside the label rather than conveyed by color alone."
- "Status is carried by the fill and by the glyph inside the indicator together, which is what keeps complete and error apart for anyone who cannot rely on hue."
- "On mobile the bar holds no text at all, so the count and title above it are the only announcement of where a person is."

**Steps**

- "The step carries its state through the indicator’s fill and the glyph inside it together, which is what keeps complete and error apart for anyone who cannot rely on colour."
- "The label and subtitles are the step’s accessible name, so it should read as a noun a person would recognize out of context rather than as an instruction."
- "The vertical arrangement gives a label room to wrap, which makes it the better choice where step names cannot be shortened."

**Step Card**

- "The label is the card’s accessible name, so it should read as a noun a person would recognise out of context."

**Step Segment**

- "The bar conveys progress through fill alone, with no text and no change of shape, so it cannot be the only account of where a person is. The count and title above it carry that, and they are what should be announced. active and complete fill identically, which means position is not recoverable from the bar by itself. The error tone is the one place the bar uses colour to carry meaning rather than quantity, so a failed step needs saying in words somewhere else on the screen."

## Layout & theming intents

The full rows for all four frames are in `stepper.spec.json` under `layoutTheming`, verbatim. The stepper rows:

- Size (Hug): "Horizontal Stepper default hugs its steps and compact the width of its bar; Vertical Stepper hugs its column."
- Direction (Per Orientation and Layout): "The horizontal rail lays steps in a row, the vertical rail and cards in a column. Mobile is a column holding the summary above the bar."
- Padding and gap (Mixed): "8px between the step indicator and text group, with 2px between the label and subtitle."
- Step /Vertical (Hug): "Each step takes the height of the content it hugs."
- Step / Horizontal (Fill): "Each step takes an equal share of the total component’s width"
- Segments (Fill): "Each segment takes an equal share of the bar's width."
- Colour (Per step Status): "The stepper paints nothing itself. Every colour arrives with the step component it holds, and those are listed in the step frames."

## Issues

No blockers.

**Warn**

1. Vertical Stepper Rounded defaults to false in Figma, but the metadata marks true as the default.
2. The Rounded=false row says it applies when Card is false, but the Rounded=true row says Rounded only applies when Card is true.
3. Vertical Stepper has no Rounded=true, Card=false variant, so Rounded only changes anything when Card is true.
4. The summary says every variant except compact names only the current step above a segmented bar. Only compact does that.
5. The metadata calls the steps slot Slot. In Figma it is Steps.
6. Horizontal Stepper Show Subtitle controls only the compact subtitle, but its true row talks about subtitles on default.
7. The metadata says both steppers hug. In Figma, Horizontal Stepper has a fixed width in both sizes, and Vertical Stepper has a fixed width, plus a fixed height when Card is true.
8. The metadata says horizontal steps share the width equally. In Figma each step hugs a fixed-width track, so the last step, with no line, is much narrower.
9. The metadata gives 8px between indicator and text. That is true for Step / Horizontal (`space/sm`), but Step / Vertical uses `space/xl`.
10. The metadata gives 2px between label and subtitle. In Figma the 2px is padding above the label (`space/3xs`), and the gap between label and subtitle is `space/none`.
11. The step metadata says `space/2xs` above the text block. Figma binds `space/3xs`.
12. The metadata says subtitles fill their text block. In all three step sets the subtitle has a fixed size, and in Step Card it is wider than its text block, so it overflows.
13. The Step Card metadata says the card is fixed in both directions and does not grow. In the stepper, cards fill the width and hug their height.
14. The Step Segment description and its layout row say `space/xxs`. That token is now `space/2xs`, which is what Figma binds.
15. Step Card labels now use `foreground/secondary` on default, complete and partial, but the card's Label colour row still says `foreground/tertiary`. Rail steps keep `foreground/tertiary`.
16. The partial state draws its dashed indicator border and connector with a raw dash pattern. No token exists for it.

**Notes**

- Step Segment height is bound to a spacing token, `space/2xs`, rather than a size or stroke token.
- `check-mark` and `priority` are both in the font. Every step set pins Icon Size=small and the rounded family, Step Card/Sharp included.
- No colour is bound for the glyph inside the indicator. It takes currentColor, so code must set a foreground on the indicator for complete and error.
- Step Card/Round and Step Card/Sharp are separate sets that differ only in radius. This spec treats them as one card with a round/sharp choice. Whether that becomes a prop is the implementer's call.
- Horizontal step labels are centred on a head the width of the indicator and overflow it on both sides. The metadata says this is intentional.
- The Height change row says vertical steps fill to the width of each step's height. The wording is unclear.
- No interaction states or motion are modelled. Whether steps can be selected, and with which keys, is left to the implementation.
- Neither Horizontal Stepper nor Vertical Stepper has a Figma component description.
- Every sample step in the masters shows Step Number 1. Numbers are content set per step.

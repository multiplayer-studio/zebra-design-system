# Spacing steps

The steps of space between things, named by how closely the things are related. Space says what belongs together (1.7, 1.11), so a weaker relationship never gets a smaller step than a stronger one. The values come from the product's own design system.

## Steps

From smallest to largest.

| Step | Between | Never less than |
|---|---|---|
| tight | an icon and its label; a label and its field | the component's own gap |
| related | items in one group: fields in a section, rows of facts, buttons in a group | tight |
| heading | a heading and the content it heads | tight |
| inset | a container's edge and its content | related |
| gutter | cards or tiles side by side | related |
| group | groups inside one section | inset |
| section | sections of a page | group |
| page | the page's edge and its content | inset |

## Two checks

- The space above a heading is at least twice the space below it, so the heading belongs to what follows (1.125).
- The space inside a container is never smaller than the space between the items it holds (1.11).

## With width and density

- The page step grows with width (5.8). The other steps keep their order at every width.
- A compact density makes every step smaller together. It never closes one gap and leaves its neighbours.

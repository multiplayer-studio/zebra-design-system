# Capture

Taking something in from the world: a scan, a photo, a reading.

## Job

Capture one thing correctly, see that it was taken, and move on.

**Signals**
- An instruction for what to scan leads the screen, or a camera view fills it.
- The result appears where the person is already looking.

## Choose this when

- The input comes from a scanner, a camera or a sensor.
- The person's eyes are on the object, not the screen.

| Instead, when | Use |
|---|---|
| captures repeat down a list of items | [work through many](work-through-many.md) |
| the value is usually typed | [act on one object](act-on-one.md) |

## Regions

| # | Region | Present | Filled by | Rules |
|---|---|---|---|---|
| 1 | Header | always | [page header](organisms.md#page-header) | 1.50 |
| 2 | Target | always | [scan target](organisms.md#scan-target) | 1.130 |
| 3 | Result | when something has been captured | | 1.130 |
| 4 | Next step | always | [commit bar](organisms.md#commit-bar) | 1.129 |

## Variations

| When | Then | Rules |
|---|---|---|
| the capture uses the camera | a viewfinder takes the whole screen, with guidance over the top and the capture control at the bottom | 1.131, 1.118 |
| a photo has been taken | results appear in a sheet over the image, which stays visible | 1.131 |
| the process requires a scan as proof | typing instead is not offered, and the screen says so | 1.130 |
| a hardware key captures | the on-screen primary keeps one position through the flow | 1.147 |
| the capture fails | the reason shows in place of the result, with how to try again | 1.128 |

## Space and emphasis

**Focal:** Target

| Between | Step |
|---|---|
| Header and Target | group |
| Target and Result | related |
| Result and Next step | section |

## Checks

- Is the instruction for what to scan at the top of the content? (1.130)
- Does the result appear directly below it? (1.130)
- Is typing the value reachable on the same screen in one step? (1.130)
- Are the thing to look at and the thing to do the two most prominent elements? (1.129)
- Does a full-screen capture show how to leave? (1.118)

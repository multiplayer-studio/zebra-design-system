import figma, { html } from "@figma/code-connect/html";
import "../components/divider/divider";

figma.connect("https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2152-8803", {
  props: {
    orientation: figma.enum("Orientation", { Horizontal: "horizontal", Vertical: "vertical" })
  },
  example: props => html`<zeta-divider orientation=${props.orientation}></zeta-divider>`
});

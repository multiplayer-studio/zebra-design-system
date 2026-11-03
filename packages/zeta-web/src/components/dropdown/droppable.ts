export * from "./menu-item/dropdown-menu-item.js";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import styles from "./droppable.styles.js";
import { html, LitElement, nothing } from "lit";
import { Contourable } from "../../mixins/mixins.js";

/** The surface a dropdown opens onto (spec: Dropdown Menu): a floating panel holding `zeta-dropdown-menu-item` rows,
 * with its own surface and elevation. It opens on the `direction` side of its `anchor`, 8px away, and lines up per
 * `alignment`. `rounded` reaches every row inside it, so panel and rows agree; `compact` tightens the inset.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2364-5903
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-dropdown--docs
 */
@customElement("zeta-droppable")
export class ZetaDroppable extends Contourable(LitElement) {
  /** Controls the open state of the droppable. */
  @property({ type: Boolean, reflect: true }) open: boolean = false;

  /** Tightens the inset for a menu with little room to spare. */
  @property({ type: Boolean, reflect: true }) compact: boolean = false;

  /** The fixed gap between the anchor and the panel (raw 8px in Figma, no token). */
  private static readonly OFFSET = 8;

  /** Controls whether the droppable is fit to the width of the anchor */
  @property({ type: Boolean }) matchParentWidth: boolean = false;

  /** The anchor element to position the droppable */
  @property({ type: Object }) anchor?: HTMLElement;

  /** The alignment of the droppable relative to the anchor */
  @property({ type: String }) alignment?: "start" | "end" | "center";

  /** The direction of the droppable relative to the anchor */
  @property({ type: String }) direction?: "left" | "right" | "bottom" | "top" = "bottom";

  @queryAssignedElements() slottedElements!: Array<HTMLElement>;

  private getAnchorPosition() {
    if (this.anchor) {
      const anchorRect = this.anchor.getBoundingClientRect();
      return {
        top: anchorRect.top + window.scrollY,
        left: anchorRect.left + window.scrollX,
        right: anchorRect.right + window.scrollX,
        width: anchorRect.width,
        height: anchorRect.height
      };
    }
    return { top: 0, left: 0, right: 0, width: 0, height: 0 };
  }

  private getDroppablePosition() {
    const rect = this.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height
    };
  }

  private topVisible = (e: HTMLElement) => {
    return e.getBoundingClientRect().top >= 0;
  };

  private bottomVisible = (e: HTMLElement) => {
    return e.getBoundingClientRect().bottom <= (window.innerHeight || document.documentElement.clientHeight);
  };

  private alignHorizontally = () => {
    const anchorPosition = this.getAnchorPosition();
    const droppablePosition = this.getDroppablePosition();

    if (this.alignment == "end") {
      this.style.left = "0";
      this.style.left = `${anchorPosition.right - droppablePosition.width}px`;
    } else if (this.alignment == "center") {
      this.style.left = `${anchorPosition.left + anchorPosition.width / 2 - droppablePosition.width / 2}px`;
    } else {
      this.style.left = `${anchorPosition.left}px`;
    }
  };

  private alignVertically = () => {
    const anchorPosition = this.getAnchorPosition();
    const droppablePosition = this.getDroppablePosition();
    if (this.alignment == "end") {
      this.style.top = `${anchorPosition.top - droppablePosition.height + anchorPosition.height}px`;
    } else if (this.alignment == "center") {
      this.style.top = `${anchorPosition.top + anchorPosition.height / 2 - droppablePosition.height / 2}px`;
    }
  };

  private setDroppablePosition = () => {
    const anchorPosition = this.getAnchorPosition();
    const droppablePosition = this.getDroppablePosition();

    if (this.anchor) {
      switch (this.direction) {
        case "left":
          this.style.top = `${anchorPosition.top}px`;
          this.style.left = `${anchorPosition.left - droppablePosition.width - ZetaDroppable.OFFSET}px`;
          this.alignVertically();
          break;
        case "right":
          this.style.top = `${anchorPosition.top}px`;
          this.style.left = `${anchorPosition.left + anchorPosition.width + ZetaDroppable.OFFSET}px`;
          this.alignVertically();
          break;
        case "top":
          this.style.top = `${anchorPosition.top - droppablePosition.height - ZetaDroppable.OFFSET}px`;
          this.alignHorizontally();
          break;
        case "bottom":
          this.style.top = `${anchorPosition.top + anchorPosition.height + ZetaDroppable.OFFSET}px`;
          this.alignHorizontally();
          break;
        default:
          this.style.top = `${anchorPosition.top + anchorPosition.height + ZetaDroppable.OFFSET}px`;
          if (!this.topVisible(this)) {
            this.style.top = `${anchorPosition.top + anchorPosition.height + ZetaDroppable.OFFSET}px`;
          }
          if (!this.bottomVisible(this)) {
            this.style.top = `${anchorPosition.top - droppablePosition.height - ZetaDroppable.OFFSET}px`;
          }
          this.alignHorizontally();
          break;
      }
    }
  };

  //Common use case is to run this if matchParentWidth is true
  //Adjusts the width of the droppable to match the width of the anchor element
  private matchParentWidthHandler = () => {
    const style = window.getComputedStyle(this);
    const anchorPosition = this.getAnchorPosition();
    this.style.width = `calc(${anchorPosition.width}px - ${style.paddingLeft} - ${style.paddingRight})`;
  };

  //Handles window resize events
  private resizeHandler = () => {
    //If there is an open droppable and an anchor, recalculate its position
    if (this.open && this.anchor) {
      this.setDroppablePosition();
      //Will also automatically adjust width of droppable to parent on resize if matchParentWidth is true
      if (this.matchParentWidth) {
        this.matchParentWidthHandler();
      }
    }
  };

  connectedCallback() {
    super.connectedCallback?.();
    window.addEventListener("resize", this.resizeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    window.removeEventListener("resize", this.resizeHandler);
  }

  protected updated() {
    if (this.open) {
      this.setDroppablePosition();
    }

    this.syncItems();
    if (this.matchParentWidth) {
      this.matchParentWidthHandler();
    } else {
      this.style.width = "";
    }
  }

  /** Rows take the panel's rounded, so panel and rows agree (spec: rounded propagation). */
  private syncItems() {
    for (const el of this.slottedElements ?? []) {
      if (el.tagName === "ZETA-DROPDOWN-MENU-ITEM") {
        (el as HTMLElement & { rounded: boolean }).rounded = this.rounded;
      }
    }
  }

  protected render() {
    if (this.open) {
      return html` <slot @slotchange=${() => this.syncItems()}></slot> `;
    }
    return nothing;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-droppable": ZetaDroppable;
  }
}

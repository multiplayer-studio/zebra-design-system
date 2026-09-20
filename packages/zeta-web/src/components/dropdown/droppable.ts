export * from "./menu-item/dropdown-menu-item.js";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import styles from "./droppable.styles.js";
import { html, LitElement, nothing } from "lit";
import { Contourable } from "../../mixins/mixins.js";

export type ZetaDroppablePosition = "left" | "right" | "bottom" | "top";
export type ZetaDroppableAlign = "left" | "right" | "top" | "bottom";

/** Zeta Droppable is a container that can be opened and closed and can be attached to an anchor which will determine it's position.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2669-10309
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-dropdown--docs
 */
@customElement("zeta-droppable")
export class ZetaDroppable extends Contourable(LitElement) {
  /** Controls the open state of the droppable. */
  @property({ type: Boolean, reflect: true }) open: boolean = false;

  /** Controls whether the droppable is fit to the width of the anchor */
  @property({ type: Boolean }) matchParentWidth: boolean = false;

  /** The anchor element to position the droppable */
  @property({ type: Object }) anchor?: HTMLElement;

  /**
   * The alignment of the droppable relative to the anchor.
   * @deprecated Use `align` instead.
   */
  @property({ type: String }) alignment?: "start" | "end" | "center";

  /**
   * The direction of the droppable relative to the anchor.
   * @deprecated Use `position` instead.
   */
  @property({ type: String }) direction?: ZetaDroppablePosition = "bottom";

  /** The side of the anchor the droppable opens on. Defaults to "bottom" if left undefined. Falls back to the deprecated `direction` prop if unset. */
  @property({ type: String }) position?: ZetaDroppablePosition;

  /**
   * The edge of the anchor the droppable aligns to along the axis perpendicular to `position`. Falls back to the deprecated `alignment` prop if unset.
   * - When `position` is "bottom" or "top": "left" aligns the droppable's left edge with the anchor's left edge (default), "right" aligns the droppable's right edge with the anchor's right edge.
   * - When `position` is "left" or "right": "top" aligns the droppable's top edge with the anchor's top edge (default), "bottom" aligns the droppable's bottom edge with the anchor's bottom edge.
   */
  @property({ type: String }) align?: ZetaDroppableAlign;

  @queryAssignedElements() slottedElements!: Array<HTMLElement>;

  /** @internal resolves `position`, falling back to the deprecated `direction` prop. */
  private get resolvedPosition(): ZetaDroppablePosition {
    return this.position ?? this.direction ?? "bottom";
  }

  /** @internal resolves `align`, falling back to the deprecated `alignment` prop. */
  private get resolvedAlign(): ZetaDroppableAlign | "center" | undefined {
    if (this.align) return this.align;
    if (this.alignment === "center") return "center";
    if (this.alignment === "end") return this.resolvedPosition === "left" || this.resolvedPosition === "right" ? "bottom" : "right";
    return undefined;
  }

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

    if (this.resolvedAlign == "right") {
      this.style.left = "0";
      this.style.left = `${anchorPosition.right - droppablePosition.width}px`;
    } else if (this.resolvedAlign == "center") {
      this.style.left = `${anchorPosition.left + anchorPosition.width / 2 - droppablePosition.width / 2}px`;
    } else {
      this.style.left = `${anchorPosition.left}px`;
    }
  };

  private alignVertically = () => {
    const anchorPosition = this.getAnchorPosition();
    const droppablePosition = this.getDroppablePosition();
    if (this.resolvedAlign == "bottom") {
      this.style.top = `${anchorPosition.top - droppablePosition.height + anchorPosition.height * 2}px`;
    } else if (this.resolvedAlign == "center") {
      this.style.top = `${anchorPosition.top + anchorPosition.height / 2 - droppablePosition.height / 2}px`;
    }
  };

  private setDroppablePosition = () => {
    const anchorPosition = this.getAnchorPosition();
    const droppablePosition = this.getDroppablePosition();

    if (this.anchor) {
      switch (this.resolvedPosition) {
        case "left":
          this.style.top = `${anchorPosition.top}px`;
          this.style.left = `${anchorPosition.left - droppablePosition.width - 8}px`;
          this.alignVertically();
          break;
        case "right":
          this.style.top = `${anchorPosition.top}px`;
          this.style.left = `${anchorPosition.left + anchorPosition.width + 8}px`;
          this.alignVertically();
          break;
        case "top":
          this.style.top = `${anchorPosition.top + anchorPosition.height - droppablePosition.height - 12}px`;
          this.alignHorizontally();
          break;
        case "bottom":
          this.style.top = `${anchorPosition.top + anchorPosition.height + 8}px`;
          this.alignHorizontally();
          break;
        default:
          this.style.top = `${anchorPosition.top + anchorPosition.height}px`;
          if (!this.topVisible(this)) {
            this.style.top = `${anchorPosition.top + anchorPosition.height}px`;
          }
          if (!this.bottomVisible(this)) {
            this.style.top = `${anchorPosition.top - droppablePosition.height}px`;
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

    if (this.matchParentWidth) {
      this.matchParentWidthHandler();
    } else {
      this.style.width = "";
    }
  }

  protected render() {
    if (this.open) {
      return html` <slot></slot> `;
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

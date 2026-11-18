import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import "../src/components/file-upload/file-upload.js";
import "../src/components/file-upload-item/file-upload-item.js";
import "../src/components/file-indicator/file-indicator.js";

const MB = 1024 * 1024;
const STATUSES = ["waiting", "uploading", "complete", "error"] as const;
const size = (s: string) => (s === "complete" ? 812 * 1024 : s === "error" ? 6.1 * MB : s === "waiting" ? 2.4 * MB : 3.8 * MB);
const col = (c: unknown) => html`<div style="display:grid;gap:16px;max-inline-size:480px">${c}</div>`;

const meta: Meta = {
  title: "Components/File Upload",
  component: "zds-file-upload",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Built from `specs/file-upload`. A drop zone with a Select files button and the list of chosen files under it. It never uploads: files arrive in `zds-files-selected`, refusals in `zds-files-rejected`, and the product sets each row's status." } } },
  argTypes: {
    state: { control: "select", options: [null, "default", "dragging", "error", "disabled"] },
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
  },
  args: { state: null, shape: "rounded", showCaption: true },
  render: (a) => col(html`<zds-file-upload state=${a.state ?? nothing} shape=${a.shape} .showCaption=${a.showCaption}
      error=${a.state === "error" ? "notes.exe isn't a supported file type." : nothing}>
      <zds-file-upload-item status="uploading" file-name="Bay 4 photo.jpg" .size=${3.8 * MB} .progress=${50}></zds-file-upload-item>
    </zds-file-upload>`),
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};
export const State: Story = {
  render: () => col((["default", "dragging", "error", "disabled"] as const).map((s) => html`<zds-file-upload state=${s}
    error=${s === "error" ? "notes.exe isn't a supported file type." : nothing}></zds-file-upload>`)),
};
export const Shape: Story = { args: { shape: "sharp" } };
export const ShowCaption: Story = { args: { showCaption: false } };

/** Each status, with the bar indicator (rows grow) and the ring (rows keep one height). */
export const ItemStatus: Story = {
  render: () => html`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr));gap:16px;align-items:start">
    ${(["bar", "ring"] as const).flatMap((ind) => STATUSES.map((st) => html`<zds-file-upload-item status=${st} indicator=${ind}
      file-name="Delivery manifest.pdf" .size=${size(st)} .progress=${50}></zds-file-upload-item>`))}
  </div>`,
};
export const ItemSharp: Story = {
  render: () => col(html`<zds-file-upload-item shape="sharp" status="uploading" file-name="Delivery manifest.pdf" .size=${3.8 * MB} .progress=${50}></zds-file-upload-item>
    <zds-file-upload-item shape="sharp" indicator="ring" status="error" file-name="Delivery manifest.pdf" .size=${6.1 * MB}></zds-file-upload-item>`),
};
export const ItemShowDismiss: Story = {
  render: () => col(html`<zds-file-upload-item show-dismiss="false" status="waiting" file-name="Delivery manifest.pdf" .size=${2.4 * MB}></zds-file-upload-item>
    <zds-file-upload-item show-dismiss="false" indicator="ring" status="uploading" file-name="Delivery manifest.pdf" .size=${3.8 * MB} .progress=${50}></zds-file-upload-item>`),
};
export const Indicator: Story = {
  render: () => html`<div style="display:flex;gap:16px">
    <zds-file-indicator extension="PDF"></zds-file-indicator><zds-file-indicator type="unknown"></zds-file-indicator><zds-file-indicator type="icon"></zds-file-indicator>
  </div>`,
};

import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ZetaUploadItem } from "../../../components/upload-item/upload-item.js";
import "../../../components/upload-item/upload-item.js";

const MB = 1024 * 1024;

const meta: Meta<ZetaUploadItem> = {
  component: "zeta-upload-item",
  title: "Components/File Upload",
  args: {
    status: "uploading",
    indicator: "bar",
    rounded: true,
    showDismiss: true,
    fileName: "Delivery manifest.pdf",
    size: 3.8 * MB,
    progress: 50
  },
  argTypes: {
    status: { options: ["waiting", "uploading", "complete", "error"], control: { type: "select" } },
    indicator: { options: ["bar", "ring"], control: { type: "inline-radio" } },
    progress: { control: { type: "range", min: 0, max: 100 } }
  },
  parameters: {
    design: { url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8288-545" }
  },
  render: args =>
    html`<div style="max-inline-size: 480px">
      <zeta-upload-item
        status=${args.status}
        indicator=${args.indicator}
        .rounded=${args.rounded}
        .showDismiss=${args.showDismiss}
        fileName=${args.fileName}
        .size=${args.size}
        .progress=${args.progress}
      ></zeta-upload-item>
    </div>`
};
export default meta;

export const UploadItem: StoryObj<ZetaUploadItem> = {};

/** The ring keeps one height at every status, with cancel inside the circle. */
export const Ring: StoryObj<ZetaUploadItem> = { args: { indicator: "ring" } };

/** A failed row: the reason, Try again and delete. */
export const Failed: StoryObj<ZetaUploadItem> = { args: { status: "error", size: 6.1 * MB, errorText: "Connection lost" } };

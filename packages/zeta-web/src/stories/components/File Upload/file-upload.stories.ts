import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ZetaFileUpload } from "../../../components/file-upload/file-upload.js";
import "../../../components/file-upload/file-upload.js";
import "../../../components/upload-item/upload-item.js";

const MB = 1024 * 1024;

const meta: Meta<ZetaFileUpload> = {
  component: "zeta-file-upload",
  title: "Components/File Upload",
  args: {
    state: undefined,
    rounded: true,
    showCaption: true,
    caption: "Supports PDF, PNG and JPG. Max file size 10 MB.",
    disabled: false
  },
  argTypes: {
    state: { options: [undefined, "default", "dragging", "error", "disabled"], control: { type: "select" } }
  },
  parameters: {
    design: { url: "https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8289-840" },
    status: { type: "ready" }
  },
  render: args =>
    html`<div style="max-inline-size: 480px">
      <zeta-file-upload
        state=${args.state ?? nothing}
        .rounded=${args.rounded}
        .showCaption=${args.showCaption}
        caption=${args.caption}
        ?disabled=${args.disabled}
        errorMessage=${args.state === "error" ? "notes.exe isn't a supported file type." : nothing}
      >
        <zeta-upload-item status="uploading" fileName="Bay 4 photo.jpg" .size=${3.8 * MB} .progress=${50}></zeta-upload-item>
      </zeta-file-upload>
    </div>`
};
export default meta;

export const FileUpload: StoryObj<ZetaFileUpload> = {};

/** Files held over the zone: the border turns solid and the headline asks for the release. */
export const Dragging: StoryObj<ZetaFileUpload> = { args: { state: "dragging" } };

/** A refusal the zone caused, named on the error row. */
export const Error: StoryObj<ZetaFileUpload> = { args: { state: "error" } };

/** Files cannot be accepted at all: drops and picks are ignored. */
export const Disabled: StoryObj<ZetaFileUpload> = { args: { state: "disabled" } };

/** Sharp corners throughout, rows included. */
export const Sharp: StoryObj<ZetaFileUpload> = { args: { rounded: false } };

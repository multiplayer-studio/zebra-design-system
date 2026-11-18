import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FileIndicator, FileUpload, FileUploadItem, type FileUploadStatus } from "../src/index.js";

const meta: Meta<typeof FileUpload> = {
  title: "Components/File Upload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "Built from `specs/file-upload`. A drop zone with a Select files button and the list of chosen files under it. It never uploads: files arrive through `onFilesSelected`, refusals through `onFilesRejected`, and the product sets each row's status." } } },
  argTypes: {
    state: { control: "select", options: [undefined, "default", "dragging", "error", "disabled"] },
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
  },
  args: { shape: "rounded", showCaption: true },
  render: (a) => (
    <div style={{ maxInlineSize: 480 }}>
      <FileUpload {...a} error={a.state === "error" ? "notes.exe isn't a supported file type." : a.error}>
        <FileUploadItem status="uploading" fileName="Bay 4 photo.jpg" size={3.8 * 1024 * 1024} progress={50} />
      </FileUpload>
    </div>
  ),
};
export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {};
export const State: Story = {
  render: (a) => (
    <div style={{ display: "grid", gap: 24, maxInlineSize: 480 }}>
      {(["default", "dragging", "error", "disabled"] as const).map((s) => (
        <FileUpload key={s} {...a} state={s} error={s === "error" ? "notes.exe isn't a supported file type." : undefined} />
      ))}
    </div>
  ),
};
export const Shape: Story = { args: { shape: "sharp" } };
export const ShowCaption: Story = { args: { showCaption: false } };

const STATUSES: FileUploadStatus[] = ["waiting", "uploading", "complete", "error"];
/** Each status, with the bar indicator (rows grow) and the ring (rows keep one height). */
export const ItemStatus: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))", gap: 16, alignItems: "start" }}>
      {(["bar", "ring"] as const).flatMap((ind) => STATUSES.map((st) => (
        <FileUploadItem key={ind + st} status={st} indicator={ind} fileName="Delivery manifest.pdf"
          size={st === "complete" ? 812 * 1024 : st === "error" ? 6.1 * 1024 * 1024 : 3.8 * 1024 * 1024} progress={50}
          onCancel={() => {}} onRemove={() => {}} onRetry={() => {}} />
      )))}
    </div>
  ),
};
export const ItemSharp: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxInlineSize: 480 }}>
      <FileUploadItem shape="sharp" status="uploading" fileName="Delivery manifest.pdf" size={3.8 * 1024 * 1024} progress={50} />
      <FileUploadItem shape="sharp" indicator="ring" status="error" fileName="Delivery manifest.pdf" size={6.1 * 1024 * 1024} />
    </div>
  ),
};
export const ItemShowDismiss: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxInlineSize: 480 }}>
      <FileUploadItem showDismiss={false} status="waiting" fileName="Delivery manifest.pdf" size={2.4 * 1024 * 1024} />
      <FileUploadItem showDismiss={false} indicator="ring" status="uploading" fileName="Delivery manifest.pdf" size={3.8 * 1024 * 1024} progress={50} />
    </div>
  ),
};
export const Indicator: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <FileIndicator type="extension" extension="PDF" />
      <FileIndicator type="unknown" />
      <FileIndicator type="icon" icon="video-play" />
    </div>
  ),
};

/** The real thing: pick or drop files and watch them upload (simulated). */
export const Interactive: Story = {
  render: function Render(a) {
    const [rows, setRows] = React.useState<{ id: number; file: File; status: FileUploadStatus; progress: number }[]>([]);
    React.useEffect(() => {
      const t = setInterval(() => setRows((r) => r.map((x) => x.status !== "uploading" ? x
        : x.progress >= 100 ? { ...x, status: "complete" } : { ...x, progress: x.progress + 10 })), 300);
      return () => clearInterval(t);
    }, []);
    return (
      <div style={{ maxInlineSize: 480 }}>
        <FileUpload {...a} accept=".pdf,.png,.jpg,image/png,image/jpeg,application/pdf" maxFileBytes={10 * 1024 * 1024}
          onFilesSelected={(fs) => setRows((r) => [...r, ...fs.map((file, i) => ({ id: Date.now() + i, file, status: "uploading" as const, progress: 0 }))])}>
          {rows.map((r) => (
            <FileUploadItem key={r.id} status={r.status} fileName={r.file.name} size={r.file.size} progress={r.progress}
              onCancel={() => setRows((x) => x.filter((y) => y.id !== r.id))} onRemove={() => setRows((x) => x.filter((y) => y.id !== r.id))} />
          ))}
        </FileUpload>
      </div>
    );
  },
};

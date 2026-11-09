import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/index.js";
import { Lightbox, MessageInput, type LightboxItem, type MessageAttachment } from "../src/experimental.js";

/* Everything previewed here is generated in the browser — no network, as the
   Chat stories' photos and tone. */

const scene = (name: string, sky: string, hill: string): LightboxItem => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240"><rect width="320" height="240" fill="${sky}"/><circle cx="250" cy="60" r="32" fill="#ffd34d"/><path d="M0 240 120 110l70 70 50-50 80 80v30z" fill="${hill}"/></svg>`;
  return { file: new File([svg], name, { type: "image/svg+xml" }) };
};
const IMAGES: LightboxItem[] = [
  scene("Morning-ridge.svg", "#bfe0ff", "#2f7a4b"),
  scene("Evening-dunes.svg", "#ffd9b0", "#a3541f"),
  scene("Night-pass.svg", "#1d2a4a", "#0e1527"),
];

/* A minimal valid one-page PDF, its xref offsets computed so viewers accept it. */
const PDF = (() => {
  const stream = "BT /F1 14 Tf 36 120 Td (Zebra lightbox PDF preview) Tj ET";
  const parts = [
    "<</Type/Catalog/Pages 2 0 R>>",
    "<</Type/Pages/Kids[3 0 R]/Count 1>>",
    "<</Type/Page/Parent 2 0 R/MediaBox[0 0 320 240]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>",
    `<</Length ${stream.length}>>stream\n${stream}\nendstream`,
    "<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>",
  ];
  let body = "%PDF-1.4\n";
  const offsets: number[] = [];
  parts.forEach((p, i) => { offsets.push(body.length); body += `${i + 1} 0 obj${p}endobj\n`; });
  const xref = body.length;
  return `${body}xref\n0 6\n0000000000 65535 f \n${offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("")}trailer<</Root 1 0 R/Size 6>>\nstartxref\n${xref}\n%%EOF`;
})();

/** A short silent canvas recording, so the video kind has something real to play (Chromium). */
const useSampleVideo = () => {
  const [file, setFile] = React.useState<File | null>(null);
  React.useEffect(() => {
    if (typeof MediaRecorder === "undefined") return;
    const canvas = document.createElement("canvas");
    canvas.width = 320; canvas.height = 240;
    const ctx = canvas.getContext("2d")!;
    const stream = canvas.captureStream(20);
    const rec = new MediaRecorder(stream, { mimeType: "video/webm" });
    const chunks: Blob[] = [];
    rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
    rec.onstop = () => setFile(new File([new Blob(chunks, { type: "video/webm" })], "Pan-across.webm", { type: "video/webm" }));
    let t = 0;
    const timer = setInterval(() => {
      t += 1;
      ctx.fillStyle = "#1d2a4a"; ctx.fillRect(0, 0, 320, 240);
      ctx.fillStyle = "#ffd34d"; ctx.beginPath(); ctx.arc(40 + t * 8, 60, 24, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#2f7a4b"; ctx.fillRect(0, 170, 320, 70);
    }, 50);
    rec.start();
    const stop = setTimeout(() => { clearInterval(timer); rec.stop(); stream.getTracks().forEach((x) => x.stop()); }, 1600);
    return () => { clearTimeout(stop); clearInterval(timer); if (rec.state !== "inactive") rec.stop(); };
  }, []);
  return file;
};

const meta: Meta<typeof Lightbox> = {
  title: "Experimental/Lightbox",
  component: Lightbox,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "**Experimental — no Figma spec.** A full-size preview over the page: images, videos and PDFs render themselves; anything else shows a drawn file sheet and \"no preview\". The toolbar offers open in a new tab, download and close; previous / next page through the items with buttons or arrow keys. Each control hides behind its `show*` prop." } },
  },
};
export default meta;
type Story = StoryObj<typeof Lightbox>;

/** A reusable opener: buttons for each item, the lightbox controlled above them. */
function Opener({ items, label, ...options }: { items: LightboxItem[]; label: (i: number) => string } & Partial<React.ComponentProps<typeof Lightbox>>) {
  const [index, setIndex] = React.useState<number | null>(null);
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {items.map((it, i) => <Button key={i} flavour="outline-subtle" size="small" onClick={() => setIndex(i)}>{label(i)}</Button>)}
      <Lightbox {...options} items={items} index={index} onIndexChange={setIndex} onClose={() => setIndex(null)} />
    </div>
  );
}

/** Pictures, paged with the side arrows or the keyboard. */
export const Gallery: Story = {
  render: () => <Opener items={IMAGES} label={(i) => `Open photo ${i + 1}`} />,
};

/** One of each kind: image, video (a short canvas recording), PDF, and a zip for the no-preview sheet. */
export const Kinds: Story = {
  render: function Render() {
    const video = useSampleVideo();
    const items: LightboxItem[] = [
      IMAGES[0],
      { file: video ?? new File([], "Pan-across.webm", { type: "video/webm" }) },
      { file: new File([PDF], "Spec-extract.pdf", { type: "application/pdf" }) },
      { file: new File(["zip"], "Design-tokens.zip", { type: "application/zip" }) },
    ];
    return <Opener items={items} label={(i) => ["Image", "Video", "PDF", "Zip (no preview)"][i]} />;
  },
};

/** The toolbar options are props: here only downloading is offered, and navigation is off. */
export const Options: Story = {
  render: () => <Opener items={IMAGES} label={(i) => `Open photo ${i + 1}`} showOpenInNew={false} showNavigation={false} />,
};

export const Sharp: Story = {
  render: () => <Opener items={IMAGES} label={(i) => `Open photo ${i + 1}`} shape="sharp" />,
};

/** The composer's thumbnails wired to the lightbox through `onPreviewAttachment`. */
export const WithMessageInput: Story = {
  render: function Render() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240"><rect width="320" height="240" fill="#2f7a4b"/><circle cx="60" cy="50" r="26" fill="#ffd34d"/></svg>`;
    const attachments: MessageAttachment[] = [
      { id: "a", file: new File([svg], "Site-visit.svg", { type: "image/svg+xml" }), kind: "image" },
      { id: "b", file: new File(["report"], "Findings.pdf", { type: "application/pdf" }), kind: "document" },
    ];
    const [index, setIndex] = React.useState<number | null>(null);
    const images = attachments.filter((a) => a.kind === "image");
    return (
      <div style={{ maxInlineSize: 440 }}>
        <MessageInput defaultAttachments={attachments}
          onPreviewAttachment={(a) => setIndex(images.findIndex((x) => x.id === a.id))} />
        <Lightbox items={images.map((a) => ({ file: a.file }))} index={index}
          onIndexChange={setIndex} onClose={() => setIndex(null)} />
      </div>
    );
  },
};

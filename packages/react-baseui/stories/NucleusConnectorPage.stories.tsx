import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Divider, IconButton, ScreenHeaderBar, Stepper, TabBar, TabItem } from "../src/index.js";
import { ZebraLogo } from "./zebra-logo.js";

/* A mock desktop page, not a component: step one of the Zebra Nucleus
   Connector's Connect Printer wizard, composed only from the library. Layout
   is inline styles on semantic tokens; every visible control is a real
   component. The logo and illustration are inline SVG on theme tokens, so the Mode toolbar switches them too. */


const type = (role: string) => ({
  fontFamily: `var(--${role}-font-family), system-ui, sans-serif`,
  fontSize: `var(--${role}-font-size)`,
  fontWeight: `var(--${role}-font-weight)`,
  lineHeight: `var(--${role}-line-height)`,
  letterSpacing: `var(--${role}-letter-spacing)`,
});

/** Laptop and printer over Wi-Fi, as inline SVG on theme tokens so it
    follows light and dark. The release lever keeps the hardware's yellow. */
const PrinterWifiIllustration = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 1360 590" role="img" aria-label="A laptop and a label printer connecting over Wi-Fi" style={{ display: "block", ...style }}>
    <g fill="var(--surface-section)" stroke="var(--foreground-primary)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
      {/* laptop lid */}
      <path d="M419 31 L890 44 Q904 46 902 58 L816 418 L780 418 L352 345 L343 338 Z"/>
      <path d="M432 64 L862 81 L790 378 L370 314 Z"/>
      {/* laptop base */}
      <path d="M24 418 L338 352 L774 415 L796 432 Q802 440 796 450 L782 470 L520 562 Q506 566 490 562 L44 440 Q24 434 24 418 Z"/>
      <path d="M24 422 L40 432 L502 552 L520 553 L788 455" fill="none"/>
      <path d="M196 401 L326 372 L650 434 L530 484 Z" stroke="var(--border-default)" strokeWidth="2"/>
      <path d="M210 404 L326 380 L632 436 L530 476" fill="none" stroke="var(--border-default)" strokeWidth="1.5"/>
      {/* hinge */}
      <path d="M354 345 L355 356 L772 428 L775 416 Z"/>
      <circle cx="772" cy="423" r="8"/>
      {/* ports */}
      <rect x="712" y="472" width="18" height="10" rx="2" transform="rotate(-18 721 477)"/>
      <rect x="740" y="463" width="18" height="10" rx="2" transform="rotate(-18 749 468)"/>
      <rect x="653" y="493" width="18" height="8" rx="1" stroke="var(--foreground-tertiary)" strokeWidth="1.5" transform="rotate(-18 662 497)"/>
    </g>

    {/* Wi-Fi signal */}
    <g fill="none" stroke="var(--interactive-primary-background-default)" strokeWidth="5">
      <circle cx="896" cy="252" r="102"/>
      <circle cx="896" cy="252" r="69"/>
      <circle cx="896" cy="252" r="38"/>
    </g>
    <g fill="none" stroke="var(--interactive-primary-background-default)" strokeWidth="4" strokeLinecap="round">
      <path d="M876 248 A28 28 0 0 1 916 248"/>
      <path d="M884 256 A17 17 0 0 1 908 256"/>
    </g>
    <circle cx="896" cy="264" r="4" fill="var(--interactive-primary-background-default)"/>

    {/* printer */}
    <g fill="var(--surface-section)" stroke="var(--foreground-primary)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
      <path d="M928 330 Q930 316 944 306 L1010 210 Q1030 186 1060 186 L1240 226 Q1290 240 1308 280 L1318 312 Q1320 330 1312 350 L1300 440 Q1296 470 1270 490 L1170 552 Q1158 558 1146 556 L1112 556 L1112 548 L1000 520 L998 528 L960 520 L958 506 Q928 496 926 480 Z"/>
      <path d="M934 330 Q936 318 952 318 L1124 362 Q1150 370 1152 396 L1162 540 Q1162 552 1148 552 L948 506 Q932 502 932 488 Z" fill="none"/>
      <path d="M926 430 L1162 482" fill="none" stroke="var(--border-default)" strokeWidth="1.5"/>
      <path d="M1152 396 Q1250 300 1310 300" fill="none"/>
      <path d="M1160 540 Q1260 480 1300 440" fill="none" stroke="var(--border-default)" strokeWidth="1.5"/>
      {/* lid window */}
      <path d="M984 292 L1052 218 Q1070 200 1094 206 L1244 244 L1158 334 Z"/>
      <path d="M1074 204 Q1084 196 1100 200 L1236 232" fill="none"/>
      <path d="M1066 276 L1120 224 M1096 282 L1150 232 M1126 290 L1180 240 M1156 298 L1210 248" stroke="var(--border-default)" strokeWidth="1.5"/>
      <circle cx="1028" cy="262" r="9"/>
      {/* media slot */}
      <path d="M966 448 L1106 482 L1104 492 L966 458 Z"/>
      <path d="M972 452 L1100 484" stroke="var(--border-default)" strokeWidth="1.5"/>
      {/* feet */}
      <path d="M958 506 L1000 516 L1000 524 M1112 548 L1148 556" fill="none"/>
      {/* side knob and port */}
      <ellipse cx="1318" cy="306" rx="9" ry="14"/>
      <path d="M1288 428 L1296 424 L1296 436 L1288 440 Z" strokeWidth="1.5"/>
    </g>
    {/* yellow release lever */}
    <rect x="1168" y="428" width="24" height="40" rx="6" fill="#f5b800" stroke="var(--foreground-primary)" strokeWidth="2" transform="rotate(14 1180 448)"/>
    <rect x="1172" y="434" width="10" height="28" rx="4" fill="#ffd34d" transform="rotate(14 1180 448)"/>
  </svg>
);

const STEPS = ["Printer Connection", "Media Settings", "Review"] as const;
/** The line under the current step in the Stepper layout. */
const STEP_HINTS = ["Wi-Fi or Ethernet", "Label size and type", "Check and print a test label"] as const;

const CONNECTIONS = [
  { value: "wifi", label: "Wi-Fi", icon: "wifi" },
  { value: "ethernet", label: "Ethernet", icon: "ethernet" },
] as const;

const COPY = {
  wifi: "To find a printer already on your network, ensure both this computer and the printer are powered on, and connected to the same Wi-Fi network. To connect to a Wi-Fi network or change your existing connection, please have your Wi-Fi password (if required), and a USB cable ready for the next step.",
  ethernet: "To find a printer already on your network, ensure both this computer and the printer are powered on, and connected to the same network with an Ethernet cable. To set up a new wired connection, please have an Ethernet cable and a USB cable ready for the next step.",
};

/** One row of the step list: a numbered circle and the step name. */
const Step = ({ n, label, state }: { n: number; label: string; state: "current" | "done" | "upcoming" }) => {
  const current = state === "current";
  return (
    <li aria-current={current ? "step" : undefined} style={{
      display: "flex", alignItems: "center", gap: "var(--space-xl)",
      padding: "var(--space-sm)", borderRadius: "var(--radius-sm)",
      background: current ? "var(--surface-info)" : "var(--surface-section)",
      border: `var(--stroke-thin) solid ${current ? "var(--border-info)" : "var(--border-default)"}`,
    }}>
      <span style={{
        ...type("title-medium"), display: "grid", placeItems: "center", flex: "none",
        inlineSize: "var(--control-lg)", blockSize: "var(--control-lg)", borderRadius: "var(--radius-pill)",
        background: state === "upcoming" ? "transparent" : "var(--interactive-primary-background-default)",
        color: state === "upcoming" ? "var(--foreground-secondary)" : "var(--interactive-primary-foreground-default)",
        border: `var(--stroke-thin) solid ${state === "upcoming" ? "var(--border-default)" : "transparent"}`,
      }}>{n}</span>
      <span style={{ ...type("title-large"), color: state === "upcoming" ? "var(--foreground-secondary)" : "var(--foreground-primary)" }}>{label}</span>
    </li>
  );
};

/** `stepper` swaps the card stack on the left for the experimental Stepper. */
function NucleusConnectorPage({ theme, stepper = false }: { theme?: "mode-light" | "mode-dark"; stepper?: boolean }) {
  const [step, setStep] = React.useState(0);
  // The Stepper is its own nav landmark, so the rail around it is a plain div.
  const SideRail = stepper ? "div" : "nav";
  const [connection, setConnection] = React.useState<"wifi" | "ethernet">("wifi");

  return (
    <div className={theme} style={{
      inlineSize: 1440, blockSize: 900, display: "flex", flexDirection: "column", overflow: "hidden",
      background: "var(--surface-section)", color: "var(--foreground-primary)",
    }}>
      {/* app bar */}
      <header style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "var(--space-xs) var(--space-sm)" }}>
        <IconButton flavour="subtle" size="large" shape="sharp" icon="hamburger-menu" label="Menu" />
        <ZebraLogo />
        <span style={type("title-large")}>Zebra Nucleus Connector</span>
      </header>
      <Divider />

      {/* wizard */}
      <div style={{ padding: "var(--space-none) var(--space-none) var(--space-none) var(--space-lg)" }}>
        <ScreenHeaderBar title="Connect Printer Wizard" headingLevel={1} showLeadingIcon={false} shape="sharp"
        action={<IconButton flavour="subtle" size="large" icon="close" label="Close wizard" />} />
      </div>
      <Divider />

      <div style={{ flex: 1, minBlockSize: 0, display: "grid", gridTemplateColumns: "324px 1fr" }}>
        <SideRail aria-label={stepper ? undefined : "Wizard steps"} style={{ background: "var(--surface-page)", padding: "var(--space-md)" }}>
          {stepper ? (
            <Stepper orientation="vertical" label="Wizard steps" onStepSelect={(i) => { if (i < step) setStep(i); }}
              steps={STEPS.map((label, i) => ({
                label, subtitle: i === step ? STEP_HINTS[i] : undefined,
                status: i === step ? "active" : i < step ? "complete" : "upcoming",
              }))} style={{ paddingBlockStart: "var(--space-sm)", paddingInlineStart: "var(--space-xs)" }} />
          ) : (
            <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--space-md)" }}>
              {STEPS.map((label, i) => (
                <Step key={label} n={i + 1} label={label} state={i === step ? "current" : i < step ? "done" : "upcoming"} />
              ))}
            </ol>
          )}
        </SideRail>

        <main style={{ display: "flex", flexDirection: "column", minBlockSize: 0 }}>
          
          <section style={{ flex: 1, minBlockSize: 0, overflow: "auto", padding: "var(--space-page) var(--space-2xl) 0 var(--space-page)" }}>
          <div style={{ padding: "var(--space-md)", display: "flex", flexDirection: "column", gap: "var(--space-lg)"}}>
            {step === 0 ? (
              <>
                <div style={{ display: "grid", gap: "var(--space-md)" }}>
                  <h2 style={{ ...type("heading-medium"), margin: 0 }}>Prepare for network connection</h2>
                  <p style={{ ...type("body-medium"), margin: 0, color: "var(--foreground-secondary)" }}>
                    The information below helps you prepare to either find an existing printer on your network or set up a new network connection.
                  </p>
                </div>
                {/* Full width inside a fixed column, so the two tabs share it evenly as in the reference. */}
                <div style={{ alignSelf: "start", inlineSize: 348 }}>
                  <TabBar label="Connection type" value={connection} onValueChange={(v) => setConnection(v as "wifi" | "ethernet")}>
                    {CONNECTIONS.map((c) => <TabItem key={c.value} value={c.value} label={c.label} icon={c.icon} />)}
                  </TabBar>
                </div>
                <p style={{ ...type("body-medium"), margin: 0 }}>{COPY[connection]}</p>
                {connection === "wifi" ? (
                  <PrinterWifiIllustration style={{ alignSelf: "center", inlineSize: 680, maxInlineSize: "100%", marginBlockStart: "var(--space-xl)" }} />
                ) : null}
              </>
            ) : (
              <div style={{ display: "grid", gap: "var(--space-md)" }}>
                <h2 style={{ ...type("heading-small"), margin: 0 }}>{STEPS[step]}</h2>
                <p style={{ ...type("body-medium"), margin: 0, color: "var(--foreground-secondary)" }}>This step is not part of the mock yet.</p>
              </div>
            )}
          </div>
          </section>

          <Divider />
          <footer style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", padding: "var(--space-md) var(--space-xl)" }}>
            <Button flavour="outline-subtle" size="large" shape="rounded">Use Another Connection Type</Button>
            <span style={{ flex: 1 }} />
            <Button flavour="outline" size="large" shape="rounded" leadingIcon="chevron-left"
              onClick={() => setStep((s) => Math.max(0, s - 1))}>Previous</Button>
            <Button flavour="primary" size="large" shape="rounded" trailingIcon="chevron-right"
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}>{step === STEPS.length - 1 ? "Finish" : "Next"}</Button>
          </footer>
        </main>
      </div>
    </div>
  );
}

const meta: Meta<typeof NucleusConnectorPage> = {
  title: "Experimental/Pages/Nucleus Connector",
  component: NucleusConnectorPage,
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "**Experimental mock page.** Step one of the Zebra Nucleus Connector's Connect Printer wizard on a 1440 × 900 desktop, composed only from library components: Icon Button, Divider, Screen Header Bar, Tab Bar and Button. The Zebra logo and the laptop-and-printer illustration are inline SVG on theme tokens, so they follow the Mode toolbar. Switch Wi-Fi and Ethernet, or step through with Previous and Next." } },
  },
};
export default meta;
type Story = StoryObj<typeof NucleusConnectorPage>;

export const Light: Story = {};

export const Dark: Story = { args: { theme: "mode-dark" } };

/** Alternative layout: the experimental Stepper in place of the card stack. Completed steps can be revisited. */
export const WithStepper: Story = { args: { stepper: true } };

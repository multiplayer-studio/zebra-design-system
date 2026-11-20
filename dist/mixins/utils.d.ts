import type { LitElement } from "lit";
export type Constructor<T extends LitElement> = new (...args: any[]) => T;
export type AbstractConstructor<T extends LitElement> = abstract new (...args: any[]) => T;
//# sourceMappingURL=utils.d.ts.map
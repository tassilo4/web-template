# Neutral Template Refactor — Design Spec

**Date:** 2026-07-24
**Status:** Approved, pending implementation plan

## Goal

Turn this project into a reusable Next.js **starter template** with three clear pillars:
a **generic, customizable style system**, **agent instructions**, and a **component
system**. Today those overlap and the token file is over-engineered around one specific
"warm cream editorial" look. After this refactor each file owns exactly one thing, the
defaults are neutral, and both humans and agents customize through the same tokens/docs.

## Design principle: three files, three non-overlapping jobs

| File | Owns | Role |
|------|------|------|
| `app/globals.css` | the **values** | Simplified shadcn-style token file, neutral. Executable source of truth. |
| `DESIGN.md` | the **current design language** | Living doc agents read *and maintain* as the look evolves. |
| `AGENTS.md` | **how to work here** | Lean workflow rules + pointers. No design values. |

The customization workflow is symmetric: a human or an agent restyles the whole app by
editing tokens in `globals.css`, then records the new intent in `DESIGN.md`. `AGENTS.md`
never duplicates design values — it points at the other two.

## Decisions (resolved during brainstorming)

- **Default style:** neutral & generic (not the current warm-cream look).
- **Who customizes:** humans and agents, equally → tokens are the single source of truth,
  docs serve as reference *and* agent instructions.
- **globals.css shape:** collapse to a standard shadcn-style file (neutral semantic tokens,
  single `--radius`, `@theme inline` mapping, neutral `.dark`).
- **Extra tokens:** **skip** `--chart-1..5` and `--sidebar-*`. Add later if a chart/sidebar
  is actually built.
- **Corner style:** **keep pills** (`rounded-full`) on Button, Badge, Tabs. The template is
  neutral in *color* but keeps a pill personality as a deliberate signature. Everything else
  follows `--radius`.
- **Home page:** ship a **component showcase** now (doubles as visual QA of the refactor).
  A minimal starter will replace it later — out of scope for this spec.
- **DESIGN.md:** rewrite as a **living** doc describing the current (neutral) state; framed
  at the top as "update this when you change the design."

## 1. `app/globals.css` → simplified & neutral

Replace the three-layer structure (named palette → semantic roles → utilities) with the
conventional shadcn structure:

**Structure (top to bottom):**
1. `@import` lines (unchanged: tailwindcss, tw-animate-css, shadcn/tailwind.css) +
   `@custom-variant dark`.
2. `:root` — neutral semantic tokens as **direct `oklch` values** + `--radius`.
3. `.dark` — neutral dark values.
4. `@theme inline` — map semantic vars to Tailwind color utilities, compute the radius
   scale, and map fonts.
5. `@layer base` — unchanged (`border-border`, `bg-background text-foreground`, `font-sans`).

**Removed:**
- The named brand palette (`--color-eggshell`, `--color-warm-taupe`, `--color-stone`,
  `--color-ink`, `--color-graphite`, `--color-smoke`, `--color-ash`, `--color-violet-spark`,
  `--color-ember-orange`).
- The custom type scale (`--text-caption` … `--text-display` with baked line-height/tracking).
- The four-value radius set (`--radius-sm/md/lg/xl` = 4/4/20/24px).
- Custom shadows (`--shadow-subtle`, `--shadow-hairline`) and `--font-heading`.
- The warm-inversion `.dark` block.

**Token values** — use the standard shadcn **neutral** base. Exact `oklch` values to be
confirmed against the installed shadcn version at implementation time; the expected set:

```
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --radius: 0.625rem;
}
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
}
```

**`@theme inline`** — keep the existing color mappings; add the computed radius scale and
keep the font mapping (drop `--font-heading`):

```
--radius-sm: calc(var(--radius) - 4px);
--radius-md: calc(var(--radius) - 2px);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) + 4px);
--font-sans: var(--font-inter);
--font-mono: var(--font-geist-mono);
```

## 2. Reconcile the 15 components to the neutral tokens

Components keep their structure and Base UI wiring — only classNames that reference removed
tokens change. This is mechanical but touches most files.

**Global token swaps (any component that uses them):**

| Old | New |
|-----|-----|
| `text-body-sm` | `text-sm` |
| `text-caption` | `text-xs` |
| `text-body` | `text-base` |
| `shadow-subtle`, `shadow-hairline` | `shadow-sm` |
| `font-heading` | removed (inherits `font-sans`) |
| `rounded-lg` (was 20px) | `rounded-lg` (now = `--radius`, ~10px) — unchanged class, new value |
| `rounded-xl` (was 24px) | `rounded-xl` (now `--radius` + 4px) — unchanged class, new value |

**Per-component notes (only where more than a token swap):**

- **Button** — keep `rounded-full` (pill). Swap `text-body-sm` → `text-sm`. Keep variants
  (`default`/`outline`/`ghost`/`secondary`/`destructive`/`link`) and sizes.
- **Badge** — keep `rounded-full` (pill). `text-caption` → `text-xs`.
- **Tabs** — keep pill triggers in a pill track (`rounded-full`). Token swaps only.
- **Card** — drop the editorial signature (flat `bg-card` taupe, **no border/no shadow**,
  32px padding). Move to a **standard bordered card**: `bg-card` + `border` + `rounded-xl`,
  conventional padding. Neutral shadcn Card look.
- **Select, DropdownMenu** — `shadow-subtle` → `shadow-sm`; menu radius follows `--radius`.
- **Dialog** — radius via `rounded-xl` (now ~14px, was 24px); `shadow-subtle` → `shadow-sm`.
- **Popover, Tooltip** — `shadow-subtle` → `shadow-sm`; radius via tokens.
- **Input, Textarea, Label, Checkbox, Switch, Separator** — token swaps only; no structural
  change.

**Verification:** after reconciliation, grep the `components/` and `app/` trees for any
lingering references to removed tokens (`text-body`, `text-caption`, `shadow-subtle`,
`shadow-hairline`, `font-heading`, `eggshell`, `warm-taupe`, `stone`, `ink`, `graphite`,
`smoke`, `ash`, `violet-spark`, `ember-orange`) — expect zero hits.

## 3. `DESIGN.md` → living neutral design doc

Rewrite to describe the **current neutral state**, not the warm-cream look. Sections:

- **Header framing:** "This is a **living document**. It describes the current design
  language. When you change the design (tokens in `app/globals.css`), update this file so
  future agents and humans stay in sync. `globals.css` is the source of truth; this doc is
  its human-readable description."
- **Colors:** the neutral semantic tokens and what each role is for (background/foreground,
  card, popover, primary, secondary, muted, accent, border, input, ring, destructive). No
  named brand palette.
- **Typography:** Inter (`--font-sans`) + Geist Mono (`--font-mono`); use **Tailwind's
  default type scale** (`text-xs/sm/base/lg/xl/2xl…`) — no custom rungs.
- **Radius:** single `--radius` token → `rounded-sm/md/lg/xl` computed; **pills**
  (`rounded-full`) are the signature for Button/Badge/Tabs.
- **Spacing:** Tailwind's native 4px scale.
- **Do / Don't:** neutral guidance (keep pills on buttons/badges/tabs; restyle via tokens,
  not per-component hardcoding; keep the palette achromatic unless the project intentionally
  introduces an accent).
- Drop all warm-cream / violet-orange spark content.

## 4. `AGENTS.md` → slim down

Keep only guidance **not** captured by tokens/`DESIGN.md`. Preserve the two existing HTML
comment fences (`nextjs-agent-rules`, `cicada-toolkit-rules`) so tooling that manages them
keeps working.

**Keep:**
- The "This is NOT the Next.js you know" version warning (read `node_modules/next/dist/docs/`).
- "Use and extend the `components/ui` primitives; don't reinvent them; don't install another
  component library unless asked."
- "Restyle the whole app by editing tokens in `app/globals.css`."
- `cn()` from `@/lib/utils`.
- Hugeicons pattern.
- A pointer: design language lives in `DESIGN.md`; token values in `app/globals.css`.

**Remove:** anything reciting palette values, per-component specs, or design rules now owned
by `DESIGN.md`/`globals.css`.

## 5. Home page + cleanups

- **`app/page.tsx`** — replace `null` with a **component showcase**: a single scrollable
  page that renders each primitive in its variants (buttons, badges, inputs/textarea, card,
  tabs, select, dropdown, dialog, popover, tooltip, checkbox, switch, separator). Purpose:
  visual QA that the neutral tokens + kept pills render correctly, and a living reference.
  Uses only the existing primitives and neutral tokens.
- **`app/layout.tsx`** — change metadata (`title`/`description`) from the Create-Next-App
  default to a generic template title. Keep Inter + Geist Mono font wiring as-is.

## Out of scope

- Minimal-starter home page (replaces the showcase later).
- Chart/sidebar tokens and components.
- Any new accent color or brand personality — the template ships neutral.
- Dark-mode toggle UI (the `.dark` tokens exist; wiring a theme switcher is separate).

## Success criteria

1. `globals.css` reads like a standard shadcn neutral token file: `:root` + `.dark` +
   `@theme inline`, one `--radius`, no named brand palette, no custom type/shadow scales.
2. `npm run build` (or the project's build) succeeds; no references to removed tokens remain
   anywhere in `app/` or `components/`.
3. The showcase page renders every primitive correctly in the neutral theme with pills intact.
4. `DESIGN.md` describes the neutral state and is explicitly framed as living/maintained.
5. `AGENTS.md` contains no duplicated design values and points at the other two files.

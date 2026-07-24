# Neutral Template Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor this project into a neutral, customizable Next.js starter template where `app/globals.css` owns the token values, `DESIGN.md` is the living design doc, and `AGENTS.md` is lean workflow guidance — with a component showcase home page.

**Architecture:** Collapse the bespoke "warm cream editorial" three-layer token file into a standard shadcn-style neutral token file (`:root` + `.dark` + `@theme inline`, one `--radius`). Reconcile the 15 Base UI primitives to the surviving utilities (mechanical class swaps) while keeping their pill signature on Button/Badge/Tabs. Rewrite the two docs to non-overlapping roles and add a showcase page as visual QA.

**Tech Stack:** Next.js (App Router, non-standard vendored build), Tailwind CSS v4 (`@theme inline`), `@base-ui/react` primitives, `class-variance-authority`, `cn()` (clsx + tailwind-merge), Hugeicons.

## Global Constraints

- **Next.js is non-standard.** APIs may differ from training data — read `node_modules/next/dist/docs/` before writing any Next-specific code. (This plan only touches `page.tsx`/`layout.tsx` minimally.)
- **Use the existing `components/ui/` primitives.** Do not add another component library.
- **Class composition:** `cn()` from `@/lib/utils`. **Icons:** `HugeiconsIcon` from `@hugeicons/react` with icons from `@hugeicons/core-free-icons`.
- **Keep pills:** Button, Badge, and Tabs stay `rounded-full`. Everything else follows `--radius`.
- **Palette ships neutral/achromatic.** No new accent colors, no chart/sidebar tokens.
- **Branch discipline (Parsek workspace):** do NOT create/switch/rename branches or run `git worktree`. Commit on the current branch (`master`) after each task.
- **Token values:** use the standard shadcn **neutral** base (values given in Task 1). If they differ from the installed shadcn's neutral theme, prefer the installed values.

---

### Task 1: Rewrite `app/globals.css` to neutral shadcn tokens

**Files:**
- Modify: `app/globals.css` (full replacement)

**Interfaces:**
- Produces: semantic color utilities (`bg-background`, `text-foreground`, `border-border`, `bg-card`, `bg-primary`, `text-muted-foreground`, `bg-destructive`, …), the radius scale (`rounded-sm/md/lg/xl` computed from `--radius`), and `font-sans`/`font-mono`. Removes: named brand color utilities (`bg-eggshell`, `text-ink`, `border-stone`, …), the custom type scale (`text-caption`…`text-display`), custom shadows (`shadow-subtle`, `shadow-hairline`), and `font-heading`.

- [ ] **Step 1: Replace the file contents**

Write `app/globals.css` with exactly:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

/*
 * Design tokens — edit here to restyle the whole app (see DESIGN.md).
 * Neutral, shadcn-style: semantic tokens in :root, dark overrides in .dark,
 * a single --radius. @theme inline exposes them as Tailwind utilities.
 */

:root {
  --radius: 0.625rem;

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

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --font-sans: var(--font-inter);
  --font-mono: var(--font-geist-mono);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
  }
}
```

- [ ] **Step 2: Verify no removed tokens remain in the file**

Run: `grep -nE 'eggshell|warm-taupe|--color-stone|--color-ink|graphite|smoke|--color-ash|violet-spark|ember-orange|--text-caption|--text-body|--text-heading|--text-display|--shadow-|font-heading' app/globals.css`
Expected: no output (exit code 1).

- [ ] **Step 3: Verify the dev server recompiles CSS without error**

The Parsek dev server is already running. Confirm it recompiles `app/globals.css` with no error in the terminal (or run `npm run dev` briefly). Components still referencing `text-body-sm`/`shadow-subtle` will render with default sizing until Task 2 — that is expected and does not error (Tailwind silently ignores unknown utility classes).
Expected: server compiles; no "unknown utility" build failure.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "Rewrite globals.css as neutral shadcn-style tokens"
```

---

### Task 2: Reconcile the 15 primitives to the surviving tokens

**Files:**
- Modify: all `components/ui/*.tsx` (mechanical class swaps)
- Modify: `components/ui/card.tsx` (structural: bordered card)

**Interfaces:**
- Consumes: the neutral utilities and radius scale from Task 1.
- Produces: primitives that reference only surviving utilities. Button/Badge/Tabs keep `rounded-full`; Card becomes a standard bordered surface (`border` + `shadow-sm` + `rounded-xl`).

- [ ] **Step 1: Apply the four mechanical class swaps across `components/ui/`**

```bash
perl -pi -e 's/text-body-sm/text-sm/g'  components/ui/*.tsx
perl -pi -e 's/text-caption/text-xs/g'  components/ui/*.tsx
perl -pi -e 's/shadow-subtle/shadow-sm/g' components/ui/*.tsx
perl -pi -e 's/font-heading //g'         components/ui/*.tsx
```

(These swaps are safe: `text-body-sm`, `text-caption`, `shadow-subtle` are not substrings of any surviving class, and `font-heading ` always appears with a trailing space before the next class.)

- [ ] **Step 2: Make the Card a standard bordered surface**

In `components/ui/card.tsx`, the `Card` root `className` string is now (after Step 1):

```
"group/card flex flex-col gap-4 overflow-hidden rounded-lg bg-card py-(--card-spacing) text-sm text-card-foreground [--card-spacing:--spacing(8)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(6)] *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg"
```

Replace it with:

```
"group/card flex flex-col gap-4 overflow-hidden rounded-xl border bg-card py-(--card-spacing) text-sm text-card-foreground shadow-sm [--card-spacing:--spacing(6)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(5)] *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg"
```

(Changes: `rounded-lg` → `rounded-xl`; add `border`; add `shadow-sm`; default `--card-spacing` 8→6 (32px→24px); `sm` size 6→5 (24px→20px). `CardTitle` is already `"text-sm font-medium"` after Step 1 — leave it.)

- [ ] **Step 3: Verify no removed tokens remain in components**

Run: `grep -rnE 'text-body-sm|text-caption|shadow-subtle|font-heading' components app`
Expected: no output (exit code 1).

- [ ] **Step 4: Verify pills survived**

Run: `grep -lE 'rounded-full' components/ui/button.tsx components/ui/badge.tsx components/ui/tabs.tsx`
Expected: all three files listed.

- [ ] **Step 5: Commit**

```bash
git add components/ui
git commit -m "Reconcile primitives to neutral tokens; bordered card, pills kept"
```

---

### Task 3: Rewrite `DESIGN.md` as a living neutral design doc

**Files:**
- Modify: `DESIGN.md` (full replacement)

**Interfaces:**
- Consumes: the neutral tokens (Task 1) and reconciled primitives (Task 2) as the "current state" it describes.

- [ ] **Step 1: Replace the file contents**

Write `DESIGN.md` with exactly:

```markdown
# Design System

> **Living document.** This describes the **current** design language. The source of truth
> is the CSS-variable tokens in `app/globals.css`; this file is their human- and
> agent-readable description. **When you change the design (edit the tokens), update this
> file** so future agents and humans stay in sync.

The template ships **neutral**: an achromatic light/dark theme built on shadcn-style semantic
tokens, consumed by the primitives in `components/ui/`. To restyle the whole app, edit the
tokens in `app/globals.css` — every primitive follows. Colors, radius, and fonts all flow
from there; primitives never hardcode a look.

## Colors

Semantic tokens (light values in `:root`, dark overrides in `.dark`). These are what the
primitives reference, via utilities like `bg-background`, `text-foreground`, `border-border`:

| Token | Role |
|-------|------|
| `background` / `foreground` | Page canvas + primary text |
| `card` / `card-foreground` | Card surface + its text |
| `popover` / `popover-foreground` | Floating surfaces (menus, dialogs, tooltips) |
| `primary` / `primary-foreground` | Primary/filled buttons, checked controls |
| `secondary` / `secondary-foreground` | Quiet filled surfaces |
| `muted` / `muted-foreground` | Muted surfaces + secondary/descriptive text |
| `accent` / `accent-foreground` | Hover/active step on menu rows |
| `border` / `input` | Hairline borders and field borders |
| `ring` | Focus ring |
| `destructive` | Destructive actions only |

The default palette is **achromatic** (neutral grays). Introduce an accent color only when a
project intentionally needs one — add it as a token; don't hardcode it in components.

## Typography

Two families, wired in `app/layout.tsx`:
- **Inter** — `--font-sans` (`font-sans`): everything on screen.
- **Geist Mono** — `--font-mono` (`font-mono`): code-adjacent / technical micro-copy.

Use **Tailwind's default type scale** (`text-xs`, `text-sm`, `text-base`, `text-lg`,
`text-xl`, `text-2xl`, …). Controls use `text-sm`; small labels/badges use `text-xs`; page
body uses `text-base`; headings step up from `text-lg`.

## Radius

A single `--radius` token (`0.625rem`) drives the scale via `@theme inline`:

| Utility | Value | Typical use |
|---------|-------|-------------|
| `rounded-sm` | `--radius - 4px` | small elements |
| `rounded-md` | `--radius - 2px` | inputs, select, menu rows |
| `rounded-lg` | `--radius` | popovers, menus |
| `rounded-xl` | `--radius + 4px` | cards, dialogs |
| `rounded-full` | pill | **Button, Badge, Tabs** |

**Pills are the signature.** Buttons, badges, and tab triggers are fully rounded
(`rounded-full`). Everything else follows `--radius` — change that one value to reshape the
whole app.

## Spacing & layout

Tailwind's native 4px spacing scale (`p-*`, `gap-*`, `m-*`, `size-*`). Comfortable density:
default controls are `h-9` (36px). Reading width ~`max-w-3xl`; wider marketing up to
`max-w-7xl`.

## Components (`components/ui/`)

15 primitives built on `@base-ui/react`, styled with Tailwind + `cn()`, driven by the tokens
above, with Hugeicons glyphs. They are **yours to edit**: Button, Badge, Input, Textarea,
Label, Card, Tabs, Select, DropdownMenu, Checkbox, Switch, Dialog, Popover, Tooltip,
Separator.

## Do / Don't

**Do**
- Restyle via tokens in `app/globals.css`, not per-component hardcoding.
- Keep Button/Badge/Tabs pill-shaped; everything else on `--radius`.
- Keep the palette neutral unless the project intentionally adds an accent.
- Prefer `border` hairlines + subtle `shadow-sm` over heavy elevation.
- **Update this file when you change the design.**

**Don't**
- Don't hardcode colors/radii in components — thread them through tokens.
- Don't reinvent the primitives or add another component library unless asked.
- Don't reintroduce a bespoke type scale — use Tailwind's default steps.
```

- [ ] **Step 2: Verify no warm-cream language remains**

Run: `grep -niE 'eggshell|warm.?taupe|editorial|violet|ember|whisper|cream' DESIGN.md`
Expected: no output (exit code 1).

- [ ] **Step 3: Commit**

```bash
git add DESIGN.md
git commit -m "Rewrite DESIGN.md as living neutral design doc"
```

---

### Task 4: Slim down `AGENTS.md`

**Files:**
- Modify: `AGENTS.md` (replace the `cicada-toolkit-rules` section's design paragraph with a pointer; keep both HTML comment fences)

**Interfaces:**
- Consumes: `DESIGN.md` (Task 3) as the target of the pointer.

- [ ] **Step 1: Replace the file contents**

Write `AGENTS.md` with exactly (preserving both fences):

```markdown
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:cicada-toolkit-rules -->
# Component library

This project has its own component library in `components/ui/` — plain files that are
**yours to edit**. They are built on `@base-ui/react` primitives, composed with `cn()`, and
themed entirely by CSS-variable tokens in `app/globals.css`.

- **Use and extend these primitives** (Button, Input, Card, Dialog, Select, Menu, Tabs,
  Popover, Tooltip, …). Don't reinvent them, and don't install another component library
  unless the user asks.
- **Restyle the whole app by editing the tokens** in `app/globals.css` — colors, radius, and
  fonts all flow from there. The primitives read tokens, never hardcode a look.
- **Class composition:** `cn()` from `@/lib/utils` (clsx + tailwind-merge).
- **Icons:** `HugeiconsIcon` from `@hugeicons/react` with icons imported from
  `@hugeicons/core-free-icons`, e.g. `<HugeiconsIcon icon={Search01Icon} strokeWidth={2} />`.

The design language — palette, type scale, radius, and component conventions — lives in
**`DESIGN.md`**, implemented as tokens in **`app/globals.css`**. Read `DESIGN.md` before
building UI, and keep it updated when you change the design.
<!-- END:cicada-toolkit-rules -->
```

- [ ] **Step 2: Verify both fences are intact and duplicated design values are gone**

Run: `grep -cE 'BEGIN:nextjs-agent-rules|END:nextjs-agent-rules|BEGIN:cicada-toolkit-rules|END:cicada-toolkit-rules' AGENTS.md`
Expected: `4`

Run: `grep -niE 'eggshell|pill|hairline|type scale|palette recitation' AGENTS.md`
Expected: no output (exit code 1).

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md
git commit -m "Slim AGENTS.md; point at DESIGN.md instead of duplicating design values"
```

---

### Task 5: Component showcase home page + generic layout metadata

**Files:**
- Modify: `app/page.tsx` (replace `return null` with the showcase)
- Modify: `app/layout.tsx` (metadata title/description)

**Interfaces:**
- Consumes: every primitive from `components/ui/` and the neutral tokens.

- [ ] **Step 1: Write the showcase page**

Replace `app/page.tsx` with exactly:

```tsx
"use client"

import type { ReactNode } from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-medium">{title}</h2>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Component library</h1>
        <p className="text-muted-foreground">
          A neutral starter theme. Restyle everything from the tokens in{" "}
          <code className="font-mono text-sm">app/globals.css</code>.
        </p>
      </header>

      <Section title="Buttons">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
        <Button size="icon" variant="outline" aria-label="Search">
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
        </Button>
      </Section>

      <Section title="Button sizes">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </Section>

      <Section title="Badges">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </Section>

      <Separator />

      <Section title="Form controls">
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Type your message…" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Framework</Label>
            <Select defaultValue="next">
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="next">Next.js</SelectItem>
                <SelectItem value="remix">Remix</SelectItem>
                <SelectItem value="astro">Astro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="terms" defaultChecked />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="notifications" defaultChecked />
            <Label htmlFor="notifications">Enable notifications</Label>
          </div>
        </div>
      </Section>

      <Separator />

      <Section title="Card">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Project settings</CardTitle>
            <CardDescription>Manage your project configuration.</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Cards use the bordered neutral surface with the shared radius token.
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm">Save</Button>
            <Button size="sm" variant="ghost">
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </Section>

      <Section title="Tabs">
        <Tabs defaultValue="overview" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="pt-3 text-muted-foreground">
            Overview panel content.
          </TabsContent>
          <TabsContent value="activity" className="pt-3 text-muted-foreground">
            Activity panel content.
          </TabsContent>
          <TabsContent value="settings" className="pt-3 text-muted-foreground">
            Settings panel content.
          </TabsContent>
        </Tabs>
      </Section>

      <Separator />

      <Section title="Overlays">
        <Dialog>
          <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogDescription>
                A dialog built on the Base UI primitive, themed by tokens.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter showCloseButton>
              <Button>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Popover>
          <PopoverTrigger render={<Button variant="outline">Open popover</Button>} />
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Popover title</PopoverTitle>
              <PopoverDescription>Some contextual content.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline">Open menu</Button>} />
          <DropdownMenuContent>
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>
    </main>
  )
}
```

- [ ] **Step 2: Update layout metadata**

In `app/layout.tsx`, replace:

```tsx
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
```

with:

```tsx
export const metadata: Metadata = {
  title: "Next.js Template",
  description:
    "A neutral, customizable Next.js starter with a token-driven component library.",
};
```

- [ ] **Step 3: Verify the app builds/compiles**

Run: `npm run build`
Expected: build completes with no type or compile errors.
(If `next build` is heavy in this workspace, instead confirm the running dev server compiles `app/page.tsx` with no error in its terminal.)

- [ ] **Step 4: Visual QA in the browser**

Open the project's dev-server tab (via `browser_tabs`), navigate to `/`, and take a screenshot. Confirm:
- Buttons render as **pills**; default is dark fill, outline/ghost/secondary read correctly.
- Badges are pills; `text-xs`.
- Inputs/textarea/select have neutral borders and `rounded-md`.
- Card is **bordered** with a subtle shadow and `rounded-xl`.
- Tabs are pill triggers in a pill track; active trigger has the background fill.
- Dialog, Popover, Tooltip, and DropdownMenu open and are legible.
Fix any Base UI prop mismatch surfaced by the browser before committing.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/layout.tsx
git commit -m "Add component showcase home page; generic layout metadata"
```

---

## Self-Review

**Spec coverage:**
- globals.css → neutral shadcn shape → **Task 1** ✓ (drops palette/type-scale/shadows, one `--radius`, `@theme inline`, neutral `.dark`, skips chart/sidebar).
- Reconcile 15 components, keep pills, bordered card → **Task 2** ✓.
- DESIGN.md living neutral doc → **Task 3** ✓.
- AGENTS.md slim + pointer → **Task 4** ✓.
- Showcase home page + generic layout metadata → **Task 5** ✓.
- Out-of-scope items (minimal starter, chart/sidebar, accent color, theme-switcher UI) are not implemented — correct.

**Placeholder scan:** No TBD/TODO; every code step ships complete file contents or exact before/after strings. ✓

**Type/name consistency:** All showcase imports match the exact exports read from each `components/ui/*.tsx` (Button variants `default|secondary|outline|ghost|destructive|link`; sizes `xs|sm|default|lg|icon`; Card sub-parts; Base UI trigger `render` prop pattern matching `dialog.tsx`'s own usage; `DialogFooter showCloseButton`; Select/Tabs `value`/`defaultValue`). ✓

**Success criteria (from spec):** grep gates in Tasks 1–4 enforce "no removed tokens remain"; Task 5 build + browser QA enforce "showcase renders correctly with pills"; doc roles verified by content + fence checks. ✓

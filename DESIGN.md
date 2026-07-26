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

The default palette is **achromatic** (neutral grays), with one deliberate exception: `card`
carries a barely-there warm (cream) tone (`oklch(0.975 0.002 80)` light / `oklch(0.24 0.002 80)`
dark) so card surfaces read as distinct from `background` even though both are near-white/near-black.
Introduce further accent color only when a project intentionally needs one — add it as a
token; don't hardcode it in components.

## Typography

Two families, wired in `app/layout.tsx`:
- **Inter** — `--font-sans` (`font-sans`): everything on screen.
- **Geist Mono** — `--font-mono` (`font-mono`): code-adjacent / technical micro-copy.

Use **Tailwind's default type scale** (`text-xs`, `text-sm`, `text-base`, `text-lg`,
`text-xl`, `text-2xl`, …). Controls use `text-sm`; small labels/badges use `text-xs`; page
body uses `text-base`; headings step up from `text-lg`.

## Radius

A single `--radius` token (`0.625rem`) drives the scale via `@theme inline`, as a multiple of
`--radius` rather than a fixed offset:

| Utility | Value | Typical use |
|---------|-------|-------------|
| `rounded-sm` | `--radius * 0.6` | small elements |
| `rounded-md` | `--radius * 0.8` | inputs, cards, dialogs, popovers, menus, select |
| `rounded-lg` | `--radius` | — |
| `rounded-xl` | `--radius * 1.4` | — |
| `rounded-2xl` | `--radius * 1.8` | — |
| `rounded-3xl` | `--radius * 2.2` | — |
| `rounded-4xl` | `--radius * 2.6` | — |
| `rounded-full` | pill | **Button, Badge, Tabs** |

**Pills are the signature.** Buttons, badges, and tab triggers are fully rounded
(`rounded-full`). Everything else follows `--radius` — change that one value to reshape the
whole app.

## Spacing & layout

Tailwind's native 4px spacing scale (`p-*`, `gap-*`, `m-*`, `size-*`). Comfortable density:
default controls are `h-9` (36px). Reading width ~`max-w-3xl`; wider marketing up to
`max-w-7xl`.

**Page container:** a custom `page-container` utility is defined in `globals.css` (max-width
`1176px`, centered via `margin-inline: auto`, `2.5rem` side padding as a gutter below that
width) and applied once in `app/layout.tsx` around `{children}`. It's named `page-container`
rather than Tailwind's built-in `container` — overriding the built-in name via `@utility
container { ... }` compiled but was silently dropped in favor of Tailwind's own responsive
breakpoint-based container, so a distinct name avoids that collision. Nested elements needing
a narrower reading width (e.g. `max-w-3xl`) can still be applied inside it.

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

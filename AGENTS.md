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

# Next.js Design System Starter

A polished Next.js starter for product sites and web applications. It combines a token-driven design system with editable, local UI primitives so a project can develop its own visual language without inheriting a black-box component library.

## Highlights

- Next.js App Router, React, TypeScript, and Tailwind CSS
- Accessible primitives built on Base UI
- Light and dark themes driven by semantic CSS variables
- Editable buttons, forms, dialogs, menus, tabs, popovers, and tooltips
- Responsive marketing-page examples and reusable page chrome
- Hugeicons integration and motion utilities
- A human- and agent-readable design specification in [`DESIGN.md`](DESIGN.md)

## Getting started

```bash
git clone https://github.com/tassilo4/web-template.git
cd web-template
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev        # start the development server
npm run lint       # run ESLint
npm run typecheck  # check TypeScript without emitting files
npm run build      # create a production build
```

## Customizing the design

Start with the semantic tokens in `app/globals.css`. Colors, typography, radii, and component states flow through those variables. `DESIGN.md` documents the intended system and should stay synchronized with any token changes.

Reusable primitives live in `components/ui/`. They are application code rather than an external package, so they can be adapted directly as the product evolves.

## Project structure

```text
app/             routes, layout, and global design tokens
components/      page sections and shared application components
components/ui/   editable UI primitives
lib/             shared utilities
public/          static assets
```

## License

MIT

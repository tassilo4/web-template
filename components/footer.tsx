const FOOTER_COLUMNS = [
  { heading: "Product", links: ["Overview", "Workflows", "Agents", "Pricing"] },
  { heading: "Company", links: ["About", "Careers", "Blog", "Contact"] },
  { heading: "Resources", links: ["Docs", "Help center", "Community", "Status"] },
  { heading: "Social", links: ["X", "LinkedIn", "GitHub", "YouTube"] },
]

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="page-container flex flex-col gap-12 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Acme
            </span>
            <p className="max-w-xs text-sm text-muted-foreground">
              The platform for building, automating, and scaling your product.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-16">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-3">
                <h3 className="text-sm font-medium text-foreground">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

import { Button } from "@/components/ui/button"

const NAV_LINKS = ["Product", "Solutions", "Resources", "Pricing"]

export function HomeNavbar() {
  return (
    <header className="relative left-1/2 w-screen -translate-x-1/2">
      <div className="page-container flex items-center justify-between gap-7 py-4">
        <div className="flex items-center gap-12">
          <span className="text-lg font-bold tracking-tight text-foreground">
            Acme
          </span>

          <nav className="hidden lg:block">
            <ul className="flex flex-row items-center gap-7">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-foreground hover:text-foreground/70"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="outline">Log in</Button>
          <Button>Sign up</Button>
        </div>

        <Button variant="default" className="lg:hidden">Sign up</Button>
      </div>
    </header>
  )
}

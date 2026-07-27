const LOGOS = [
  "Nova",
  "Bramble",
  "Lattice",
  "Fathom",
  "Cobalt",
  "Ridgeline",
]

export function TrustedBy() {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden pb-24 md:pb-32">
      <p className="mb-6 text-center text-base text-foreground">
        Trusted by leading developers and enterprises
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee gap-16">
          {[...LOGOS, ...LOGOS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 text-lg font-semibold tracking-tight text-muted-foreground/60"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

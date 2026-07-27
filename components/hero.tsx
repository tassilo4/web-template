import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="flex flex-col gap-10 pt-18 pb-24 md:pt-24 md:pb-32">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <h1 className="max-w-lg text-4xl leading-tight font-light tracking-tight text-foreground md:text-5xl font-normal">
            Bringing
            <br />
            technology to life
          </h1>
          <div style={{ maxWidth: "464px" }}>
            <p className="text-base">
              Powering the best teams, creators, and developers. From
              automation and collaboration to analytics and integrations,
              build everything your product needs on one platform.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="default" size="lg">
            Sign up
          </Button>
          <Button size="lg" variant="outline">
            Book a demo
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-x-6 -top-8 h-64 rounded-full bg-foreground/[0.06] blur-3xl md:inset-x-16" />
        <div className="relative aspect-[2/1] w-full border border-border bg-muted rounded-xl" />
      </div>
    </section>
  )
}

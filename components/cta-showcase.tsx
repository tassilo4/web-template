import { Button } from "@/components/ui/button"

export function CtaShowcase() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="flex flex-col items-center gap-8 px-6 py-20 text-center md:py-28">
        <h2 className="max-w-2xl text-3xl font-normal tracking-tight text-foreground text-balance md:text-4xl">
          Start building today
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button size="lg">Sign up for free</Button>
          <Button size="lg" variant="outline">
            Talk to sales
          </Button>
        </div>
      </div>
    </section>
  )
}

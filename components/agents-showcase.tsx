import { HugeiconsIcon } from "@hugeicons/react"
import { Tick02Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

const HIGHLIGHTS = [
  "Real-time responses under 300ms",
  "Works across web, mobile, and email",
  "Handoff to a teammate whenever it's needed",
]

export function AgentsShowcase() {
  return (
    <section className="flex flex-col gap-10 pb-24 md:pb-32">
      {/* Header */}
      <div className="flex max-w-3xl flex-col gap-5">
        <p className="text-sm font-medium text-muted-foreground">Acme Agents</p>
        <h2 className="text-3xl font-normal tracking-tight text-foreground text-balance md:text-4xl">
          Deploy intelligent
          <br className="hidden sm:block" /> agents at scale
        </h2>
        <p className="max-w-2xl text-base text-foreground text-pretty">
          Build agents that understand context, respond in real time, and
          carry end-to-end customer conversations across every channel.
        </p>
        <div>
          <Button size="lg">Learn more</Button>
        </div>
      </div>

      {/* Large card */}
      <div className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-card p-5 md:p-6 lg:grid-cols-2 lg:items-center lg:gap-10">
        {/* Visual: conversation mockup */}
        <div className="flex aspect-[16/11] w-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-muted p-4 sm:p-6" />

        {/* Copy */}
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-medium text-foreground">
            Agents that feel human
          </h3>
          <p className="text-sm text-foreground text-pretty">
            Trained on Acme&apos;s product knowledge, agents pick up on
            context and intent — so every conversation feels natural, not
            scripted.
          </p>
          <ul className="flex flex-col gap-3">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                  <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

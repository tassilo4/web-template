import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  ChartIcon,
  Layers01Icon,
  UserGroupIcon,
  PlugSocketIcon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const FEATURES = [
  {
    icon: ChartIcon,
    title: "Analytics",
    href: "#",
    description:
      "Track every metric that matters with real-time dashboards and custom reports.",
  },
  {
    icon: Layers01Icon,
    title: "Workflows",
    href: "#",
    description:
      "Automate repetitive tasks and connect your tools into a single pipeline.",
  },
  {
    icon: UserGroupIcon,
    title: "Collaboration",
    href: "#",
    description:
      "Work together in real time with comments, shared views, and version history.",
  },
  {
    icon: PlugSocketIcon,
    title: "Integrations",
    href: "#",
    description:
      "Connect the tools your team already uses with our growing library of integrations.",
  },
]

function FeatureLink({ title, href }: { title: string; href: string }) {
  return (
    <a
      href={href}
      className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
    >
      {title}
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        size={15}
        strokeWidth={2}
        className="transition-transform duration-200 group-hover/link:translate-x-0.5"
      />
    </a>
  )
}

function BentoCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 md:p-6",
        className
      )}
    >
      {children}
    </div>
  )
}

export function CreativeShowcase() {
  return (
    <section className="flex flex-col gap-10 py-24 md:py-32">
      {/* Header */}
      <div className="flex max-w-3xl flex-col gap-5">
        <p className="text-sm font-medium text-muted-foreground">Acme Studio</p>
        <h2 className="text-3xl font-normal tracking-tight text-foreground text-balance md:text-4xl">
          Build, ship, and scale
          <br className="hidden sm:block" /> in one platform
        </h2>
        <p className="max-w-2xl text-base text-foreground text-pretty">
          Design dashboards, automate workflows, and collaborate with your team
          in real time. Everything you need to plan, build, and launch your
          next project lives in one workspace.
        </p>
        <div>
          <Button size="lg">Learn more</Button>
        </div>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {/* All-in-one editor */}
        <BentoCard className="sm:col-span-2 lg:col-span-6">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted" />
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-medium text-foreground">
              All-in-one workspace
            </h3>
            <p className="text-sm text-foreground">
              Build dashboards, docs, and reports in an editor built on
              all of Acme&apos;s platform primitives.
            </p>
          </div>
        </BentoCard>

        {/* Real-time collaboration */}
        <BentoCard className="sm:col-span-2 lg:col-span-6">
          <div className="flex aspect-[16/10] w-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-muted p-4" />
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-medium text-foreground">
              <FeatureLink title="Real-time collaboration" href="#" />
            </h3>
            <p className="text-sm text-foreground">
              Co-edit with your team, leave comments, and see changes sync
              instantly across every device.
            </p>
          </div>
        </BentoCard>

        {/* Four small feature cards */}
        {FEATURES.map((feature) => (
          <BentoCard
            key={feature.title}
            className="sm:col-span-1 lg:col-span-3"
          >
            <HugeiconsIcon
              icon={feature.icon}
              size={22}
              strokeWidth={1.5}
              className="text-foreground"
            />
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-medium text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-foreground">
                {feature.description}
              </p>
            </div>
          </BentoCard>
        ))}
      </div>
    </section>
  )
}

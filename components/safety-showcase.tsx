import { Button } from "@/components/ui/button"

function ModerationArt({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 203 202"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        stroke="currentColor"
        strokeDasharray="0.01 4"
        strokeLinecap="round"
        strokeWidth="1.25"
        d="M202 154H1M91.479 154.022V13.852M47.775 197.984l43.704-43.962"
      />
      <path
        stroke="currentColor"
        strokeWidth=".75"
        d="M162.301 5.375c3.19 0 6.327 2.464 9.254 7.167 2.913 4.683 5.552 11.485 7.772 19.923 4.44 16.871 7.19 40.2 7.19 65.981 0 25.782-2.75 49.11-7.19 65.981-2.22 8.438-4.858 15.24-7.772 19.924-2.927 4.703-6.064 7.166-9.254 7.166-3.19-.001-6.327-2.463-9.253-7.166-2.914-4.684-5.552-11.486-7.773-19.924-4.439-16.871-7.19-40.199-7.19-65.98s2.751-49.111 7.19-65.982c2.221-8.438 4.859-15.24 7.773-19.923 2.926-4.703 6.063-7.167 9.253-7.167ZM91.479 154.022 149.022 21.23M91.479 154.022l67.379 36.394M47.707 62.426c-1.901 0-3.81 1.46-5.617 4.346-1.796 2.866-3.427 7.04-4.802 12.23-2.748 10.373-4.453 24.725-4.453 40.592s1.704 30.219 4.453 40.593c1.375 5.19 3.006 9.363 4.802 12.229 1.808 2.886 3.716 4.346 5.617 4.346s3.809-1.46 5.616-4.346c1.796-2.866 3.427-7.039 4.802-12.229 2.749-10.374 4.453-24.726 4.453-40.593s-1.704-30.219-4.453-40.593c-1.375-5.19-3.006-9.363-4.802-12.23-1.807-2.885-3.715-4.345-5.616-4.345ZM91.479 154.022 55.576 71.396M91.479 154.022l-41.805 22.131"
      />
    </svg>
  )
}

function AccountabilityArt({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 202 202"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        stroke="currentColor"
        strokeLinejoin="bevel"
        strokeWidth=".75"
        d="M5.919 43.791h143.957v143.957H5.919zM51.266 15h143.957l-45.347 28.791H5.919z"
      />
      <path
        stroke="currentColor"
        strokeLinejoin="bevel"
        strokeWidth=".75"
        d="M51.266 86.979h143.957l-45.347 28.791H5.919zM51.266 158.957h143.957l-45.347 28.791H5.919z"
      />
      <path
        stroke="currentColor"
        strokeLinejoin="bevel"
        strokeWidth=".75"
        d="M149.876 43.791 195.222 15v143.957l-45.346 28.791zM5.92 43.791 51.265 15v143.957L5.919 187.748zM77.178 43.791 122.525 15v143.957l-45.347 28.791z"
      />
      <path
        stroke="currentColor"
        strokeDasharray="0.01 4"
        strokeLinecap="round"
        strokeWidth="1.25"
        d="M6.223 187.567 195.222 15M149.723 187.567 51.625 15.36M6.279 44.152l188.444 114.415"
      />
    </svg>
  )
}

function ProvenanceArt({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 202 202"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="71.4829" cy="101.5" r="70.0092" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="63.7054" cy="101.127" r="62.2317" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="56.2522" cy="101.154" r="54.7786" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="79.0783" cy="101.5" r="77.6046" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="86.4205" cy="101.5" r="84.9469" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="93.5096" cy="101.5" r="92.0359" stroke="currentColor" strokeWidth="0.75" />
      <circle
        cx="100.599"
        cy="101.5"
        r="99.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeDasharray="0.01 4.01"
      />
    </svg>
  )
}

const PILLARS = [
  {
    Art: ModerationArt,
    title: "Security",
    description: "We encrypt data in transit and at rest, and monitor for threats around the clock.",
  },
  {
    Art: AccountabilityArt,
    title: "Compliance",
    description: "We meet the standards your industry requires, from SOC 2 to GDPR.",
  },
  {
    Art: ProvenanceArt,
    title: "Reliability",
    description: "We build for uptime with redundancy and transparent status reporting.",
  },
]

export function SafetyShowcase() {
  return (
    <section className="flex flex-col gap-10 pb-24 md:pb-32">
      {/* Header */}
      <div className="flex max-w-3xl flex-col gap-5">
        <p className="text-sm font-medium text-muted-foreground">Acme Trust</p>
        <h2 className="text-3xl font-normal tracking-tight text-foreground text-balance md:text-4xl">
          Trust, built in
        </h2>
        <p className="max-w-2xl text-base text-foreground text-pretty">
          Security and reliability are core to how we build. Every release
          ships with safeguards for security, compliance, and reliability.
        </p>
        <div>
          <Button size="lg">Learn more</Button>
        </div>
      </div>

      {/* Pillar cards — horizontal scroll on all viewports */}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PILLARS.map(({ Art, title, description }) => (
          <div
            key={title}
            className="flex w-[19rem] max-w-[80vw] shrink-0 snap-start flex-col gap-8 rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex flex-1 items-center justify-center py-4 text-foreground">
              <Art className="h-48 w-48" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-medium text-foreground">{title}</h3>
              <p className="text-sm text-foreground text-pretty">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

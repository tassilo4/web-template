import { Button } from "@/components/ui/button"

const POSTS = [
  {
    title: "Introducing Workflows in Acme Studio",
    category: "Product",
    date: "Mar 11, 2026",
    dateTime: "2026-03-11",
    href: "#",
  },
  {
    title: "Introducing Acme for Enterprise",
    category: "Product",
    date: "Feb 11, 2026",
    dateTime: "2026-02-11",
    href: "#",
  },
  {
    title: "Bringing custom fields to every workspace",
    category: "Research",
    date: "Jan 21, 2026",
    dateTime: "2026-01-21",
    href: "#",
  },
  {
    title: "Scaling real-time sync to millions of users",
    category: "Engineering",
    date: "Dec 18, 2025",
    dateTime: "2025-12-18",
    href: "#",
  },
]

export function UpdatesShowcase() {
  return (
    <section className="flex flex-col gap-10 pb-24 md:pb-32">
      {/* Header */}
      <div className="flex max-w-3xl flex-col gap-5">
        <p className="text-sm font-medium text-muted-foreground">Newsroom</p>
        <h2 className="text-3xl font-normal tracking-tight text-foreground text-balance md:text-4xl">
          Latest updates
        </h2>
        <p className="max-w-2xl text-base text-foreground text-pretty">
          Product news, research, and announcements from the Acme team.
        </p>
        <div>
          <Button variant="outline" size="lg">All posts</Button>
        </div>
      </div>

      {/* Post cards — horizontal scroll on all viewports */}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {POSTS.map((post) => (
          <article
            key={post.title}
            className="w-[20rem] max-w-[80vw] shrink-0 snap-start"
          >
            <a href={post.href} className="group flex flex-col gap-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
                <div className="absolute -left-10 -top-10 size-40 rounded-full bg-foreground/[0.07] blur-2xl" />
                <div className="absolute -bottom-12 -right-8 size-44 rounded-full bg-foreground/[0.05] blur-2xl" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-normal text-foreground text-pretty group-hover:underline">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2.5 text-sm">
                  <span className="text-foreground">{post.category}</span>
                  <span className="text-muted-foreground" aria-hidden="true">
                    ·
                  </span>
                  <time className="text-muted-foreground" dateTime={post.dateTime}>
                    {post.date}
                  </time>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

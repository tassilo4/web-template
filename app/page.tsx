import { Button } from "@/components/ui/button"
import { HomeNavbar } from "@/components/home-navbar"

export default function Home() {
  return (
    <>
      <HomeNavbar />
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
                Powering the best enterprises, creators, and developers. From
                ElevenAgents for customer experience, ElevenCreative for content
                creation, to the leading AI voice generator.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="default" size="lg">Sign up</Button>
            <Button size="lg" variant="outline">
              Book a demo
            </Button>
          </div>
        </div>

        <div className="h-[150vh]" />
      </section>
    </>
  )
}

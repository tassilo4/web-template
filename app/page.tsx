import { HomeNavbar } from "@/components/home-navbar"
import { Hero } from "@/components/hero"
import { TrustedBy } from "@/components/trusted-by"
import { CreativeShowcase } from "@/components/creative-showcase"
import { AgentsShowcase } from "@/components/agents-showcase"
import { SafetyShowcase } from "@/components/safety-showcase"
import { UpdatesShowcase } from "@/components/updates-showcase"
import { CtaShowcase } from "@/components/cta-showcase"

export default function Home() {
  return (
    <>
      <HomeNavbar />

      <Hero />

      <TrustedBy />

      <CreativeShowcase />

      <AgentsShowcase />

      <SafetyShowcase />

      <UpdatesShowcase />

      <CtaShowcase />
    </>
  )
}

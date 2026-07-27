"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"

const SCROLL_THRESHOLD = 200

export function Navbar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={false}
      animate={{ y: visible ? 0 : "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background"
    >
      <div className="page-container flex items-center justify-between py-4">
        <span className="text-lg font-bold tracking-tight text-foreground">
          Acme
        </span>
        <Button className="" variant="default">Sign up</Button>
      </div>
    </motion.header>
  )
}

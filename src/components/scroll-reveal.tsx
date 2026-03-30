"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function SR({ children, delay = 0, className = "", direction = "up" }: {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: "up" | "left" | "right" | "none"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(e.target) } },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const initial = {
    up: { opacity: 0, y: 32 },
    left: { opacity: 0, x: -32 },
    right: { opacity: 0, x: 32 },
    none: { opacity: 0 },
  }[direction]

  const animate = vis
    ? { opacity: 1, y: 0, x: 0 }
    : {}

  return (
    <motion.div ref={ref} className={className}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  )
}

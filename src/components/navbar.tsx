"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon, Globe } from "lucide-react"
import { useTheme } from "@/lib/theme"
import { useLang } from "@/lib/i18n"

export function Navbar() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const { lang, t, setLang } = useLang()

  const NAV = [
    { href: "/", label: t.nav.home },
    { href: "/hakkimizda", label: t.nav.about },
    { href: "/blog", label: t.nav.blog },
    { href: "/iletisim", label: t.nav.contact },
  ]

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 h-[68px] border-b shadow-sm"
        style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="z-[60] flex items-center">
            <Image
              src="/images/logo2.png"
              alt="İKO Kozmetik"
              width={90}
              height={40}
              style={{ filter: theme === "dark" ? "invert(1)" : "none" }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV.map(n => (
              <Link key={n.href} href={n.href}
                className="text-[.7rem] font-medium uppercase tracking-[.1em] py-1 relative transition-colors"
                style={{ color: path === n.href ? "var(--text)" : "var(--text-muted)" }}>
                {n.label}
                {path === n.href && (
                  <motion.div layoutId="nav-indicator"
                    className="absolute -bottom-0.5 inset-x-0 h-[1.5px] rounded-full"
                    style={{ background: "var(--accent)" }} />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === "tr" ? "en" : "tr")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[.65rem] font-semibold uppercase tracking-wider border transition-all hover:scale-105"
              style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}
            >
              <Globe size={12} />
              {lang === "tr" ? "EN" : "TR"}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:scale-110"
              style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <Link href="/iletisim"
              className="hidden md:flex text-[.7rem] font-semibold uppercase tracking-[.08em] px-5 py-2.5 rounded-full transition-all hover:scale-105 hover:shadow-lg"
              style={{ background: "var(--accent)", color: "white" }}>
              {t.nav.cta}
            </Link>

            <button className="md:hidden z-[60]" style={{ color: "var(--text)" }} onClick={() => setOpen(!open)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center gap-5 px-6"
            style={{ background: "var(--bg)" }}>
            {NAV.map((n, i) => (
              <motion.div key={n.href}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }} className="w-full text-center">
                <Link href={n.href} onClick={() => setOpen(false)}
                  className="text-2xl font-heading tracking-wider transition-colors block py-2"
                  style={{ color: path === n.href ? "var(--accent)" : "var(--text)" }}>
                  {n.label}
                  {path === n.href && <div className="h-0.5 w-8 mx-auto mt-1 rounded-full" style={{ background: "var(--accent)" }} />}
                </Link>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}
              className="w-full mt-4">
              <Link href="/iletisim" onClick={() => setOpen(false)}
                className="block w-full py-3 rounded-full text-sm font-semibold uppercase tracking-wider text-center mb-4"
                style={{ background: "var(--accent)", color: "white" }}>
                {t.nav.cta}
              </Link>
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => setLang(lang === "tr" ? "en" : "tr")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold"
                  style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}>
                  <Globe size={14} />{lang === "tr" ? "English" : "Türkçe"}
                </button>
                <button onClick={toggle}
                  className="w-10 h-10 rounded-full border flex items-center justify-center"
                  style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}>
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

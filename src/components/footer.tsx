"use client"
import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin, Mail } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { useTheme } from "@/lib/theme"

export function Footer() {
  const { t } = useLang()
  const { theme } = useTheme()
  const NAV_LINKS = [
    { href: "/", label: t.nav.home },
    { href: "/hakkimizda", label: t.nav.about },
    { href: "/blog", label: t.nav.blog },
    { href: "/iletisim", label: t.nav.contact },
  ]
  return (
    <footer className="pt-14 pb-6 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="mb-4">
              <Image
                src="/images/1-Photoroom.png"
                alt="İKO Kozmetik"
                width={80}
                height={80}
                className="object-contain"
                style={{ filter: theme === "dark" ? "invert(1)" : "none" }}
              />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{t.footer.desc}</p>
          </div>

          <div>
            <h4 className="font-heading text-sm mb-4" style={{ color: "var(--text)" }}>{t.footer.pages}</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-gold" style={{ color: "var(--text-muted)" }}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm mb-4" style={{ color: "var(--text)" }}>{t.footer.brands}</h4>
            <ul className="space-y-2">
              <li><a href="https://morganspomade.com.tr" target="_blank" rel="noopener" className="text-sm transition-colors hover:text-gold" style={{ color: "var(--text-muted)" }}>Morgan's Pomade</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm mb-4" style={{ color: "var(--text)" }}>{t.footer.contact}</h4>
            <div className="space-y-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
              <p className="flex items-start gap-2"><MapPin size={13} className="text-gold mt-0.5 shrink-0" />Yukarı Dudullu Mah. Alemdağ Cad, Feza Sk. No:12/A, Ümraniye/İstanbul</p>
              <p className="flex items-center gap-2"><Phone size={13} className="text-gold shrink-0" /><a href="tel:+902165102084" className="hover:text-gold transition-colors">(0216) 510 20 84</a></p>
              <p className="flex items-center gap-2"><Mail size={13} className="text-gold shrink-0" /><a href="mailto:info@ikokozmetik.com.tr" className="hover:text-gold transition-colors">info@ikokozmetik.com.tr</a></p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-5 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)", opacity: 0.6 }}>{t.footer.rights} <a href="https://sorajans.com.tr/" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: "#E53E3E" }}>Powered By SorAjans</a></p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-all hover:scale-110 hover:text-gold"
            style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}>↑</button>
        </div>
      </div>
    </footer>
  )
}

"use client"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SR } from "@/components/scroll-reveal"
import { useLang } from "@/lib/i18n"

const CATEGORIES = {
  tr: [
    { name: "Saç Bakımı", href: "https://morganspomade.com.tr/sac-bakimi" },
    { name: "Sakal Bakımı", href: "https://morganspomade.com.tr/sakal---biyik" },
    { name: "Saç Şekillendirici", href: "https://morganspomade.com.tr/sac-sekillendirici" },
    { name: "Koyulaştırıcı", href: "https://morganspomade.com.tr/koyulastirici" },
    { name: "Duş / Cilt", href: "https://morganspomade.com.tr/dus---cilt" },
    { name: "Dökülme Serisi", href: "https://morganspomade.com.tr/dokulme-serisi" },
    { name: "Parfüm", href: "https://morganspomade.com.tr/parfum?o=3&page=1" },
  ],
  en: [
    { name: "Hair Care", href: "https://morganspomade.com.tr/sac-bakimi" },
    { name: "Beard Care", href: "https://morganspomade.com.tr/sakal---biyik" },
    { name: "Hair Styling", href: "https://morganspomade.com.tr/sac-sekillendirici" },
    { name: "Darkening", href: "https://morganspomade.com.tr/koyulastirici" },
    { name: "Shower / Skin", href: "https://morganspomade.com.tr/dus---cilt" },
    { name: "Hair Loss Series", href: "https://morganspomade.com.tr/dokulme-serisi" },
    { name: "Perfume", href: "https://morganspomade.com.tr/parfum?o=3&page=1" },
  ],
}

export default function MarkalarimizPage() {
  const { lang, t } = useLang()
  const b = t.brands
  const cats = CATEGORIES[lang]

  return (
    <>
      <Navbar />

      <section className="relative h-[40vh] min-h-[260px] flex items-center justify-center overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-10 blur-3xl"
            style={{ background: "var(--accent)" }} />
        </div>
        <div className="relative z-10 text-center">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-accent italic text-gold text-lg block mb-2">{b.tag}</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="font-heading text-4xl md:text-6xl" style={{ color: "var(--text)" }}>{b.title}</motion.h1>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SR>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="aspect-square rounded-3xl overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
                <Image src="/images/image_3840.webp" alt="Morgan's Pomade Since 1873" width={600} height={600}
                  className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-gold text-[.65rem] uppercase tracking-[.15em] mb-3 block">{b.est}</span>
                <h2 className="font-heading text-3xl md:text-4xl mb-5" style={{ color: "var(--text)" }}>{b.feature_title}</h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{b.desc}</p>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>{b.feature_desc}</p>
                <a href="https://morganspomade.com.tr" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                  style={{ color: "var(--accent)" }}>
                  {b.explore} <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </SR>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cats.map((cat, i) => (
              <SR key={i} delay={i * 0.06}>
                <a href={cat.href} target="_blank" rel="noopener noreferrer"
                  className="group p-6 rounded-2xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl block"
                  style={{ borderColor: "var(--border)", background: "var(--bg-card)", boxShadow: "var(--shadow)" }}>
                  <h3 className="font-heading text-base mb-2" style={{ color: "var(--text)" }}>{cat.name}</h3>
                  <span className="inline-flex items-center gap-1 text-[.65rem] uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--accent)" }}>
                    {b.explore_hover} <ArrowUpRight size={12} />
                  </span>
                </a>
              </SR>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

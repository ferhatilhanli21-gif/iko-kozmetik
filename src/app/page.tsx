"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SR } from "@/components/scroll-reveal"
import { ArrowRight, ArrowUpRight, Sparkles, Zap, Globe2, Award } from "lucide-react"
import { useLang } from "@/lib/i18n"

function Hero() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center overflow-hidden grid-bg">
      {/* Animated accent orbs */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl animate-float"
          style={{ background: "var(--accent)" }} />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl"
          style={{ background: "#C9A84C", animationDelay: "2s" }} />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full pt-20 pb-16 md:pt-28 md:pb-24">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-4xl sm:text-5xl md:text-7xl font-normal leading-[1.05] mb-5 max-w-4xl">
          <span className="italic text-gradient">{t.hero.title1}</span>
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl" style={{ color: "var(--text)" }}>{t.hero.title2}</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="text-sm md:text-base leading-relaxed max-w-lg mb-10"
          style={{ color: "var(--text-muted)" }}>
          İstanbul&apos;un yıllardır en çok bilinen profesyonel salonlarına hizmet veren marka..
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="flex items-center gap-3 flex-wrap">
          <Link href="#markalar"
            className="px-7 py-3 rounded-full border text-sm font-medium uppercase tracking-wider transition-all hover:scale-105 hover:shadow-md"
            style={{ borderColor: "var(--border-strong)", color: "var(--text)" }}>
            {t.hero.btn1}
          </Link>
          <Link href="/hakkimizda"
            className="group px-7 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all hover:scale-105 hover:shadow-lg flex items-center gap-2"
            style={{ background: "var(--accent)", color: "white" }}>
            {t.hero.btn2} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Stat cards with badge above */}
        <div className="flex flex-col items-start gap-3 mt-10 lg:mt-16">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm"
            style={{ borderColor: "var(--border-strong)", background: "var(--bg-card)" }}>
            <Sparkles size={12} className="text-gold" />
            <span className="text-[.7rem] tracking-wider uppercase" style={{ color: "var(--text-muted)" }}>{t.hero.badge}</span>
          </motion.div>

        </div>
      </motion.div>

    </section>
  )
}

function Marquee() {
  const items = ["İKO KOZMETİK", "Türkiye'nin Bir Çok Şehrinde Bulunan, Profesyonel Salonlara Ürün Hizmeti Sunan Marka."]
  const all = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items]
  return (
    <div className="py-4 border-y overflow-hidden" style={{ borderColor: "var(--border)", background: "var(--bg-elevated)" }}>
      <div className="flex w-max animate-marquee">
        {all.map((txt, i) => (
          <span key={i} className="flex items-center gap-5 pr-5 font-heading text-[.75rem] tracking-[.18em] uppercase"
            style={{ color: "var(--text-muted)" }}>
            {txt}<span className="text-gold text-[.45rem]">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function MorgansShowcase() {
  const { t } = useLang()
  return (
    <section id="markalar" className="py-14 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SR>
          <div className="text-center mb-16">
            <span className="font-accent italic text-gold text-lg block mb-2">{t.brands.tag}</span>
            <h2 className="font-heading text-3xl md:text-5xl mb-4" style={{ color: "var(--text)" }}>{t.brands.title}</h2>
            <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{t.brands.desc}</p>
          </div>
        </SR>

        <SR>
          <div className="rounded-3xl overflow-hidden border mb-8 hover:shadow-xl transition-all duration-500"
            style={{ borderColor: "var(--border)", background: "var(--bg-card)", boxShadow: "var(--shadow)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-[4/3] lg:aspect-auto relative overflow-hidden"
                style={{ background: "var(--bg-elevated)" }}>
                <Image src="/images/Logo-5.png" alt="Morgan's Pomade" fill className="object-contain p-8" />
              </div>
              <div className="p-6 md:p-14 flex flex-col justify-center">
                <span className="text-gold text-[.65rem] uppercase tracking-[.15em] mb-3">{t.brands.est}</span>
                <h3 className="font-heading text-2xl md:text-4xl mb-5" style={{ color: "var(--text)" }}>{t.brands.feature_title}</h3>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>{t.brands.feature_desc}</p>
                <a href="https://morganspomade.com.tr" target="_blank" rel="noopener"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                  style={{ color: "var(--accent)" }}>
                  {t.brands.explore} <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </SR>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {t.brands.cats.map((cat, i) => {
            const images = ["/images/Pomatlar.webp", "/images/Şampuan-Saç-Kremi.webp", "/images/Sakal-Tiraş.webp", "/images/Şekillendirici-Krem.webp"]
            return (
            <SR key={i} delay={i * 0.1}>
              <div className="group rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
                <div className="aspect-[4/5] overflow-hidden relative"
                  style={{ background: "var(--bg-elevated)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={images[i]} alt={cat} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "linear-gradient(to top, rgba(79,110,247,0.15), transparent)" }}>
                    <span className="text-[.65rem] tracking-[.12em] uppercase font-semibold" style={{ color: "var(--accent)" }}>Keşfet →</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-base mb-1" style={{ color: "var(--text)" }}>{cat}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{t.brands.cat_descs[i]}</p>
                </div>
              </div>
            </SR>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FairGallery() {
  const { t } = useLang()
  return (
    <section className="py-14 md:py-24 px-4 sm:px-6" style={{ background: "var(--bg-elevated)" }}>
      <div className="max-w-6xl mx-auto">
        <SR>
          <div className="text-center mb-16">
            <span className="font-accent italic text-gold text-lg block mb-2">{t.gallery.tag}</span>
            <h2 className="font-heading text-3xl md:text-5xl mb-4" style={{ color: "var(--text)" }}>{t.gallery.title}</h2>
            <p className="max-w-md mx-auto text-sm" style={{ color: "var(--text-muted)" }}>{t.gallery.desc}</p>
          </div>
        </SR>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[160px] sm:auto-rows-[200px] lg:auto-rows-[240px]">
          <SR className="col-span-2 row-span-2">
            <div className="relative rounded-2xl overflow-hidden group w-full h-full" style={{ background: "var(--bg-card)" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm italic" style={{ color: "var(--text-muted)", opacity: 0.3 }}>[ FUAR ANA GÖRSEL ]</span>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6"
                style={{ background: "linear-gradient(to top, rgba(79,110,247,0.2), transparent)" }}>
                <h3 className="font-heading text-sm" style={{ color: "var(--text)" }}>Fuar / Etkinlik</h3>
              </div>
            </div>
          </SR>
          {[2, 3, 4, 5].map(i => (
            <SR key={i} delay={i * 0.07}>
              <div className="relative rounded-2xl overflow-hidden group w-full h-full" style={{ background: "var(--bg-card)" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs italic" style={{ color: "var(--text-muted)", opacity: 0.3 }}>[ GÖRSEL {i} ]</span>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ background: "linear-gradient(to top, rgba(79,110,247,0.2), transparent)" }} />
              </div>
            </SR>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutPreview() {
  const { t } = useLang()
  return (
    <section className="py-14 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <SR direction="left">
          <div className="relative">
            <div className="aspect-[4/3] sm:aspect-[3/4] rounded-3xl overflow-hidden flex items-center justify-center"
              style={{ background: "var(--bg-elevated)" }}>
              <span className="text-sm italic" style={{ color: "var(--text-muted)", opacity: 0.3 }}>[ FİRMA FOTOĞRAFI ]</span>
            </div>
            <div className="absolute -bottom-5 -right-5 w-[42%] aspect-square rounded-2xl border-4 overflow-hidden shadow-2xl"
              style={{ background: "var(--bg-card)", borderColor: "var(--bg)", position: "absolute" }}>
              <Image src="/images/1-Photoroom.png" alt="Detay" fill className="object-contain p-2" />
            </div>
          </div>
        </SR>

        <SR direction="right" delay={0.1}>
          <span className="font-accent italic text-gold text-lg block mb-2">{t.about_preview.tag}</span>
          <h2 className="font-heading text-3xl md:text-5xl mb-6 leading-tight" style={{ color: "var(--text)" }}>
            {t.about_preview.title1}<br/>{t.about_preview.title2}
          </h2>
          <p className="text-sm leading-relaxed mb-7" style={{ color: "var(--text-muted)" }}>{t.about_preview.desc}</p>
          <div className="space-y-3 mb-8">
            {t.about_preview.features.map((f, i) => (
              <motion.div key={i} className="flex items-center gap-3 text-sm"
                initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                <span style={{ color: "var(--text)" }}>{f}</span>
              </motion.div>
            ))}
          </div>
          <Link href="/hakkimizda"
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all hover:scale-105 hover:shadow-lg"
            style={{ background: "var(--accent)", color: "white" }}>
            {t.about_preview.btn} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </SR>
      </div>
    </section>
  )
}

function Stats() {
  const { t } = useLang()
  return (
    <section className="py-10 md:py-16 px-4 sm:px-6 border-y" style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {t.stats.map((s, i) => (
          <SR key={i} delay={i * 0.1} className="text-center py-6">
            <div className="font-heading text-4xl md:text-5xl font-bold text-gradient">
              {s.num}<span className="text-2xl">{s.suffix}</span>
            </div>
            <div className="mt-2 text-[.7rem] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{s.label}</div>
          </SR>
        ))}
      </div>
    </section>
  )
}

function CTA() {
  const { t } = useLang()
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden text-center grid-bg">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--accent)" }} />
      </div>
      <SR className="relative z-10">
        <h2 className="font-heading text-3xl md:text-5xl mb-4" style={{ color: "var(--text)" }}>{t.cta.title}</h2>
        <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>{t.cta.desc}</p>
        <Link href="/iletisim"
          className="group inline-flex items-center gap-2 px-9 py-4 rounded-full text-sm font-semibold uppercase tracking-wider transition-all hover:scale-105 hover:shadow-xl animate-pulse-glow"
          style={{ background: "var(--accent)", color: "white" }}>
          {t.cta.btn} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </SR>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <MorgansShowcase />
      <FairGallery />
      <AboutPreview />
      <Stats />
      <CTA />
      <Footer />
    </>
  )
}

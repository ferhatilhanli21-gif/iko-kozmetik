"use client"
import { motion } from "framer-motion"
import { Eye, Target, Star } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SR } from "@/components/scroll-reveal"
import { useLang } from "@/lib/i18n"

export default function HakkimizdaPage() {
  const { t } = useLang()
  const a = t.about
  return (
    <>
      <Navbar />

      <section className="relative h-[50vh] min-h-[320px] flex items-center justify-center overflow-hidden grid-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: "var(--accent)" }} />
        </div>
        <div className="relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-heading text-4xl md:text-6xl" style={{ color: "var(--text)" }}>{a.title}</motion.h1>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SR direction="left">
            <span className="font-accent italic text-gold text-lg block mb-2">{a.story_tag}</span>
            <h2 className="font-heading text-3xl md:text-4xl mb-6" style={{ color: "var(--text)" }}>{a.story_title}</h2>
            {[a.p1, a.p2, a.p3].map((p, i) => (
              <p key={i} className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{p}</p>
            ))}
          </SR>
          <SR direction="right" delay={0.2}>
            <div className="aspect-[3/4] rounded-3xl overflow-hidden"
              style={{ background: "var(--bg-elevated)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/adsiz-tasarim.png" alt="İKO Kozmetik" className="w-full h-full object-cover" />
            </div>
          </SR>
        </div>
      </section>

      <section className="py-24 px-6" style={{ background: "var(--bg-elevated)" }}>
        <div className="max-w-6xl mx-auto">
          <SR><div className="text-center mb-16">
            <span className="font-accent italic text-gold text-3xl md:text-5xl block">{a.timeline_tag}</span>
          </div></SR>
          <div className="max-w-2xl mx-auto pl-10 relative">
            <div className="absolute left-[14px] top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, var(--accent), var(--border))" }} />
            {a.milestones.map((m, i) => (
              <SR key={i} delay={i * 0.1} className="relative mb-12 last:mb-0">
                <div className="absolute -left-[30px] top-1 w-3 h-3 rounded-full border-2"
                  style={{ background: "var(--accent)", borderColor: "var(--bg-elevated)" }} />
                {m.year && <span className="font-accent italic text-gold text-sm block mb-1">{m.year}</span>}
                <h3 className="font-heading text-lg mb-1" style={{ color: "var(--text)" }}>{m.title}</h3>
                {m.desc && <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{m.desc}</p>}
              </SR>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Eye, title: a.vision, text: a.vision_text },
            { icon: Target, title: a.mission, text: a.mission_text },
            { icon: Star, title: a.values, text: a.values_text },
          ].map((c, i) => (
            <SR key={i} delay={i * 0.1}>
              <div className="p-8 rounded-3xl border text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl h-full"
                style={{ borderColor: "var(--border)", background: "var(--bg-card)", boxShadow: "var(--shadow)" }}>
                <div className="text-gold flex justify-center mb-4"><c.icon className="w-8 h-8" /></div>
                <h3 className="font-heading text-xl mb-3" style={{ color: "var(--text)" }}>{c.title}</h3>
                <div className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {c.text.split('\n\n').map((line, j) => {
                    const boldMatch = line.match(/\*\*(.+?)\*\*(.*)/)
                    if (boldMatch) {
                      return <p key={j} className="mb-2"><strong style={{ color: "var(--text)" }}>{boldMatch[1]}</strong>{boldMatch[2]}</p>
                    }
                    return <p key={j} className="mb-2">{line}</p>
                  })}
                </div>
              </div>
            </SR>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

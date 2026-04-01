"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SR } from "@/components/scroll-reveal"
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { supabase } from "@/lib/supabase"

function MiniMap() {
  const { t } = useLang()
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Yukari+Dudullu+Mah+Alemdag+Cad+Feza+Sk+No+12+A+Umraniye+Istanbul"
  return (
    <a href={mapUrl} target="_blank" rel="noopener noreferrer"
      className="group block relative rounded-2xl overflow-hidden border transition-all hover:shadow-xl"
      style={{ borderColor: "var(--border)" }}>
      <div className="relative h-[200px] overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.4!2d29.1545!3d41.0195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac8f6a7e0b1d7%3A0x0!2zWXVrYXLEsSBEdWR1bGx1IE1haC4gQWxlbWRhxJ8gQ2FkLCBGZXphIFNrLiBObzoxMi9BLCAzNDc3NSDDnG1yYW5peWUvxLBzdGFuYnVs!5e0!3m2!1str!2str"
          className="w-full h-full border-0 pointer-events-none"
          style={{ filter: "saturate(0.3) contrast(1.1)" }}
          loading="lazy" title="İKO Kozmetik Konum"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: "rgba(201,168,76,0.1)" }}>
          <div className="px-4 py-2 rounded-full text-[.65rem] font-semibold uppercase tracking-wider flex items-center gap-1.5"
            style={{ background: "var(--accent)", color: "white" }}>
            <MapPin size={12} /> {t.contact.maps_open}
          </div>
        </div>
      </div>
      <div className="px-4 py-3 flex items-center gap-2.5" style={{ background: "var(--bg-card)" }}>
        <MapPin size={14} className="text-gold shrink-0" />
        <span className="text-xs leading-tight" style={{ color: "var(--text-muted)" }}>Yukarı Dudullu Mah. Alemdağ Cad, Feza Sk. No:12/A, 34775 Ümraniye/İstanbul</span>
        <ArrowRight size={12} className="ml-auto shrink-0 transition-colors group-hover:text-gold" style={{ color: "var(--text-muted)" }} />
      </div>
    </a>
  )
}

export default function IletisimPage() {
  const { t } = useLang()
  const c = t.contact
  const [sent, setSent] = useState(false)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formMessage, setFormMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await supabase.from('contact_messages').insert({
      name: formName,
      email: formEmail,
      phone: formPhone,
      message: formMessage,
      status: 'new',
    })
    setSent(true)
    setFormName('')
    setFormEmail('')
    setFormPhone('')
    setFormMessage('')
    setTimeout(() => setSent(false), 4000)
  }

  const infoCards = [
    { icon: Phone, label: c.phone_label, content: <a href="tel:+902165102084" className="transition-colors hover:text-gold">(0216) 510 20 84</a> },
    { icon: Mail, label: c.email_label, content: <a href="mailto:info@ikokozmetik.com.tr" className="transition-colors hover:text-gold">info@ikokozmetik.com.tr</a> },
    { icon: Clock, label: c.hours_label, content: <span>{c.hours}</span> },
  ]

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
            className="font-accent italic text-gold text-lg block mb-2">{c.tag}</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="font-heading text-4xl md:text-6xl" style={{ color: "var(--text)" }}>{c.title}</motion.h1>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12">
          <div className="space-y-4">
            <SR><MiniMap /></SR>
            {infoCards.map((card, i) => (
              <SR key={i} delay={(i + 1) * 0.08}>
                <div className="p-5 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg"
                  style={{ borderColor: "var(--border)", background: "var(--bg-card)", boxShadow: "var(--shadow)" }}>
                  <card.icon size={16} className="text-gold mb-2" />
                  <h3 className="font-heading text-sm mb-1" style={{ color: "var(--text)" }}>{card.label}</h3>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>{card.content}</div>
                </div>
              </SR>
            ))}
          </div>

          <SR delay={0.1}>
            <div className="p-8 md:p-10 rounded-3xl border" style={{ borderColor: "var(--border)", background: "var(--bg-card)", boxShadow: "var(--shadow)" }}>
              <h2 className="font-heading text-2xl mb-6" style={{ color: "var(--text)" }}>{c.form_title}</h2>
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <CheckCircle size={48} className="text-gold mb-4" />
                  <p className="font-accent italic text-gold text-xl">{c.success}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <input type="text" required placeholder=" " value={formName} onChange={e => setFormName(e.target.value)}
                        className="peer w-full rounded-xl px-4 py-3 text-sm outline-none border transition-all focus:ring-2"
                        style={{ background: "var(--bg-elevated)", borderColor: "var(--border-strong)", color: "var(--text)" }}
                        onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                        onBlur={e => (e.target.style.borderColor = "var(--border-strong)")}
                      />
                      <label className="absolute left-4 top-3 text-sm pointer-events-none transition-all
                        peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[.6rem] peer-focus:px-1
                        peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[.6rem] peer-[:not(:placeholder-shown)]:px-1"
                        style={{ color: "var(--text-muted)", background: "var(--bg-elevated)" }}>
                        {c.name}
                      </label>
                    </div>
                    <div className="relative">
                      <input type="email" required placeholder=" " value={formEmail} onChange={e => setFormEmail(e.target.value)}
                        className="peer w-full rounded-xl px-4 py-3 text-sm outline-none border transition-all focus:ring-2"
                        style={{ background: "var(--bg-elevated)", borderColor: "var(--border-strong)", color: "var(--text)" }}
                        onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                        onBlur={e => (e.target.style.borderColor = "var(--border-strong)")}
                      />
                      <label className="absolute left-4 top-3 text-sm pointer-events-none transition-all
                        peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[.6rem] peer-focus:px-1
                        peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[.6rem] peer-[:not(:placeholder-shown)]:px-1"
                        style={{ color: "var(--text-muted)", background: "var(--bg-elevated)" }}>
                        {c.email}
                      </label>
                    </div>
                  </div>
                  <div className="relative">
                    <input type="text" placeholder=" " value={formPhone} onChange={e => setFormPhone(e.target.value)}
                      className="peer w-full rounded-xl px-4 py-3 text-sm outline-none border transition-all"
                      style={{ background: "var(--bg-elevated)", borderColor: "var(--border-strong)", color: "var(--text)" }}
                      onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                      onBlur={e => (e.target.style.borderColor = "var(--border-strong)")}
                    />
                    <label className="absolute left-4 top-3 text-sm pointer-events-none transition-all
                      peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[.6rem] peer-focus:px-1
                      peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[.6rem] peer-[:not(:placeholder-shown)]:px-1"
                      style={{ color: "var(--text-muted)", background: "var(--bg-elevated)" }}>
                      {c.subject}
                    </label>
                  </div>
                  <div className="relative">
                    <textarea required rows={5} placeholder=" " value={formMessage} onChange={e => setFormMessage(e.target.value)}
                      className="peer w-full rounded-xl px-4 py-3 text-sm outline-none border transition-all resize-y min-h-[120px]"
                      style={{ background: "var(--bg-elevated)", borderColor: "var(--border-strong)", color: "var(--text)" }}
                      onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                      onBlur={e => (e.target.style.borderColor = "var(--border-strong)")}
                    />
                    <label className="absolute left-4 top-3 text-sm pointer-events-none transition-all
                      peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[.6rem] peer-focus:px-1
                      peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[.6rem] peer-[:not(:placeholder-shown)]:px-1"
                      style={{ color: "var(--text-muted)", background: "var(--bg-elevated)" }}>
                      {c.message}
                    </label>
                  </div>
                  <button type="submit"
                    className="group inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all hover:scale-105 hover:shadow-lg"
                    style={{ background: "var(--accent)", color: "white" }}>
                    {c.send} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </SR>
        </div>
      </section>
      <Footer />
    </>
  )
}

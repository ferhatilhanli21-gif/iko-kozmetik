"use client"
import { createContext, useContext, useState } from "react"

type Lang = "tr" | "en"

export const translations = {
  tr: {
    nav: { home: "Anasayfa", about: "Hakkımızda", blog: "Blog", contact: "İletişim", cta: "Bize Ulaşın" },
    hero: {
      badge: "Morgan's Pomade Türkiye Distribütörü",
      title1: "Erkeğin Bakımda",
      title2: "Yeni Çağı",
      desc: "1873'ten bu yana zamansız stil ve kaliteyi buluşturan Morgan's Pomade, 50'den fazla ülkede profesyonel erkek bakım ürünleri sunmaktadır.",
      btn1: "Markalarımız",
      btn2: "Hikayemiz",
      scroll: "Keşfet",
    },
    brands: {
      tag: "Markamız",
      title: "Morgan's Pomade",
      desc: "İngiltere'nin en eski saç ve güzellik ürünleri üreticilerinden biri. 1873'ten bu yana profesyonel berber sektörüne kaliteli ürünler sunuyor.",
      est: "Est. 1873 · London",
      feature_title: "Zamansız Stil, Asırlık Kalite",
      feature_desc: "50'den fazla ülkede var olan Morgan's Pomade, 1 Milyar Kavanoz satışına ulaşmıştır.",
      explore: "Ürünleri Keşfet",
      cats: ["Pomade Koleksiyonu", "Saç Bakım", "Sakal & Tıraş", "Şekillendirici"],
      cat_descs: ["Black, Green, Gold, Silver, White, Red", "Şampuan, Saç Kremi, Tonik, Bakım Yağı", "Sakal Yağı, Sakal Kremi, Tıraş Ürünleri", "Wax, Jel, Krem, Köpük, Sprey"],
    },
    gallery: {
      tag: "Galeri",
      title: "Fuarlar & Etkinlikler",
      desc: "Morgan's Pomade fuar katılımları ve etkinlik fotoğrafları",
    },
    about_preview: {
      tag: "İKO Kozmetik",
      title1: "Kaliteyi Erkeklere",
      title2: "Taşıyoruz",
      desc: "İko Kozmetik; Morgan's Pomade markasının Türkiye Distribütörlüğünü yapmaktadır. Profesyonel berber sektörüne kaliteli ürünler sunmaktayız.",
      features: ["Morgan's Pomade Türkiye Distribütörü", "Profesyonel Berber Sektörü", "50+ Ülkede Global Marka"],
      btn: "Daha Fazla",
    },
    stats: [
      { num: "1873", suffix: "", label: "Kuruluş Yılı" },
      { num: "50", suffix: "+", label: "Ülke" },
      { num: "1", suffix: "B+", label: "Kavanoz Satışı" },
      { num: "150", suffix: "+", label: "Ürün Çeşidi" },
    ],
    cta: {
      title: "İş Birliği İçin Hazırız",
      desc: "Distribütörlük, toptan satış veya iş ortaklığı için bize ulaşın.",
      btn: "İletişime Geç",
    },
    footer: {
      desc: "Morgan's Pomade Türkiye Distribütörü. Profesyonel erkek bakım ve kozmetik ürünleri.",
      pages: "Sayfalar",
      brands: "Markalar",
      contact: "İletişim",
      rights: "© 2025 İKO KOZMETİK. Tüm hakları saklıdır.",
      hours: "Pazartesi – Cuma: 09:00 – 18:00",
      coming: "Yakında eklenecek...",
    },
    about: {
      tag: "Biz Kimiz",
      title: "Hakkımızda",
      story_tag: "Hikayemiz",
      story_title: "İKO Kozmetik",
      p1: "İko Kozmetik; İngiltere'nin en eski saç ve güzellik ürünleri üreticilerinden biri olan Morgan's Pomade markasının Türkiye Distribütörlüğünü yapmaktadır.",
      p2: "50'den fazla ülkede var olan Morgan's Pomade, 1 Milyar Kavanoz Pomat satışına ulaştığını gururla açıkladı.",
      p3: "Morgan's Pomade ürün üretiminde mümkün olan en fazla oranda kaliteli içerik ve geri dönüşümlü ambalajlar kullanmaya özen göstermektedir.",
      timeline_tag: "Yolculuk",
      timeline_title: "Kilometre Taşları",
      milestones: [
        { year: "1873", title: "Morgan's Pomade Kuruluşu", desc: "Robert Martin tarafından Londra'da kuruldu." },
        { year: "[YIL]", title: "[İKO Kozmetik Kuruluşu]", desc: "[Açıklama]" },
        { year: "[YIL]", title: "[Türkiye Distribütörlüğü]", desc: "[Açıklama]" },
        { year: "[YIL]", title: "[Büyüme]", desc: "[Açıklama]" },
      ],
      vision: "Vizyonumuz",
      mission: "Misyonumuz",
      values: "Değerlerimiz",
      vision_text: "[Vizyon metni]",
      mission_text: "[Misyon metni]",
      values_text: "[Değerler metni]",
      team_tag: "Ekibimiz",
      team_title: "Arkasındaki İsimler",
    },
    blog: {
      tag: "Yazılar",
      title: "Blog",
      cats: { all: "Tümü", bakim: "Bakım", trend: "Trend", bilgi: "Bilgi" },
      read_more: "Devamını Oku",
    },
    contact: {
      tag: "Bağlantıda Kalın",
      title: "İletişim",
      phone_label: "Telefon",
      email_label: "E-posta",
      hours_label: "Çalışma Saatleri",
      hours: "Pazartesi – Cuma: 09:00 – 18:00",
      form_title: "Bize Yazın",
      name: "Ad Soyad",
      email: "E-posta",
      subject: "Konu",
      message: "Mesajınız",
      send: "Gönder",
      success: "Mesajınız gönderildi!",
      maps_open: "Google Maps'te Aç",
    },
  },
  en: {
    nav: { home: "Home", about: "About Us", blog: "Blog", contact: "Contact", cta: "Contact Us" },
    hero: {
      badge: "Morgan's Pomade Turkey Distributor",
      title1: "The New Era of",
      title2: "Men's Grooming",
      desc: "Since 1873, Morgan's Pomade has united timeless style and quality, offering professional men's grooming products in over 50 countries.",
      btn1: "Our Brands",
      btn2: "Our Story",
      scroll: "Discover",
    },
    brands: {
      tag: "Our Brand",
      title: "Morgan's Pomade",
      desc: "One of England's oldest hair and beauty product manufacturers. Delivering quality products to the professional barber industry since 1873.",
      est: "Est. 1873 · London",
      feature_title: "Timeless Style, Century-old Quality",
      feature_desc: "Present in over 50 countries, Morgan's Pomade has proudly reached 1 Billion jars sold.",
      explore: "Explore Products",
      cats: ["Pomade Collection", "Hair Care", "Beard & Shave", "Styling"],
      cat_descs: ["Black, Green, Gold, Silver, White, Red", "Shampoo, Conditioner, Tonic, Hair Oil", "Beard Oil, Beard Cream, Shaving Products", "Wax, Gel, Cream, Mousse, Spray"],
    },
    gallery: {
      tag: "Gallery",
      title: "Fairs & Events",
      desc: "Morgan's Pomade trade fair participations and event photos",
    },
    about_preview: {
      tag: "İKO Cosmetics",
      title1: "Bringing Quality",
      title2: "To Men",
      desc: "İKO Cosmetics is the official Turkey distributor of Morgan's Pomade. We provide quality products to the professional barber industry.",
      features: ["Morgan's Pomade Turkey Distributor", "Professional Barber Sector", "Global Brand in 50+ Countries"],
      btn: "Learn More",
    },
    stats: [
      { num: "1873", suffix: "", label: "Founded" },
      { num: "50", suffix: "+", label: "Countries" },
      { num: "1", suffix: "B+", label: "Jars Sold" },
      { num: "150", suffix: "+", label: "Products" },
    ],
    cta: {
      title: "Ready to Collaborate",
      desc: "Contact us for distributorship, wholesale or partnership inquiries.",
      btn: "Get in Touch",
    },
    footer: {
      desc: "Morgan's Pomade Turkey Distributor. Professional men's grooming and cosmetics.",
      pages: "Pages",
      brands: "Brands",
      contact: "Contact",
      rights: "© 2025 İKO KOZMETİK. All rights reserved.",
      hours: "Monday – Friday: 09:00 – 18:00",
      coming: "Coming soon...",
    },
    about: {
      tag: "Who We Are",
      title: "About Us",
      story_tag: "Our Story",
      story_title: "İKO Cosmetics",
      p1: "İKO Cosmetics is the official Turkey distributor of Morgan's Pomade, one of England's oldest hair and beauty product manufacturers.",
      p2: "Present in over 50 countries, Morgan's Pomade has proudly announced reaching 1 Billion jar sales.",
      p3: "Morgan's Pomade strives to use the highest quality ingredients and recyclable packaging in all its products.",
      timeline_tag: "Journey",
      timeline_title: "Milestones",
      milestones: [
        { year: "1873", title: "Morgan's Pomade Founded", desc: "Founded in London by Robert Martin." },
        { year: "[YEAR]", title: "[İKO Cosmetics Founded]", desc: "[Description]" },
        { year: "[YEAR]", title: "[Turkey Distributorship]", desc: "[Description]" },
        { year: "[YEAR]", title: "[Growth]", desc: "[Description]" },
      ],
      vision: "Our Vision",
      mission: "Our Mission",
      values: "Our Values",
      vision_text: "[Vision text]",
      mission_text: "[Mission text]",
      values_text: "[Values text]",
      team_tag: "Our Team",
      team_title: "The People Behind",
    },
    blog: {
      tag: "Articles",
      title: "Blog",
      cats: { all: "All", bakim: "Care", trend: "Trend", bilgi: "Info" },
      read_more: "Read More",
    },
    contact: {
      tag: "Stay Connected",
      title: "Contact",
      phone_label: "Phone",
      email_label: "Email",
      hours_label: "Working Hours",
      hours: "Monday – Friday: 09:00 – 18:00",
      form_title: "Write to Us",
      name: "Full Name",
      email: "Email",
      subject: "Subject",
      message: "Your Message",
      send: "Send",
      success: "Your message has been sent!",
      maps_open: "Open in Google Maps",
    },
  },
}

const LangCtx = createContext<{ lang: Lang; t: typeof translations.tr; setLang: (l: Lang) => void }>({
  lang: "tr",
  t: translations.tr,
  setLang: () => {},
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr")

  const setLang = (l: Lang) => {
    setLangState(l)
    if (typeof window !== "undefined") localStorage.setItem("lang", l)
  }

  return (
    <LangCtx.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LangCtx.Provider>
  )
}

export const useLang = () => useContext(LangCtx)

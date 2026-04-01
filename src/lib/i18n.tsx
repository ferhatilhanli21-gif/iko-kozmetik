"use client"
import { createContext, useContext, useState } from "react"

type Lang = "tr" | "en"

export const translations = {
  tr: {
    nav: { home: "Anasayfa", about: "Hakkımızda", blog: "Blog", contact: "İletişim", cta: "Bize Ulaşın" },
    hero: {
      badge: "Morgan's Pomade Türkiye Distribütörü",
      title1: "Profesyonel Kozmetik Markalarını",
      title2: "Sizlerle Buluşturuyoruz",
      desc: "İstanbul'un yıllardır en çok bilinen profesyonel salonlarına hizmet veren marka..",
      btn1: "Markalarımız",
      btn2: "Hikayemiz",
      scroll: "Keşfet",
    },
    marquee: ["İKO KOZMETİK", "Türkiye'nin Bir Çok Şehrinde Bulunan, Profesyonel Salonlara Ürün Hizmeti Sunan Marka."],
    brands: {
      tag: "Markamız",
      title: "Morgan's Pomade",
      desc: "İngiltere'nin en eski saç ve güzellik ürünleri üreticilerinden biri. 1873'ten bu yana profesyonel berber sektörüne kaliteli ürünler sunuyor.",
      est: "Est. 1873 · London",
      feature_title: "Zamansız Stil, Asırlık Kalite",
      feature_desc: "50'den fazla ülkede var olan Morgan's Pomade, 1 Milyar Kavanoz satışına ulaşmıştır.",
      explore: "Ürünleri Keşfet",
      explore_hover: "Keşfet →",
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
      title1: "Kaliteyi Sizlere",
      title2: "Taşıyoruz",
      desc: "İko Kozmetik; Morgan's Pomade markasının Türkiye Distribütörlüğünü yapmaktadır. Profesyonel berber sektörüne kaliteli ürünler sunmaktayız.",
      features: ["Morgan's Pomade Türkiye Distribütörü", "Profesyonel Berber Sektörü"],
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
      rights: "© 2026 İKO KOZMETİK. Tüm hakları saklıdır.",
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
        { year: "", title: "İKO Kozmetik Kuruluşu", desc: "" },
        { year: "", title: "Morgan's Pomade", desc: "" },
        { year: "", title: "Türkiye Distribütörlüğü", desc: "" },
        { year: "", title: "Büyüme", desc: "" },
      ],
      vision: "Vizyonumuz",
      mission: "Misyonumuz",
      values: "Değerlerimiz",
      vision_text: "Türkiye'deki kuaför ve berber salonlarının, dünya standartlarında profesyonel ürünlere erişebildiği bir sektör yaratmak. Salonların \"yurtdışından getirtme\" derdini bitirip, kanıtlanmış markaları kapılarına kadar getiren referans distribütör olmak.",
      mission_text: "Yurtdışında kendini ispatlamış, kaliteli profesyonel bakım markalarını Türkiye'deki kuaför ve berber salonlarıyla buluşturmak. Sadece ürün satmak değil, markanın arkasındaki bilgiyi, eğitimi ve kullanım kültürünü de salonlara taşımak.",
      values_text: "**Kalite** – Sadece kendini kanıtlamış markalarla çalışırız.\n\n**Güvenilirlik** – Stok, fiyat ve iletişimde tutarlıyız.\n\n**Bilgi** – Ürün eğitimi ve kullanım kültürünü salonlara taşırız.",
      values_list: [],
      team_tag: "Ekibimiz",
      team_title: "Arkasındaki İsimler",
    },
    blog: {
      tag: "Yazılar",
      title: "Blog",
      cats: { all: "Tümü", bakim: "Bakım", trend: "Trend", bilgi: "Bilgi" },
      read_more: "Devamını Oku",
      loading: "Yükleniyor...",
      no_posts: "Henüz yazı yok.",
      placeholder_image: "[ BLOG GÖRSELİ ]",
      back_to_blog: "Blog'a Dön",
      back_to_all: "Tüm Yazılara Dön",
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
      title1: "Professional Cosmetic Brands",
      title2: "Delivered to You",
      desc: "The brand that has been serving Istanbul's most renowned professional salons for years..",
      btn1: "Our Brands",
      btn2: "Our Story",
      scroll: "Discover",
    },
    marquee: ["İKO COSMETICS", "The Brand Providing Product Services to Professional Salons Across Turkey."],
    brands: {
      tag: "Our Brand",
      title: "Morgan's Pomade",
      desc: "One of England's oldest hair and beauty product manufacturers. Delivering quality products to the professional barber industry since 1873.",
      est: "Est. 1873 · London",
      feature_title: "Timeless Style, Century-old Quality",
      feature_desc: "Present in over 50 countries, Morgan's Pomade has proudly reached 1 Billion jars sold.",
      explore: "Explore Products",
      explore_hover: "Explore →",
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
      features: ["Morgan's Pomade Turkey Distributor", "Professional Barber Sector"],
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
      rights: "© 2026 İKO KOZMETİK. All rights reserved.",
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
        { year: "", title: "İKO Cosmetics Founded", desc: "" },
        { year: "", title: "Morgan's Pomade", desc: "" },
        { year: "", title: "Turkey Distributorship", desc: "" },
        { year: "", title: "Growth", desc: "" },
      ],
      vision: "Our Vision",
      mission: "Our Mission",
      values: "Our Values",
      vision_text: "To create an industry where barber shops and hair salons in Turkey can access world-class professional products. To become the reference distributor that brings proven brands right to their doors, eliminating the hassle of importing from abroad.",
      mission_text: "To connect internationally proven, high-quality professional grooming brands with barber shops and hair salons across Turkey. Not just selling products, but also bringing the knowledge, training, and culture of use behind each brand to the salons.",
      values_text: "**Quality** – We only work with proven brands.\n\n**Reliability** – We are consistent in stock, pricing, and communication.\n\n**Knowledge** – We bring product training and usage culture to salons.",
      values_list: [],
      team_tag: "Our Team",
      team_title: "The People Behind",
    },
    blog: {
      tag: "Articles",
      title: "Blog",
      cats: { all: "All", bakim: "Care", trend: "Trend", bilgi: "Info" },
      read_more: "Read More",
      loading: "Loading...",
      no_posts: "No posts yet.",
      placeholder_image: "[ BLOG IMAGE ]",
      back_to_blog: "Back to Blog",
      back_to_all: "Back to All Posts",
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

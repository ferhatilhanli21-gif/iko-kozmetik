/**
 * İKO Kozmetik — DOM Testleri
 */
import "@testing-library/jest-dom"
import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"

// ─── Mock'lar ────────────────────────────────────────────────────────────────
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: jest.fn() }),
}))

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className, style }: {
    src: string; alt: string; width?: number; height?: number; className?: string; style?: React.CSSProperties
  }) => <img src={src} alt={alt} width={width} height={height} className={className} style={style} />,
}))

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, className, style, onClick }: {
    href: string; children: React.ReactNode; className?: string; style?: React.CSSProperties; onClick?: () => void
  }) => <a href={href} className={className} style={style} onClick={onClick}>{children}</a>,
}))

jest.mock("framer-motion", () => {
  const FakeMotion = ({ children, className, style, onClick }: {
    children?: React.ReactNode; className?: string; style?: React.CSSProperties; onClick?: () => void
  }) => <div className={className} style={style} onClick={onClick}>{children}</div>

  return {
    motion: {
      div: FakeMotion,
      h1: ({ children, className, style }: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) =>
        <h1 className={className} style={style}>{children}</h1>,
      p: ({ children, className, style }: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) =>
        <p className={className} style={style}>{children}</p>,
      span: ({ children, className, style }: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) =>
        <span className={className} style={style}>{children}</span>,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => 0,
  }
})

jest.mock("@/lib/theme", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useTheme: () => ({ theme: "light", toggle: jest.fn() }),
}))

const mockT = {
  nav: { home: "Anasayfa", about: "Hakkımızda", blog: "Blog", contact: "İletişim", cta: "Bize Ulaşın" },
  hero: {
    badge: "Morgan's Pomade Türkiye Distribütörü",
    title1: "Erkeğin Bakımda", title2: "Yeni Çağı",
    desc: "1873'ten bu yana zamansız stil.", btn1: "Markalarımız", btn2: "Hikayemiz", scroll: "Keşfet",
  },
  brands: {
    tag: "Markamız", title: "Morgan's Pomade",
    desc: "İngiltere'nin en eski saç ürünleri üreticisi.",
    est: "Est. 1873 · London", feature_title: "Zamansız Stil",
    feature_desc: "50+ ülke.", explore: "Ürünleri Keşfet",
    cats: ["Pomade Koleksiyonu", "Saç Bakım", "Sakal & Tıraş", "Şekillendirici"],
    cat_descs: ["Black, Green, Gold", "Şampuan", "Sakal Yağı", "Wax"],
  },
  gallery: { tag: "Galeri", title: "Fuarlar & Etkinlikler", desc: "Fuar fotoğrafları" },
  about_preview: {
    tag: "İKO Kozmetik", title1: "Kaliteyi Erkeklere", title2: "Taşıyoruz",
    desc: "Türkiye Distribütörü.", features: ["Morgan's Pomade TR", "Berber Sektörü", "50+ Ülke"], btn: "Daha Fazla",
  },
  stats: [
    { num: "1873", suffix: "", label: "Kuruluş Yılı" },
    { num: "50", suffix: "+", label: "Ülke" },
    { num: "1", suffix: "B+", label: "Kavanoz" },
    { num: "150", suffix: "+", label: "Ürün" },
  ],
  cta: { title: "İş Birliği İçin Hazırız", desc: "Bize ulaşın.", btn: "İletişime Geç" },
  footer: {
    desc: "Morgan's Pomade Türkiye Distribütörü.", pages: "Sayfalar", brands: "Markalar",
    contact: "İletişim", rights: "© 2025 İKO KOZMETİK.", hours: "Pzt–Cum 09:00–18:00", coming: "Yakında...",
  },
}

jest.mock("@/lib/i18n", () => ({
  LangProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useLang: () => ({ lang: "tr", setLang: jest.fn(), t: mockT }),
}))

// ─── Import bileşenler ────────────────────────────────────────────────────────
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SR } from "@/components/scroll-reveal"

// ─── Navbar Testleri ──────────────────────────────────────────────────────────
describe("🧭 Navbar", () => {
  beforeEach(() => { render(<Navbar />) })

  test("logo görseli render edilmeli", () => {
    expect(screen.getByAltText("İKO Kozmetik")).toBeInTheDocument()
  })

  test("Anasayfa linki render edilmeli", () => {
    expect(screen.getAllByText("Anasayfa")[0]).toBeInTheDocument()
  })

  test("Hakkımızda linki render edilmeli", () => {
    expect(screen.getAllByText("Hakkımızda")[0]).toBeInTheDocument()
  })

  test("Blog linki render edilmeli", () => {
    expect(screen.getAllByText("Blog")[0]).toBeInTheDocument()
  })

  test("İletişim linki render edilmeli", () => {
    expect(screen.getAllByText("İletişim")[0]).toBeInTheDocument()
  })

  test("'Bize Ulaşın' CTA butonu mevcut olmalı", () => {
    expect(screen.getAllByText("Bize Ulaşın")[0]).toBeInTheDocument()
  })

  test("Dil toggle butonu 'EN' göstermeli", () => {
    expect(screen.getByText("EN")).toBeInTheDocument()
  })

  test("Anasayfa linki '/' href'ine sahip olmalı", () => {
    const links = document.querySelectorAll('a[href="/"]')
    expect(links.length).toBeGreaterThan(0)
  })

  test("/hakkimizda linki mevcut olmalı", () => {
    expect(document.querySelector('a[href="/hakkimizda"]')).toBeInTheDocument()
  })

  test("/blog linki mevcut olmalı", () => {
    expect(document.querySelector('a[href="/blog"]')).toBeInTheDocument()
  })

  test("/iletisim linki mevcut olmalı", () => {
    expect(document.querySelector('a[href="/iletisim"]')).toBeInTheDocument()
  })
})

// ─── Footer Testleri ──────────────────────────────────────────────────────────
describe("🦶 Footer", () => {
  beforeEach(() => { render(<Footer />) })

  test("footer elementi render edilmeli", () => {
    expect(document.querySelector("footer")).toBeInTheDocument()
  })

  test("logo görseli render edilmeli", () => {
    expect(screen.getByAltText("İKO Kozmetik")).toBeInTheDocument()
  })

  test("Ümraniye adresi görünmeli", () => {
    expect(screen.getByText(/Ümraniye/)).toBeInTheDocument()
  })

  test("telefon numarası render edilmeli", () => {
    expect(screen.getByText("(0216) 510 20 84")).toBeInTheDocument()
  })

  test("email adresi render edilmeli", () => {
    expect(screen.getByText("info@ikokozmetik.com.tr")).toBeInTheDocument()
  })

  test("tel: linki doğru href'e sahip olmalı", () => {
    expect(document.querySelector('a[href="tel:+902165102084"]')).toBeInTheDocument()
  })

  test("mailto: linki doğru href'e sahip olmalı", () => {
    expect(document.querySelector('a[href="mailto:info@ikokozmetik.com.tr"]')).toBeInTheDocument()
  })

  test("copyright metni render edilmeli", () => {
    expect(screen.getByText(/2025 İKO KOZMETİK/)).toBeInTheDocument()
  })

  test("yukarı çık butonu render edilmeli", () => {
    expect(screen.getByText("↑")).toBeInTheDocument()
  })

  test("Morgan's Pomade linki render edilmeli", () => {
    expect(screen.getByText("Morgan's Pomade")).toBeInTheDocument()
  })

  test("Morgan's Pomade sitesine giden link mevcut olmalı", () => {
    expect(document.querySelector('a[href="https://morganspomade.com.tr"]')).toBeInTheDocument()
  })

  test("sayfalar listesi render edilmeli", () => {
    expect(screen.getByText("Sayfalar")).toBeInTheDocument()
  })

  test("yukarı çık butonu window.scrollTo çağırmalı", () => {
    const btn = screen.getByText("↑")
    fireEvent.click(btn)
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" })
  })
})

// ─── Scroll Reveal Testleri ───────────────────────────────────────────────────
describe("✨ ScrollReveal (SR)", () => {
  test("children render edilmeli", () => {
    render(<SR><p>Test içerik</p></SR>)
    expect(screen.getByText("Test içerik")).toBeInTheDocument()
  })

  test("className prop'u uygulanmalı", () => {
    const { container } = render(<SR className="test-class"><span>x</span></SR>)
    expect(container.firstChild).toHaveClass("test-class")
  })

  test("direction='left' ile render edilmeli", () => {
    render(<SR direction="left"><span>sol animasyon</span></SR>)
    expect(screen.getByText("sol animasyon")).toBeInTheDocument()
  })

  test("direction='right' ile render edilmeli", () => {
    render(<SR direction="right"><span>sağ animasyon</span></SR>)
    expect(screen.getByText("sağ animasyon")).toBeInTheDocument()
  })

  test("delay prop'u ile render edilmeli", () => {
    render(<SR delay={0.5}><span>gecikmeli</span></SR>)
    expect(screen.getByText("gecikmeli")).toBeInTheDocument()
  })
})

// ─── Erişilebilirlik Testleri ─────────────────────────────────────────────────
describe("♿ Erişilebilirlik", () => {
  test("footer img alt metni olmalı", () => {
    render(<Footer />)
    const img = screen.getByAltText("İKO Kozmetik")
    expect(img).toHaveAttribute("alt")
  })

  test("navbar img alt metni olmalı", () => {
    render(<Navbar />)
    const img = screen.getByAltText("İKO Kozmetik")
    expect(img).toHaveAttribute("alt")
  })

  test("footer telefon linki geçerli tel: protokolü kullanmalı", () => {
    render(<Footer />)
    const tel = document.querySelector('a[href^="tel:"]')
    expect(tel).toBeInTheDocument()
    expect(tel?.getAttribute("href")).toMatch(/^tel:/)
  })

  test("footer email linki geçerli mailto: protokolü kullanmalı", () => {
    render(<Footer />)
    const mail = document.querySelector('a[href^="mailto:"]')
    expect(mail).toBeInTheDocument()
    expect(mail?.getAttribute("href")).toMatch(/^mailto:/)
  })

  test("harici linkler target='_blank' olmalı", () => {
    render(<Footer />)
    const externalLinks = document.querySelectorAll('a[target="_blank"]')
    expect(externalLinks.length).toBeGreaterThan(0)
  })
})

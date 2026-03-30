import type { Metadata } from "next"
import { Playfair_Display, DM_Sans, Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/lib/theme"
import { LangProvider } from "@/lib/i18n"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-heading", display: "swap" })
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" })
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-accent", display: "swap" })

export const metadata: Metadata = {
  title: "İKO KOZMETİK — Erkek Bakım & Kozmetik",
  description: "Morgan's Pomade Türkiye Distribütörü. Profesyonel erkek bakım ve kozmetik ürünleri.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LangProvider>
            {children}
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

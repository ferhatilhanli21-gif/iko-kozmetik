"use client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLang } from "@/lib/i18n"

export function BlogBackLink() {
  const { t } = useLang()
  return (
    <Link
      href="/blog"
      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-8 transition-colors hover:opacity-70"
      style={{ color: 'var(--text-muted)' }}
    >
      <ArrowLeft size={14} />
      {t.blog.back_to_blog}
    </Link>
  )
}

export function BlogBackAllLink() {
  const { t } = useLang()
  return (
    <Link
      href="/blog"
      className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-colors hover:opacity-70"
      style={{ color: 'var(--accent)' }}
    >
      <ArrowLeft size={14} />
      {t.blog.back_to_all}
    </Link>
  )
}

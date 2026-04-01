"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { useLang } from '@/lib/i18n'
import type { Post } from '@/lib/admin-data'

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const rawSlug = (params?.slug as string) || ''
  const slug = decodeURIComponent(rawSlug)
  const { t } = useLang()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) return

    async function fetchPost() {
      try {
        const { data, error: dbError } = await supabase
          .from('posts')
          .select('*')
          .eq('status', 'published')

        if (dbError) {
          console.error('Supabase error:', dbError)
          setError('Veritabanı hatası')
          setLoading(false)
          return
        }

        if (data && data.length > 0) {
          const found = data.find((p: Post) =>
            p.slug === slug ||
            p.slug === rawSlug ||
            encodeURIComponent(p.slug) === rawSlug
          )
          if (found) {
            setPost(found as Post)
          } else {
            setError(`Yazı bulunamadı. Slug: "${slug}", DB slugs: ${data.map((p: Post) => p.slug).join(', ')}`)
          }
        } else {
          setError('Hiç yayınlanmış yazı yok')
        }
      } catch (err) {
        console.error('Fetch error:', err)
        setError('Bağlantı hatası')
      }
      setLoading(false)
    }

    fetchPost()
  }, [slug, rawSlug])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <span style={{ color: "var(--text-muted)" }}>{t.blog.loading}</span>
        </div>
        <Footer />
      </>
    )
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
          <span className="text-lg" style={{ color: "var(--text-muted)" }}>Yazı bulunamadı</span>
          {error && <span className="text-xs max-w-md text-center" style={{ color: "var(--text-muted)", opacity: 0.5 }}>{error}</span>}
          <button
            onClick={() => router.push('/blog')}
            className="flex items-center gap-2 text-sm font-semibold mt-4"
            style={{ color: "var(--accent)" }}
          >
            <ArrowLeft size={14} /> {t.blog.back_to_blog}
          </button>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      {/* Blog'a Dön butonu — hero üstünde */}
      <div className="pt-24 pb-4 px-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => router.push('/blog')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:opacity-70"
            style={{ color: 'var(--text-muted)' }}
          >
            <ArrowLeft size={14} />
            {t.blog.back_to_blog}
          </button>
        </div>
      </div>

      <section className="relative pt-6 pb-16 px-6 grid-bg">
        <div className="max-w-3xl mx-auto">
          {post.category && (
            <span
              className="inline-block text-[.6rem] font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-5"
              style={{ background: 'var(--accent)', color: 'white' }}
            >
              {post.category}
            </span>
          )}

          <h1
            className="font-heading text-4xl md:text-5xl leading-tight mb-6"
            style={{ color: 'var(--text)' }}
          >
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {post.publish_date
                ? format(new Date(post.publish_date), 'd MMMM yyyy', { locale: tr })
                : format(new Date(post.created_at), 'd MMMM yyyy', { locale: tr })}
            </span>
            {post.author && <span>· {post.author}</span>}
            {post.tags && post.tags.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Tag size={12} />
                {post.tags.join(', ')}
              </span>
            )}
          </div>
        </div>
      </section>

      {post.featured_image && (
        <div className="max-w-4xl mx-auto px-6 -mt-4 mb-12">
          <div className="rounded-2xl overflow-hidden aspect-video border" style={{ borderColor: 'var(--border)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <article className="max-w-3xl mx-auto px-6 pb-24">
        <div className="prose prose-lg max-w-none" style={{ color: 'var(--text)' }}>
          {post.content.split('\n').map((line, i) => (
            line.trim() === '' ? <br key={i} /> : (
              <p key={i} className="mb-4 leading-relaxed text-sm md:text-base" style={{ color: 'var(--text)' }}>
                {line}
              </p>
            )
          ))}
        </div>

        <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={() => router.push('/blog')}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-colors hover:opacity-70"
            style={{ color: 'var(--accent)' }}
          >
            <ArrowLeft size={14} />
            {t.blog.back_to_all}
          </button>
        </div>
      </article>

      <Footer />
    </>
  )
}

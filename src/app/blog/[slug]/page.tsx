export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import type { Post } from '@/lib/admin-data'
import { BlogBackLink, BlogBackAllLink } from './blog-links'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) notFound()

  const p = post as Post

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 grid-bg">
        <div className="max-w-3xl mx-auto">
          <BlogBackLink />

          {p.category && (
            <span
              className="inline-block text-[.6rem] font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
              style={{ background: 'var(--accent)', color: 'white' }}
            >
              {p.category}
            </span>
          )}

          <h1
            className="font-heading text-4xl md:text-5xl leading-tight mb-6"
            style={{ color: 'var(--text)' }}
          >
            {p.title}
          </h1>

          {p.excerpt && (
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
              {p.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {p.publish_date
                ? format(new Date(p.publish_date), 'd MMMM yyyy', { locale: tr })
                : format(new Date(p.created_at), 'd MMMM yyyy', { locale: tr })}
            </span>
            {p.author && <span>· {p.author}</span>}
            {p.tags && p.tags.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Tag size={12} />
                {p.tags.join(', ')}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Featured image */}
      {p.featured_image && (
        <div className="max-w-4xl mx-auto px-6 -mt-4 mb-12">
          <div className="rounded-2xl overflow-hidden aspect-video border" style={{ borderColor: 'var(--border)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.featured_image}
              alt={p.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 pb-24">
        <div
          className="prose prose-lg max-w-none"
          style={{ color: 'var(--text)' }}
        >
          {p.content.split('\n').map((line, i) => (
            line.trim() === '' ? <br key={i} /> : (
              <p key={i} className="mb-4 leading-relaxed text-sm md:text-base" style={{ color: 'var(--text)' }}>
                {line}
              </p>
            )
          ))}
        </div>

        <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <BlogBackAllLink />
        </div>
      </article>

      <Footer />
    </>
  )
}

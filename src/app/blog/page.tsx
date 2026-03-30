"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SR } from "@/components/scroll-reveal"
import { useLang } from "@/lib/i18n"
import { supabase } from "@/lib/supabase"
import type { Post } from "@/lib/admin-data"
import { format } from "date-fns"

export default function BlogPage() {
  const { t } = useLang()
  const [active, setActive] = useState("all")
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('publish_date', { ascending: false })
      if (data) setPosts(data as Post[])
      setLoading(false)
    }
    fetchPosts()
  }, [])

  const categories = ['all', ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))]
  const filtered = active === 'all' ? posts : posts.filter(p => p.category === active)

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
            className="font-accent italic text-gold text-lg block mb-2">{t.blog.tag}</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="font-heading text-4xl md:text-6xl" style={{ color: "var(--text)" }}>{t.blog.title}</motion.h1>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {!loading && categories.length > 1 && (
            <div className="flex gap-2 justify-center flex-wrap mb-12">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActive(cat)}
                  className="text-[.7rem] font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full border transition-all hover:scale-105"
                  style={{
                    background: active === cat ? "var(--accent)" : "transparent",
                    color: active === cat ? "white" : "var(--text-muted)",
                    borderColor: active === cat ? "var(--accent)" : "var(--border-strong)",
                  }}>
                  {cat === 'all' ? (t.blog.cats.all) : cat}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="text-center py-20" style={{ color: "var(--text-muted)" }}>{t.blog.loading}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20" style={{ color: "var(--text-muted)" }}>{t.blog.no_posts}</div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((post, i) => (
                  <SR key={post.id} delay={i * 0.06}>
                    <Link href={`/blog/${post.slug}`}>
                      <article className="rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group cursor-pointer"
                        style={{ borderColor: "var(--border)", background: "var(--bg-card)", boxShadow: "var(--shadow)" }}>
                        <div className="aspect-[16/10] flex items-center justify-center overflow-hidden relative"
                          style={{ background: "var(--bg-elevated)" }}>
                          {post.featured_image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs italic" style={{ color: "var(--text-muted)", opacity: 0.3 }}>{t.blog.placeholder_image}</span>
                          )}
                          {post.category && (
                            <span className="absolute top-3 left-3 text-[.6rem] tracking-wider uppercase px-2.5 py-1 rounded-full font-semibold"
                              style={{ background: "var(--accent)", color: "white" }}>
                              {post.category}
                            </span>
                          )}
                        </div>
                        <div className="p-6">
                          <span className="text-[.6rem] uppercase tracking-wider block mb-2" style={{ color: "var(--text-muted)" }}>
                            {post.publish_date
                              ? format(new Date(post.publish_date), 'dd MMM yyyy')
                              : format(new Date(post.created_at), 'dd MMM yyyy')}
                          </span>
                          <h3 className="font-heading text-lg mb-2 leading-snug transition-colors group-hover:text-gold" style={{ color: "var(--text)" }}>{post.title}</h3>
                          <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{post.excerpt}</p>
                          <span className="text-xs font-semibold uppercase tracking-wider transition-all group-hover:gap-2 flex items-center gap-1"
                            style={{ color: "var(--accent)" }}>{t.blog.read_more} →</span>
                        </div>
                      </article>
                    </Link>
                  </SR>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

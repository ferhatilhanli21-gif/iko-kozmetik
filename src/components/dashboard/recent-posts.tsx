import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Post } from '@/lib/admin-data'
import { format } from 'date-fns'

function SeoScore({ score }: { score: number }) {
  const color =
    score >= 90
      ? 'bg-emerald-500'
      : score >= 70
        ? 'bg-amber-500'
        : 'bg-rose-500'

  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2 h-2 rounded-full ${color} flex-shrink-0`} />
      <span className="text-sm text-muted-foreground">{score}</span>
    </div>
  )
}

export function RecentPosts({ posts }: { posts: Post[] }) {
  return (
    <Card className="border border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">Son Yazılar</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs h-7 gap-1" asChild>
          <Link href="/admin/blog">
            Tümünü gör
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {posts.length === 0 ? (
            <p className="px-6 py-8 text-sm text-muted-foreground text-center">Henüz yazı yok.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between gap-3 px-6 py-3 hover:bg-muted/40 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-1"
                  >
                    {post.title}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">{post.category}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <SeoScore score={post.seo_score} />
                  <Badge
                    variant={post.status === 'published' ? 'default' : 'secondary'}
                    className={
                      post.status === 'published'
                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-0 text-xs'
                        : 'text-xs border-0'
                    }
                  >
                    {post.status === 'published' ? 'Yayında' : 'Taslak'}
                  </Badge>
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {post.publish_date
                      ? format(new Date(post.publish_date), 'MMM d')
                      : format(new Date(post.updated_at), 'MMM d')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

import { supabase } from '@/lib/supabase'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { RecentPosts } from '@/components/dashboard/recent-posts'
import { RecentMessages } from '@/components/dashboard/recent-messages'
import { PostsChart } from '@/components/dashboard/posts-chart'
import type { Post, ContactMessage } from '@/lib/admin-data'

function calcMonthly(posts: Post[]) {
  const labels = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
  const now = new Date()
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    const monthPosts = posts.filter(p => {
      const pd = new Date(p.created_at)
      return pd.getMonth() === d.getMonth() && pd.getFullYear() === d.getFullYear()
    })
    return {
      month: labels[d.getMonth()],
      published: monthPosts.filter(p => p.status === 'published').length,
      draft: monthPosts.filter(p => p.status === 'draft').length,
    }
  })
}

export default async function DashboardPage() {
  const [{ data: posts }, { data: messages }] = await Promise.all([
    supabase.from('posts').select('*').order('created_at', { ascending: false }),
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
  ])

  const postList: Post[] = posts ?? []
  const messageList: ContactMessage[] = messages ?? []

  const stats = {
    total: postList.length,
    published: postList.filter(p => p.status === 'published').length,
    draft: postList.filter(p => p.status === 'draft').length,
    messages: messageList.length,
    unread: messageList.filter(m => m.status === 'new').length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">İKO Kozmetik yönetim paneline hoş geldiniz.</p>
      </div>
      <StatsCards stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <PostsChart data={calcMonthly(postList)} />
        </div>
        <div className="lg:col-span-1">
          <RecentMessages messages={messageList.slice(0, 5)} />
        </div>
      </div>
      <RecentPosts posts={postList.slice(0, 5)} />
    </div>
  )
}

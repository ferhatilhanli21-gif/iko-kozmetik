import { PostsTable } from '@/components/blog/posts-table'

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Blog Yazıları</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Tüm blog içeriklerini yönetin.
        </p>
      </div>
      <PostsTable />
    </div>
  )
}

import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { PostEditor } from '@/components/blog/post-editor'
import type { Post } from '@/lib/admin-data'

interface EditPostPageProps {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!post) {
    notFound()
  }

  return <PostEditor post={post as Post} />
}

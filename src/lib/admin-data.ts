// Supabase ile kullanılan tip tanımları — mock data yok

export type PostStatus = 'published' | 'draft'
export type MessageStatus = 'new' | 'read'

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  status: PostStatus
  category: string
  tags: string[]
  seo_score: number
  meta_title: string
  meta_description: string
  og_image: string
  focus_keyword: string
  featured_image: string
  publish_date: string
  created_at: string
  updated_at: string
  author: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string
  message: string
  status: MessageStatus
  created_at: string
}

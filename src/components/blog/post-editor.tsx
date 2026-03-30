'use client'

import { useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, X, Plus, Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SeoPanel } from './seo-panel'
import { supabase } from '@/lib/supabase'
import type { Post } from '@/lib/admin-data'
import { cn } from '@/lib/utils'

const CATEGORIES = ['Genel', 'Ürünler', 'Saç Bakımı', 'Sakal & Tıraş', 'Stil & Moda', 'Haberler']

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function CharCounter({ value, max }: { value: string; max: number }) {
  const len = value.length
  const isOver = len > max
  const isClose = len > max * 0.85
  return (
    <span
      className={cn(
        'text-xs',
        isOver ? 'text-destructive' : isClose ? 'text-amber-500' : 'text-muted-foreground',
      )}
    >
      {len}/{max}
    </span>
  )
}

interface PostEditorProps {
  post?: Post
}

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image ?? '')
  const [category, setCategory] = useState(post?.category ?? '')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>(post?.tags ?? [])
  const [status, setStatus] = useState<'draft' | 'published'>(post?.status ?? 'draft')
  const [publishDate, setPublishDate] = useState(post?.publish_date ?? '')
  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? '')
  const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? '')
  const [ogImage, setOgImage] = useState(post?.og_image ?? '')
  const [focusKeyword, setFocusKeyword] = useState(post?.focus_keyword ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadStatus('idle')
    setUploadError('')

    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}.${ext}`
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file, { upsert: true })

    if (error) {
      setUploadStatus('error')
      setUploadError(error.message.includes('Bucket') ? 'Supabase\'de "blog-images" bucket\'ı oluşturulmalı.' : error.message)
    } else if (data) {
      const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(data.path)
      setFeaturedImage(urlData.publicUrl)
      setUploadStatus('success')
      setTimeout(() => setUploadStatus('idle'), 3000)
    }

    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleTitleChange = useCallback(
    (val: string) => {
      setTitle(val)
      if (!post) {
        setSlug(slugify(val))
      }
    },
    [post],
  )

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault()
      const newTag = tagInput.trim().replace(/,$/, '')
      if (newTag && !tags.includes(newTag)) {
        setTags((prev) => [...prev, newTag])
      }
      setTagInput('')
    }
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  function handleSeoChange(field: string, value: string) {
    if (field === 'metaTitle') setMetaTitle(value)
    if (field === 'metaDescription') setMetaDescription(value)
    if (field === 'ogImage') setOgImage(value)
    if (field === 'focusKeyword') setFocusKeyword(value)
  }

  async function handleSave(publishNow?: boolean) {
    setSaving(true)
    const finalStatus = publishNow ? 'published' : status
    const payload = {
      title,
      slug,
      content,
      excerpt,
      featured_image: featuredImage,
      category,
      tags,
      status: finalStatus,
      publish_date: publishDate || null,
      meta_title: metaTitle,
      meta_description: metaDescription,
      og_image: ogImage,
      focus_keyword: focusKeyword,
      author: post?.author ?? 'İKO Kozmetik',
      updated_at: new Date().toISOString(),
    }

    if (post?.id) {
      await supabase.from('posts').update(payload).eq('id', post.id)
    } else {
      const { data } = await supabase
        .from('posts')
        .insert({ ...payload, seo_score: 0 })
        .select()
        .single()
      if (data) {
        setSaving(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
        router.push(`/admin/blog/${data.id}/edit`)
        return
      }
    }

    if (publishNow) setStatus('published')
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <Link href="/admin/blog">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {post ? 'Yazıyı Düzenle' : 'Yeni Yazı'}
            </h1>
            <p className="text-xs text-muted-foreground">{post ? `Düzenleniyor: ${post.title}` : 'Yeni bir blog yazısı oluştur'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Kaydedildi!</span>
          )}
          <Button variant="outline" size="sm" className="h-8 gap-1.5" disabled={saving} onClick={() => handleSave()}>
            <Save className="h-3.5 w-3.5" />
            Taslak Kaydet
          </Button>
          <Button size="sm" className="h-8 gap-1.5" disabled={saving} onClick={() => handleSave(true)}>
            <Eye className="h-3.5 w-3.5" />
            Yayınla
          </Button>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
        {/* Main editor */}
        <div className="space-y-5">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-sm font-medium">
              Başlık
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Yazı başlığını girin..."
              className="text-base font-medium h-10"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <Label htmlFor="slug" className="text-sm font-medium">
              URL (Slug)
            </Label>
            <div className="flex items-center rounded-md border border-input bg-background overflow-hidden">
              <span className="px-3 py-2 text-sm text-muted-foreground bg-muted border-r border-input">
                example.com/
              </span>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="post-slug"
                className="border-0 rounded-none focus-visible:ring-0 text-sm"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <Label htmlFor="content" className="text-sm font-medium">
              İçerik
            </Label>
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-muted/50">
                <span className="text-xs text-muted-foreground">Markdown / Zengin Metin</span>
                <Badge variant="secondary" className="ml-auto text-xs h-5">
                  Editör
                </Badge>
              </div>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Yazı içeriğini buraya yazın... Markdown formatını destekler."
                className="min-h-[340px] text-sm leading-relaxed resize-none border-0 rounded-none focus-visible:ring-0 font-mono"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="excerpt" className="text-sm font-medium">
                Özet / Meta Açıklama
              </Label>
              <CharCounter value={excerpt} max={160} />
            </div>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Yazının kısa açıklaması (max 160 karakter)"
              className="text-sm resize-none"
              rows={3}
            />
          </div>

          {/* Featured Image */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Kapak Görseli</Label>

            {featuredImage ? (
              <div className="relative rounded-lg overflow-hidden border border-border aspect-video max-h-56 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredImage}
                  alt="Kapak görseli"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="h-8 gap-1.5"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-3.5 w-3.5" />
                    Değiştir
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="h-8 gap-1.5"
                    onClick={() => setFeaturedImage('')}
                  >
                    <X className="h-3.5 w-3.5" />
                    Kaldır
                  </Button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => !uploading && fileInputRef.current?.click()}
                className={cn(
                  'flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border bg-muted/30 aspect-video max-h-56 transition-colors',
                  uploading ? 'cursor-default' : 'cursor-pointer hover:border-primary/50 hover:bg-muted/50',
                )}
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-7 w-7 text-muted-foreground animate-spin" />
                    <p className="text-sm text-muted-foreground">Yükleniyor...</p>
                  </>
                ) : (
                  <>
                    <div className="p-3 rounded-full bg-background border border-border">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Fotoğraf yükle</p>
                      <p className="text-xs text-muted-foreground mt-0.5">PNG, JPG, WEBP — maks. 5 MB</p>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* URL input as alternative */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">veya URL gir</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <Input
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="text-sm h-9"
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {uploadStatus === 'success' && (
              <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-lg px-3 py-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                Fotoğraf başarıyla yüklendi!
              </div>
            )}
            {uploadStatus === 'error' && (
              <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{uploadError || 'Yükleme başarısız. Tekrar deneyin.'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish settings */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Yayın Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="status" className="text-sm">
                  Durum
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {status === 'published' ? 'Yayında' : 'Taslak'}
                  </span>
                  <Switch
                    id="status"
                    checked={status === 'published'}
                    onCheckedChange={(checked) => setStatus(checked ? 'published' : 'draft')}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="publishDate" className="text-xs font-medium text-muted-foreground">
                  Yayın Tarihi
                </Label>
                <Input
                  id="publishDate"
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="h-8 text-sm"
                />
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 text-xs"
                  disabled={saving}
                  onClick={() => handleSave()}
                >
                  <Save className="h-3.5 w-3.5 mr-1.5" />
                  Taslak Kaydet
                </Button>
                <Button size="sm" className="flex-1 h-8 text-xs" disabled={saving} onClick={() => handleSave(true)}>
                  <Eye className="h-3.5 w-3.5 mr-1.5" />
                  Yayınla
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Category */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Kategori</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Kategori seçin..." />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-sm">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Etiketler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs gap-1 pr-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="relative">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  placeholder="Etiket ekle, Enter'a bas..."
                  className="h-8 text-sm pr-8"
                />
                <Plus className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* SEO Panel */}
          <SeoPanel
            metaTitle={metaTitle}
            metaDescription={metaDescription}
            ogImage={ogImage}
            focusKeyword={focusKeyword}
            slug={slug}
            onChange={handleSeoChange}
          />
        </div>
      </div>
    </div>
  )
}

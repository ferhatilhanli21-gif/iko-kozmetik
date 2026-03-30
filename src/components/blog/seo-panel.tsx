'use client'

import { Globe, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SeoPanelProps {
  metaTitle: string
  metaDescription: string
  ogImage: string
  focusKeyword: string
  slug: string
  onChange: (field: string, value: string) => void
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

function SeoPreview({
  title,
  description,
  slug,
}: {
  title: string
  description: string
  slug: string
}) {
  const displayTitle = title || 'Page Title'
  const displayDesc = description || 'Page description will appear here in search results...'
  const displayUrl = `example.com/${slug || 'page-slug'}`

  return (
    <div className="rounded-lg border border-border bg-background p-4 space-y-1">
      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
        <Globe className="h-3 w-3" />
        {displayUrl}
      </p>
      <p className="text-sm text-primary font-medium line-clamp-1 hover:underline cursor-default">
        {displayTitle}
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{displayDesc}</p>
    </div>
  )
}

export function SeoPanel({ metaTitle, metaDescription, ogImage, focusKeyword, slug, onChange }: SeoPanelProps) {
  const [open, setOpen] = useState(true)

  return (
    <Card className="border border-border">
      <CardHeader className="pb-0">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center justify-between w-full"
        >
          <CardTitle className="text-sm font-semibold">SEO Ayarları</CardTitle>
          {open ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </CardHeader>

      {open && (
        <CardContent className="pt-4 space-y-4">
          {/* Google Preview */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
              Arama Önizlemesi
            </p>
            <SeoPreview title={metaTitle} description={metaDescription} slug={slug} />
          </div>

          <Separator />

          {/* Focus Keyword */}
          <div className="space-y-1.5">
            <Label htmlFor="focusKeyword" className="text-xs font-medium">
              Odak Anahtar Kelime
            </Label>
            <Input
              id="focusKeyword"
              value={focusKeyword}
              onChange={(e) => onChange('focusKeyword', e.target.value)}
              placeholder="örn. Morgan's Pomade"
              className="h-8 text-sm"
            />
          </div>

          {/* Meta Title */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="metaTitle" className="text-xs font-medium">
                Meta Başlık
              </Label>
              <CharCounter value={metaTitle} max={60} />
            </div>
            <Input
              id="metaTitle"
              value={metaTitle}
              onChange={(e) => onChange('metaTitle', e.target.value)}
              placeholder="Meta başlık (max 60 karakter)"
              className="h-8 text-sm"
            />
          </div>

          {/* Meta Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="metaDescription" className="text-xs font-medium">
                Meta Açıklama
              </Label>
              <CharCounter value={metaDescription} max={160} />
            </div>
            <Textarea
              id="metaDescription"
              value={metaDescription}
              onChange={(e) => onChange('metaDescription', e.target.value)}
              placeholder="Meta açıklama (max 160 karakter)"
              className="text-sm resize-none"
              rows={3}
            />
          </div>

          {/* OG Image */}
          <div className="space-y-1.5">
            <Label htmlFor="ogImage" className="text-xs font-medium">
              OG Image URL
            </Label>
            <Input
              id="ogImage"
              value={ogImage}
              onChange={(e) => onChange('ogImage', e.target.value)}
              placeholder="https://example.com/og-image.jpg"
              className="h-8 text-sm"
            />
            {ogImage && (
              <div className="rounded-md overflow-hidden border border-border aspect-video">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ogImage} alt="OG preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Search, Plus, Pencil, Trash2, MoreHorizontal } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { supabase } from '@/lib/supabase'
import type { Post, PostStatus } from '@/lib/admin-data'
import { cn } from '@/lib/utils'

const ITEMS_PER_PAGE = 6

function SeoScore({ score }: { score: number }) {
  const color =
    score >= 90
      ? 'bg-emerald-500'
      : score >= 70
        ? 'bg-amber-500'
        : 'bg-rose-500'
  const label = score >= 90 ? 'Mükemmel' : score >= 70 ? 'İyi' : 'Geliştirilebilir'

  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2 h-2 rounded-full ${color} flex-shrink-0`} />
      <span className="text-sm text-muted-foreground">{score}</span>
      <span className="text-xs text-muted-foreground hidden lg:inline">({label})</span>
    </div>
  )
}

export function PostsTable() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | PostStatus>('all')
  const [page, setPage] = useState(1)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setPosts(data as Post[])
      setLoading(false)
    }
    fetchPosts()
  }, [])

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.author.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [posts, search, statusFilter])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  async function handleDelete(id: string) {
    await supabase.from('posts').delete().eq('id', id)
    setPosts((prev) => prev.filter((p) => p.id !== id))
    setDeleteId(null)
  }

  async function handleStatusChange(id: string, status: PostStatus) {
    await supabase.from('posts').update({ status }).eq('id', id)
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))
  }

  const counts = {
    all: posts.length,
    published: posts.filter((p) => p.status === 'published').length,
    draft: posts.filter((p) => p.status === 'draft').length,
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <Tabs
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v as 'all' | PostStatus)
            setPage(1)
          }}
        >
          <TabsList className="h-8">
            <TabsTrigger value="all" className="text-xs px-3">
              Tümü <span className="ml-1.5 text-muted-foreground">{counts.all}</span>
            </TabsTrigger>
            <TabsTrigger value="published" className="text-xs px-3">
              Yayında <span className="ml-1.5 text-muted-foreground">{counts.published}</span>
            </TabsTrigger>
            <TabsTrigger value="draft" className="text-xs px-3">
              Taslak <span className="ml-1.5 text-muted-foreground">{counts.draft}</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Yazı ara..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="pl-8 h-8 text-sm"
            />
          </div>
          <Button size="sm" className="h-8 gap-1.5" asChild>
            <Link href="/admin/blog/new">
              <Plus className="h-3.5 w-3.5" />
              Yeni Yazı
            </Link>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-medium text-xs uppercase tracking-wide">Başlık</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wide hidden md:table-cell">
                Kategori
              </TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wide">Durum</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wide hidden lg:table-cell">
                SEO Skoru
              </TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wide hidden sm:table-cell">
                Tarih
              </TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground text-sm">
                  Yükleniyor...
                </TableCell>
              </TableRow>
            ) : paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground text-sm">
                  Yazı bulunamadı.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((post) => (
                <TableRow key={post.id} className="group">
                  <TableCell className="py-3">
                    <div className="space-y-0.5">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-1"
                      >
                        {post.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">{post.author}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{post.category}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(
                        'text-xs border-0',
                        post.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                          : 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
                      )}
                    >
                      {post.status === 'published' ? 'Yayında' : 'Taslak'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <SeoScore score={post.seo_score} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-sm text-muted-foreground">
                      {post.publish_date
                        ? format(new Date(post.publish_date), 'MMM d, yyyy')
                        : format(new Date(post.updated_at), 'MMM d, yyyy')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/blog/${post.id}/edit`}>
                            <Pencil className="h-3.5 w-3.5 mr-2" />
                            Düzenle
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(
                              post.id,
                              post.status === 'published' ? 'draft' : 'published',
                            )
                          }
                        >
                          {post.status === 'published' ? 'Taslağa Al' : 'Yayınla'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteId(post.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-2" />
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} / {filtered.length} yazı
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Önceki
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === page ? 'default' : 'outline'}
                size="sm"
                className="h-7 w-7 text-xs p-0"
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Sonraki
            </Button>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yazıyı sil?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem geri alınamaz. Yazı kalıcı olarak silinecektir.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={() => deleteId && handleDelete(deleteId)}
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

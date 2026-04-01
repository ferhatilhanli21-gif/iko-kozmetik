'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search, Mail, MailOpen, Trash2, MoreHorizontal, Phone, User, AtSign, Clock, CheckCircle2 } from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'
import { tr } from 'date-fns/locale'
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { supabase } from '@/lib/supabase'
import type { ContactMessage, MessageStatus } from '@/lib/admin-data'
import { cn } from '@/lib/utils'

export function MessagesTable() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | MessageStatus>('all')
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMessages() {
      const { data } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setMessages(data as ContactMessage[])
      setLoading(false)
    }
    fetchMessages()
  }, [])

  const filtered = useMemo(() => {
    return messages.filter((m) => {
      const q = search.toLowerCase()
      const matchesSearch =
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      const matchesStatus = statusFilter === 'all' || m.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [messages, search, statusFilter])

  async function markAsRead(id: string) {
    await supabase.from('contact_messages').update({ status: 'read' }).eq('id', id)
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: 'read' as MessageStatus } : m)))
    setSelectedMessage((prev) => prev?.id === id ? { ...prev, status: 'read' } : prev)
  }

  async function markAsUnread(id: string) {
    await supabase.from('contact_messages').update({ status: 'new' }).eq('id', id)
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: 'new' as MessageStatus } : m)))
    setSelectedMessage((prev) => prev?.id === id ? { ...prev, status: 'new' } : prev)
  }

  async function handleDelete(id: string) {
    await supabase.from('contact_messages').delete().eq('id', id)
    setMessages((prev) => prev.filter((m) => m.id !== id))
    setDeleteId(null)
    if (selectedMessage?.id === id) setSelectedMessage(null)
  }

  function openMessage(msg: ContactMessage) {
    setSelectedMessage(msg)
    if (msg.status === 'new') {
      markAsRead(msg.id)
    }
  }

  const counts = {
    all: messages.length,
    new: messages.filter((m) => m.status === 'new').length,
    read: messages.filter((m) => m.status === 'read').length,
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <Tabs
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as 'all' | MessageStatus)}
        >
          <TabsList className="h-8">
            <TabsTrigger value="all" className="text-xs px-3">
              Tümü <span className="ml-1.5 text-muted-foreground">{counts.all}</span>
            </TabsTrigger>
            <TabsTrigger value="new" className="text-xs px-3">
              Yeni{' '}
              {counts.new > 0 && (
                <Badge className="ml-1.5 h-4 px-1 text-xs bg-primary text-primary-foreground">
                  {counts.new}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="read" className="text-xs px-3">
              Okundu <span className="ml-1.5 text-muted-foreground">{counts.read}</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-56">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Mesaj ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-medium text-xs uppercase tracking-wide">Ad Soyad</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wide hidden md:table-cell">
                E-posta
              </TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wide hidden lg:table-cell">
                Telefon
              </TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wide">Mesaj</TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wide hidden sm:table-cell">
                Tarih
              </TableHead>
              <TableHead className="font-medium text-xs uppercase tracking-wide">Durum</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground text-sm">
                  Yükleniyor...
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground text-sm">
                  Mesaj bulunamadı.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((msg) => (
                <TableRow
                  key={msg.id}
                  className={cn(
                    'group cursor-pointer',
                    msg.status === 'new' && 'bg-primary/[0.02]',
                  )}
                  onClick={() => openMessage(msg)}
                >
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      {msg.status === 'new' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      )}
                      <span
                        className={cn(
                          'text-sm',
                          msg.status === 'new' ? 'font-semibold text-foreground' : 'text-foreground',
                        )}
                      >
                        {msg.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{msg.email}</span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-sm text-muted-foreground">{msg.phone || '—'}</span>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground line-clamp-1 max-w-xs">{msg.message}</p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true, locale: tr })}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(
                        'text-xs border-0',
                        msg.status === 'new'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {msg.status === 'new' ? 'Yeni' : 'Okundu'}
                    </Badge>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {msg.status === 'new' ? (
                          <DropdownMenuItem onClick={() => markAsRead(msg.id)}>
                            <MailOpen className="h-3.5 w-3.5 mr-2" />
                            Okundu işaretle
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => markAsUnread(msg.id)}>
                            <Mail className="h-3.5 w-3.5 mr-2" />
                            Okunmadı işaretle
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteId(msg.id)}
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

      {/* Message detail sheet */}
      <Sheet open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto p-0">
          {selectedMessage && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="px-6 pt-6 pb-5 border-b border-border bg-muted/30">
                <SheetHeader className="mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <SheetTitle className="text-base font-semibold leading-tight">{selectedMessage.name}</SheetTitle>
                      <a href={`mailto:${selectedMessage.email}`} className="text-xs text-primary hover:underline">
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>
                </SheetHeader>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <AtSign className="h-3 w-3 flex-shrink-0" />
                    <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline truncate">
                      {selectedMessage.email}
                    </a>
                  </div>
                  {selectedMessage.phone && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3 flex-shrink-0" />
                      {selectedMessage.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 flex-shrink-0" />
                    {format(new Date(selectedMessage.created_at), 'd MMM yyyy, HH:mm')}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3 w-3 flex-shrink-0" />
                    Okundu
                  </div>
                </div>
              </div>

              {/* Message body */}
              <div className="flex-1 px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Mesaj</p>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border bg-muted/20 flex items-center gap-2">
                <Button className="flex-1 gap-2" asChild>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(selectedMessage.email)}&su=Re%3A%20İletişim%20Formu`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Mail className="h-4 w-4" />
                    Gmail ile Yanıtla
                  </a>
                </Button>
                {selectedMessage.status === 'read' && (
                  <Button variant="outline" size="icon" className="h-10 w-10 flex-shrink-0" onClick={() => markAsUnread(selectedMessage.id)}>
                    <MailOpen className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 flex-shrink-0 text-destructive hover:text-destructive border-destructive/30 hover:border-destructive"
                  onClick={() => setDeleteId(selectedMessage.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mesajı sil?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu mesaj kalıcı olarak silinecek ve geri alınamaz.
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

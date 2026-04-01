'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, Phone, Clock, User, CheckCircle2, AtSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { supabase } from '@/lib/supabase'
import type { ContactMessage } from '@/lib/admin-data'
import { formatDistanceToNow, format } from 'date-fns'
import { tr } from 'date-fns/locale'

export function RecentMessages({ messages: initialMessages }: { messages: ContactMessage[] }) {
  const [messages, setMessages] = useState(initialMessages)
  const [selected, setSelected] = useState<ContactMessage | null>(null)

  async function openMessage(msg: ContactMessage) {
    setSelected(msg)
    if (msg.status === 'new') {
      await supabase.from('contact_messages').update({ status: 'read' }).eq('id', msg.id)
      setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, status: 'read' } : m))
    }
  }

  return (
    <>
      <Card className="border border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold">Son Mesajlar</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs h-7 gap-1" asChild>
            <Link href="/admin/messages">
              Tümünü gör
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {messages.length === 0 ? (
              <p className="px-6 py-8 text-sm text-muted-foreground text-center">Henüz mesaj yok.</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => openMessage(msg)}
                  className="flex items-start justify-between gap-3 px-6 py-3 hover:bg-muted/40 transition-colors cursor-pointer"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{msg.name}</span>
                      {msg.status === 'new' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{msg.email}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{msg.message}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <Badge
                      variant={msg.status === 'new' ? 'default' : 'secondary'}
                      className={
                        msg.status === 'new'
                          ? 'bg-primary/15 text-primary border-0 text-xs'
                          : 'text-xs border-0'
                      }
                    >
                      {msg.status === 'new' ? 'Yeni' : 'Okundu'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true, locale: tr })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto p-0">
          {selected && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="px-6 pt-6 pb-5 border-b border-border bg-muted/30">
                <SheetHeader className="mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <SheetTitle className="text-base font-semibold leading-tight">{selected.name}</SheetTitle>
                      <a href={`mailto:${selected.email}`} className="text-xs text-primary hover:underline">
                        {selected.email}
                      </a>
                    </div>
                  </div>
                </SheetHeader>

                <div className="flex flex-col gap-2 mt-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <AtSign className="h-3 w-3 flex-shrink-0" />
                    <a href={`mailto:${selected.email}`} className="text-primary hover:underline truncate">
                      {selected.email}
                    </a>
                  </div>
                  {selected.phone && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3 flex-shrink-0" />
                      {selected.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 flex-shrink-0" />
                    {format(new Date(selected.created_at), 'd MMM yyyy, HH:mm')}
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
                  {selected.message}
                </p>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border bg-muted/20">
                <Button className="w-full gap-2" asChild>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(selected.email)}&su=Re%3A%20İletişim%20Formu`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Mail className="h-4 w-4" />
                    Gmail ile Yanıtla
                  </a>
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}

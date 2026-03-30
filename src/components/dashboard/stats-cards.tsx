import { FileText, CheckCircle, Clock, MessageSquare } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface Stats {
  total: number
  published: number
  draft: number
  messages: number
  unread: number
}

export function StatsCards({ stats }: { stats: Stats }) {
  const items = [
    { label: 'Toplam Yazı', value: stats.total, icon: FileText, description: 'Tüm blog yazıları', color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Yayında', value: stats.published, icon: CheckCircle, description: 'Sitede yayınlananlar', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Taslak', value: stats.draft, icon: Clock, description: 'Hazırlanıyor', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Mesajlar', value: stats.messages, icon: MessageSquare, description: `${stats.unread} okunmamış`, color: 'text-primary', bg: 'bg-primary/10' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {items.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="border border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
                <div className={`p-2.5 rounded-lg ${stat.bg} flex-shrink-0`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

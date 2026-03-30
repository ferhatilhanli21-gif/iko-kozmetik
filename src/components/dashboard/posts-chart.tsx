'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
interface ChartEntry {
  month: string
  published: number
  draft: number
}

export function PostsChart({ data }: { data: ChartEntry[] }) {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Yayın Aktivitesi</CardTitle>
        <CardDescription>Son 6 ayda yayınlanan yazılar ve taslaklar</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} barSize={10} barGap={3}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
              width={20}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                fontSize: '12px',
                color: 'var(--color-foreground)',
              }}
              cursor={{ fill: 'var(--color-muted)', opacity: 0.4 }}
            />
            <Bar dataKey="published" name="Yayında" fill="var(--color-chart-1)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="draft" name="Taslak" fill="var(--color-muted)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
            <span className="text-xs text-muted-foreground">Yayında</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-muted-foreground/30" />
            <span className="text-xs text-muted-foreground">Taslak</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

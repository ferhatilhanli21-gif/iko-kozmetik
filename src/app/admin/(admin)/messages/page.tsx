import { MessagesTable } from '@/components/messages/messages-table'

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">İletişim Mesajları</h1>
        <p className="text-sm text-muted-foreground mt-1">
          İletişim formundan gelen mesajları yönetin.
        </p>
      </div>
      <MessagesTable />
    </div>
  )
}

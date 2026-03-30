'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/messages', label: 'Mesajlar', icon: MessageSquare },
  { href: '/admin/settings', label: 'Ayarlar', icon: Settings },
]

interface SidebarProps {
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
  onClose?: () => void
  isMobile?: boolean
}

export function Sidebar({ collapsed, onCollapse, onClose, isMobile }: SidebarProps) {
  const pathname = usePathname()
  const isExpanded = !collapsed || isMobile

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-200',
        isExpanded ? 'w-60' : 'w-[60px]',
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          'flex items-center h-14 border-b border-sidebar-border px-3 gap-2 flex-shrink-0',
          isExpanded ? 'justify-between' : 'justify-center',
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center flex-shrink-0 overflow-hidden border border-border">
            <Image src="/images/logo2.png" alt="İKO Logo" width={28} height={28} className="object-contain" />
          </div>
          {isExpanded && (
            <span className="font-semibold text-sidebar-foreground text-sm truncate">İKO Admin</span>
          )}
        </div>
        {isMobile ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-sidebar-foreground hover:bg-sidebar-accent flex-shrink-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        ) : isExpanded ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-sidebar-foreground hover:bg-sidebar-accent flex-shrink-0"
            onClick={() => onCollapse(true)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        ) : null}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin/dashboard' && pathname.startsWith(item.href + '/')) ||
            (item.href === '/admin/blog' && pathname === '/admin/blog')
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={isMobile ? onClose : undefined}
              title={!isExpanded ? item.label : undefined}
              className={cn(
                'flex items-center gap-3 px-2.5 py-2 rounded-md text-sm transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                !isExpanded && 'justify-center',
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {isExpanded && (
                <span className="flex-1 truncate">{item.label}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Expand button when collapsed (desktop only) */}
      {!isExpanded && (
        <div className="p-2 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size="icon"
            className="w-full h-8 text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => onCollapse(false)}
            title="Expand sidebar"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Footer */}
      {isExpanded && (
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-2 px-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary flex-shrink-0">
              IK
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-sidebar-foreground truncate">İKO Kozmetik</p>
              <p className="text-xs text-muted-foreground truncate">admin@ikokozmetik.com.tr</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

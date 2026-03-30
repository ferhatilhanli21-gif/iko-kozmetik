'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, Sun, Moon, ChevronRight } from 'lucide-react'
import { useTheme } from '@/lib/theme'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'

interface BreadcrumbSegment {
  label: string
  href?: string
}

function getBreadcrumbs(pathname: string): BreadcrumbSegment[] {
  const segments = pathname.split('/').filter(Boolean)

  const labelMap: Record<string, string> = {
    admin: 'Admin',
    dashboard: 'Dashboard',
    blog: 'Blog',
    messages: 'Mesajlar',
    settings: 'Ayarlar',
    new: 'Yeni Yazı',
    edit: 'Düzenle',
  }

  const crumbs: BreadcrumbSegment[] = []
  segments.forEach((seg, i) => {
    const isLast = i === segments.length - 1
    const href = '/' + segments.slice(0, i + 1).join('/')
    const label = labelMap[seg] ?? seg
    crumbs.push({ label, href: isLast ? undefined : href })
  })

  return crumbs
}

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggle } = useTheme()
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)

  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-4 md:px-6 bg-background flex-shrink-0 gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <Button variant="ghost" size="icon" className="md:hidden h-8 w-8 flex-shrink-0" onClick={onMenuClick}>
          <Menu className="h-4 w-4" />
        </Button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm min-w-0">
          {breadcrumbs.map((crumb, i) => (
            <div key={i} className="flex items-center gap-1 min-w-0">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />}
              {crumb.href ? (
                <Link href={crumb.href} className="text-muted-foreground hover:text-foreground transition-colors truncate">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium truncate">{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggle}>
          {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>

        <Separator orientation="vertical" className="h-5 mx-1" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 gap-2 px-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">IK</AvatarFallback>
              </Avatar>
              <span className="text-sm hidden sm:inline-block">İKO Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <div>
                <p className="font-medium">İKO Kozmetik</p>
                <p className="text-xs text-muted-foreground font-normal">admin@ikokozmetik.com.tr</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">Siteye Git</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

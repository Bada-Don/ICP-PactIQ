import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

interface SiteHeaderProps {
  title?: string;
}

export function SiteHeader({ title = "Contract Analysis" }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg transition-all duration-300 bg-background/80 shadow-sm border-b">
      <div className="flex h-16 items-center justify-between container">
        <div className="flex items-center gap-2 font-bold">
          <a href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg group transition">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground group-hover:brightness-110 transition">
              {/* Inline SVG or 'P' for logo */}
              P
            </div>
            <span className="text-lg font-bold tracking-tight group-hover:underline">PactIQ</span>
          </a>
          <Separator orientation="vertical" className="mx-2 h-6" />
          <span className="text-base font-medium text-muted-foreground">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
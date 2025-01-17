/****************************************************************************
 *  @Copyright 2025 Tongfu.E.
 *  @Author [etongfu@outlook.com].
 *  @Date [2025-01-16 10:52:49].
 ***************************************************************************/
'use client'

import { AppSidebar } from '@/app/components/layout/app-sidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/app/components/layout/parts/sidebar'
import type React from 'react'

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="pt-[var(--size-titlebar)] w-full h-full">
      <div className="pt-1 w-full h-full">
        <div className="w-full h-full relative bg-background rounded-md overflow-auto">
          <SidebarProvider className="pt-2 pr-2 pb-2">
            <AppSidebar variant="inset" />
            <SidebarInset>
              <header className="flex h-12 shrink-0 items-center transition-[width,height] ease-linear">
                <div className="flex items-center px-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Manage Your Commands</BreadcrumbLink>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              <div className="px-2 flex-1 min-h-0">
                {children}                
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </div>
    </div>
  )
}

export default SidebarLayout
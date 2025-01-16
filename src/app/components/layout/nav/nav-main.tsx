'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/app/components/layout/parts/sidebar'
import type React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link'

type MenuItemType = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

type MenuChildItemProps = {
  item: MenuItemType;
  children?: React.ReactNode
}

const MenuChildItem = ({ item, children }: MenuChildItemProps) => {

  return (
    <SidebarMenuItem>
      <Link href={item.url}>
        <SidebarMenuButton tooltip={item.title} isActive={item.isActive}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          {children}
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  )
}

;<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />

const MenuChildrenItem = ({ item }: MenuChildItemProps) => {

  return (
    <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title} isActive={item.isActive}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </SidebarMenuButton>

          <MenuChildItem item={item}>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </MenuChildItem>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map(subItem => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <a href={subItem.url}>
                    <span>{subItem.title}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

export default function NavMain({
  items, 
  activeURL
}: {
  items: MenuItemType[]
  activeURL?: string
}) {
  
  const pathname = usePathname()

  const processedItems = items.map(item => ({
    ...item,
    isActive: item.url === pathname
  }))
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {processedItems.map((item) => (
          (item?.items || []).length > 0 ? <MenuChildrenItem key={item.title} item={item} /> : <MenuChildItem key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

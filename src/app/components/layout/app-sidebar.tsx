'use client'

import type * as React from 'react'
import { BlendIcon, BookOpen, Settings2, SquareTerminalIcon } from 'lucide-react'

import NavMain from '@/app/components/layout/nav/nav-main'
import { TeamSwitcher } from '@/app/components/layout/nav/team-switcher'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/app/components/layout/parts/sidebar'
import Logo  from '@/app/assets/logo.png'
import Image from 'next/image'
import { VersionFooter } from '@/app/components/version-footer'
// This is sample data.
const data = {
  teams: [
    {
      name: 'Hits App',
      logo:  () => <Image src={Logo} alt="Logo" width={32} height={32} />,
      plan: 'Hit your goals'
    },
  ],
  navMain: [
    {
      title: 'About',
      url: '#',
      icon: BookOpen,
    },
    {
      title: 'Models',
      url: '#',
      icon: BlendIcon,
    },
    {
      title: 'Commands',
      url: '/commands',
      icon: SquareTerminalIcon,
    },
    {
      title: 'Settings',
      url: '/setting',
      icon: Settings2
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        <VersionFooter />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

/****************************************************************************
 *  @Copyright 2025 Tongfu.E.
 *  @Author [etongfu@outlook.com].
 *  @Date [2025-01-16 11:08:57].
 ***************************************************************************/
import SidebarLayout from "@/app/components/layout/sidebar-layout"

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SidebarLayout>
    {children}
  </SidebarLayout>
}
import type { Metadata } from 'next'
import clsx from 'clsx'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'hits',
  description: 'The hits app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className)}>{children}</body>
    </html>
  )
}

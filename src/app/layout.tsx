import type { Metadata } from 'next'
import clsx from 'clsx'
import { Inter } from 'next/font/google'
import './globals.css'
import { Titlebar } from './components/titlebar'

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
      <body className={clsx(inter.className)}>
        <main className="min-h-screen flex flex-col bg-transparent rounded-md text-sm">
          <Titlebar />
          {children}
        </main>
      </body>
    </html>
  )
}

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
        <main className="min-h-screen bg-transparent rounded-md text-sm">
          <Titlebar />

          <div className="w-full pt-1 flex justify-center">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

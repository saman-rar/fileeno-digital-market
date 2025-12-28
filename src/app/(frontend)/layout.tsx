import { Metadata } from 'next'
import React from 'react'
import { Vazirmatn } from 'next/font/google'
import './styles.css'
import { cn } from '@/lib/utils'
import Navbar from '@/components/navigation/Navbar'

const vazir = Vazirmatn({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-vazir',
})

export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="fa" dir="rtl" className={cn('h-full', vazir.className)}>
      <body className={cn('relative h-full font-vazir antialiased bg-background text-foreground')}>
        <main className="relative flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
        </main>
      </body>
    </html>
  )
}

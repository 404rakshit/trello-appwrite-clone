import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Header from './Header'

const inter = Poppins({ subsets: ['latin'], weight: ['300','400','700'], display: "swap" })

export const metadata: Metadata = {
  title: 'Trello Clone',
  description: 'Generated by Tuitorial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-whiteGray`}>
        <Header />
        {children}
      </body>
    </html>
  )
}

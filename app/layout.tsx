import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { AuthProvider, CartProvider } from '@/lib/store-context'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif"
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: 'MAISON ÉLÉGANCE | Luxury Handbags & Accessories',
  description: 'Discover exquisite handcrafted luxury bags. Each piece is a work of art, meticulously crafted for the discerning collector.',
  keywords: ['luxury bags', 'designer handbags', 'premium leather', 'haute couture', 'fashion accessories'],
  openGraph: {
    title: 'MAISON ÉLÉGANCE | Luxury Handbags & Accessories',
    description: 'Discover exquisite handcrafted luxury bags',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-serif antialiased">
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster position="bottom-right" richColors />
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}

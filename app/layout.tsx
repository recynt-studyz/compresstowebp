import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Compress to WebP — Free Image Converter & Compressor, No Upload Required',
  description:
    'Convert JPG, PNG and GIF images to WebP format instantly in your browser. Compress to an exact file size. No upload, no signup, completely free.',
  keywords: [
    'compress to webp',
    'jpg to webp',
    'png to webp',
    'convert to webp',
    'compress image to 100kb',
    'compress image for web',
    'webp converter',
    'image compressor',
    'compress image to specific size',
  ],
  metadataBase: new URL('https://compresstowebp.com'),
  openGraph: {
    title: 'Compress to WebP — Free Image Converter & Compressor',
    description:
      'Convert JPG, PNG and GIF images to WebP format instantly in your browser. No upload, no signup, completely free.',
    url: 'https://compresstowebp.com',
    siteName: 'CompressToWebP',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Compress to WebP — Free Image Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compress to WebP — Free Image Converter & Compressor',
    description:
      'Convert JPG, PNG and GIF to WebP instantly in your browser. No upload required.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'ubKhP4YE2risf5jrfykov0vws8nFmtfc0-IyKCYk5BI',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-8792838105001561" />
        <link
          rel="preload"
          as="image"
          href="/hero-bg.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8792838105001561"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}

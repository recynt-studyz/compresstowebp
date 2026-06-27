import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — CompressToWebP',
  description:
    'CompressToWebP is a free, browser-based tool for converting and compressing images to WebP format with no upload required.',
  alternates: {
    canonical: 'https://compresstowebp.com/about',
  },
}

export default function About() {
  return (
    <>
      <main className="max-w-2xl mx-auto px-4 py-14 flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About CompressToWebP</h1>
        <div className="space-y-5 text-gray-600 text-sm leading-relaxed">
          <p>
            CompressToWebP is a free, privacy-first image converter built for developers, designers,
            and anyone who cares about web performance. It converts JPG, PNG, GIF, and other common
            image formats to WebP — the modern format that loads faster and weighs less.
          </p>
          <p>
            Unlike most online converters, compresstowebp.com does all processing directly in your
            browser using the native Canvas API. Your files never leave your device. There&apos;s no
            server involved, no account required, and no cost.
          </p>
          <p>
            The &quot;Compress to Size&quot; mode is particularly useful when you have a specific KB
            target — for example, a CMS that rejects images over 200KB, or a platform with a strict
            avatar size limit. The tool uses binary search over WebP quality levels to find the
            highest quality that still fits under your target.
          </p>
          <p>
            The site is ad-supported to stay free. If you find it useful, sharing it with others is
            the best way to support continued development.
          </p>
          <p>
            <Link href="/" className="text-[#2563EB] hover:underline">
              ← Back to the converter
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

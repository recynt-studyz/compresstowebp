import type { Metadata } from 'next'
import AdBanner from '@/components/AdBanner'
import ConverterWrapper from '@/components/ConverterWrapper'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Compress to WebP — Free Image Converter & Compressor, No Upload Required',
  description:
    'Convert JPG, PNG and GIF images to WebP format instantly in your browser. Compress to an exact file size. No upload, no signup, completely free.',
  alternates: {
    canonical: 'https://compresstowebp.com',
  },
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Compress to WebP',
  url: 'https://compresstowebp.com',
  description: 'Free online image to WebP converter and compressor. No upload required.',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is WebP and why should I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WebP is a modern image format developed by Google. When you compress to WebP, files are typically 25–35% smaller than equivalent JPEG or PNG at the same visual quality — faster page loads and better Core Web Vitals. All modern browsers support WebP.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert JPG to WebP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Drag and drop your JPG files onto the upload zone, select "Convert to WebP" mode, and adjust the quality slider. This free JPG to WebP converter runs instantly in your browser — no upload required. PNG to WebP works the same way.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I compress an image to a specific file size like 100KB?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Switch to "Compress to Size" mode and type your target in the KB field (e.g. 100 to compress image to 100KB). This WebP image compressor uses binary search to find the highest quality that fits under your target — perfect for compressing images for web upload limits.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are my images uploaded to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. This is a fully client-side WebP converter. All processing happens in your browser using the Canvas API. Your images never leave your device.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will converting to WebP reduce image quality?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WebP uses lossy compression, so some quality reduction is expected. However, at quality 80–90 the difference is barely visible. The WebP codec is more efficient than JPEG — ideal for compressing images for web use.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does WebP work in all browsers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. WebP is supported in Chrome, Firefox, Safari (since v14), Edge, and all modern mobile browsers. Coverage exceeds 97% of global browser usage, so you can safely compress to WebP for any public website.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I convert multiple images at once?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! This bulk WebP converter accepts up to 50 files at once. All images are processed simultaneously. When 2 or more are done, a "Download All as ZIP" button appears.',
      },
    },
    {
      '@type': 'Question',
      name: 'What image formats are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This free WebP converter and image compressor accepts JPG, JPEG, PNG, GIF, WebP, and BMP files. All are converted to WebP output — no plugins required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much smaller will my WebP files be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When you compress images for web: JPG photos typically save 20–35% and PNG graphics save 30–60%. Use "Compress to Size" mode to hit a specific KB target like 100KB or 200KB.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is compresstowebp.com completely free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely free. No signup, no watermarks, no file size cap. This free WebP converter is ad-supported so it stays free for everyone.',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/15" />
        {/* Bottom fade to white */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />

        {/* Logo */}
        <span
          className="absolute top-5 left-5 z-20 font-mono font-semibold tracking-tight text-white text-lg sm:text-xl"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
        >
          compresstowebp
        </span>

        {/* Hero text */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 pt-14 pb-6 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 text-xs text-white mb-5 shadow-sm">
            <span>🔒</span>
            <span>Files never leave your browser</span>
          </div>

          {/* Frosted text card */}
          <div className="inline-block bg-black/20 backdrop-blur-sm rounded-2xl px-6 py-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Compress to <span className="text-blue-200">WebP</span>
              <br className="hidden sm:block" />
              <span className="text-3xl sm:text-4xl font-bold"> — Free Image Converter</span>
            </h1>
            <p className="mt-3 text-lg text-white/80 max-w-xl mx-auto">
              Convert JPG, PNG, and GIF to WebP — or compress to an exact KB target. Instant,
              free, and 100% in your browser.
            </p>
          </div>

          <div className="mt-5">
            <AdBanner slot="1234567890" />
          </div>
        </div>

        {/* Converter card */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 pb-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl px-6 pt-4 pb-6">
            <ConverterWrapper />
          </div>
        </div>
      </section>

      {/* Below converter */}
      <section className="bg-white">
        {/* Ad slot — needs room to render */}
        <div className="max-w-3xl mx-auto px-4 pt-10 pb-4 min-h-[120px]">
          <AdBanner slot="0987654321" />
        </div>

        {/* How it works */}
        <div className="max-w-3xl mx-auto px-4 pt-4 pb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How to Compress Images to WebP
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Drop your images',
                desc: 'Drag and drop JPG, PNG, GIF, or BMP files — or click to browse. No account needed, works in any modern browser.',
              },
              {
                step: '2',
                title: 'Convert or compress to size',
                desc: 'Use "Convert to WebP" for quality control, or switch to "Compress to Size" to hit an exact KB target like 100KB for web upload limits.',
              },
              {
                step: '3',
                title: 'Download as WebP',
                desc: 'Each file downloads individually, or grab everything at once with the "Download All as ZIP" button when multiple files are ready.',
              },
            ].map((s) => (
              <div
                key={s.step}
                className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-5 text-center shadow-sm"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#2563EB] text-white font-bold text-sm">
                  {s.step}
                </div>
                <p className="font-semibold text-gray-800 mb-1">{s.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust signals */}
        <div className="max-w-3xl mx-auto px-4 pt-2 pb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Free, Private &amp; Unlimited
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: '🔒', label: 'No Upload', sub: 'Stays on your device' },
              { icon: '⚡', label: 'Instant', sub: 'Browser-native speed' },
              { icon: '∞', label: 'Unlimited', sub: 'No file size cap' },
              { icon: '✓', label: 'Free', sub: 'No signup needed' },
            ].map((t) => (
              <div
                key={t.label}
                className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm"
              >
                <span className="text-2xl mb-1">{t.icon}</span>
                <span className="text-sm font-semibold text-gray-800">{t.label}</span>
                <span className="text-xs text-gray-400 mt-0.5">{t.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto px-4 pb-10">
          <FAQ />
        </div>

        {/* Ad below FAQ */}
        <div className="max-w-3xl mx-auto px-4 pb-6">
          <AdBanner slot="1122334455" />
        </div>
      </section>

      <Footer />
    </>
  )
}

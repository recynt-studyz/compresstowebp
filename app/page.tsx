import type { Metadata } from 'next'
import AdBanner from '@/components/AdBanner'
import ConverterWrapper from '@/components/ConverterWrapper'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Compress to WebP — Free Image Converter & Compressor, No Upload Required',
  description:
    'Convert JPG, PNG and GIF images to WebP format instantly in your browser. Compress to an exact file size. No upload, no signup, completely free.',
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
        text: 'WebP is a modern image format developed by Google that provides superior compression for web images. WebP files are typically 25–35% smaller than comparable JPEG and PNG files at the same visual quality, making your pages load faster.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert JPG to WebP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Drag and drop your JPG files onto the upload area, make sure "Convert to WebP" mode is selected, and adjust the quality slider if desired. The conversion happens instantly in your browser.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I compress an image to a specific file size like 100KB?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Switch to "Compress to Size" mode, upload your image, then type your target size in the KB field. The tool uses binary search on the WebP quality parameter to automatically find the right quality level.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are my images uploaded to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All processing happens 100% in your browser using the native Canvas API. Your images never leave your device.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will converting to WebP reduce image quality?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WebP uses lossy compression, so some quality reduction is possible. However, at quality 80–90 the difference is barely perceptible. WebP is generally more efficient than JPEG at the same visual quality level.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does WebP work in all browsers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. WebP is supported in Chrome, Firefox, Safari (since v14), Edge, and all modern mobile browsers. Coverage exceeds 97% of global browser usage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I convert multiple images at once?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Drag and drop up to 50 files at once. All images are processed simultaneously. When 2 or more files are done, a Download All as ZIP button appears.',
      },
    },
    {
      '@type': 'Question',
      name: 'What image formats are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CompressToWebP accepts JPG, JPEG, PNG, GIF, WebP, and BMP files. All are converted to WebP output.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much smaller will my WebP files be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In general: JPG photos save 20–35% and PNG graphics save 30–60%. The exact savings depend on image complexity and your quality setting.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is compresstowebp.com completely free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely free. No signup, no watermarks, no file size limits. The 50-file batch limit is a soft per-session limit. The site is supported by advertising.',
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
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />

      {/* Hero */}
      <section className="bg-[#F8FAFC] border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 pt-14 pb-12 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-gray-200 px-3 py-1 text-xs text-gray-500 mb-6 shadow-sm">
            <span>🔒</span>
            <span>Files never leave your browser</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Convert &amp; Compress Images<br className="hidden sm:block" /> to{' '}
            <span className="text-[#2563EB]">WebP</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Convert JPG, PNG, and GIF to WebP — or compress to an exact KB target. Instant,
            free, and 100% in your browser.
          </p>

          <div className="mt-6">
            <AdBanner slot="1234567890" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 pb-14">
          <ConverterWrapper />
        </div>
      </section>

      {/* Below converter */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 pt-8 pb-4">
          <AdBanner slot="0987654321" />
        </div>

        {/* Trust signals */}
        <div className="max-w-3xl mx-auto px-4 pb-12">
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

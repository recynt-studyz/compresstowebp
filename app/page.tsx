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
        <div className="absolute inset-0 hero-section" />
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
              Convert JPG to WebP, PNG to WebP, and GIF — or compress to an exact KB target.
              Instant, free, and no upload required.
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
                desc: 'Use "Convert to WebP" for quality control, or switch to "Compress to Size" to compress your image to a specific size — set an exact KB target like 100KB for web upload limits.',
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
              { icon: '🔒', label: 'No Upload', sub: 'No upload required' },
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

        {/* How It Works */}
        <div className="max-w-3xl mx-auto px-4 pt-2 pb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            How WebP Compression Works
          </h2>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              WebP was created by Google in 2010, derived from the VP8 video codec technology
              originally developed for streaming video. Unlike JPEG — a format designed in 1992 for
              the hardware constraints of that era — WebP uses modern prediction encoding: instead
              of storing every pixel value independently, it analyzes blocks of pixels and records
              only the <em>difference</em> from what a mathematical model predicts, then compresses
              those residuals far more efficiently. The result is smaller files at the same visual
              quality, or better visual quality at the same file size.
            </p>
            <p>
              The browser&apos;s Canvas API is what makes fully client-side conversion possible. When
              you drop an image onto this tool, JavaScript reads it into memory as a Blob, draws it
              onto a hidden <code className="bg-gray-100 px-1 rounded text-xs">&lt;canvas&gt;</code>{' '}
              element, then calls{' '}
              <code className="bg-gray-100 px-1 rounded text-xs">canvas.toBlob(&apos;image/webp&apos;, quality)</code>{' '}
              — a native browser method that invokes the WebP encoder built into Chrome, Firefox, or
              Safari. The encoded bytes come back to JavaScript as a downloadable file. No data
              crosses a network connection at any point.
            </p>
            <p>
              WebP outperforms JPEG through two techniques: <strong>block prediction</strong> (using
              surrounding pixel values to anticipate block content rather than storing raw data) and{' '}
              <strong>arithmetic entropy coding</strong> (a more efficient scheme than JPEG&apos;s
              Huffman coding). For PNG files, WebP&apos;s lossless mode similarly beats PNG&apos;s
              DEFLATE algorithm by around 26% on average, while preserving exact pixel values and
              full alpha-channel transparency.
            </p>
            <p>
              File size directly affects web performance in three measurable ways. Smaller images
              reduce initial page load time, which improves Google&apos;s Core Web Vitals — particularly
              the Largest Contentful Paint (LCP) score used in search ranking. They also lower
              bandwidth costs for site owners and their visitors, an effect that&apos;s especially
              pronounced for users on mobile data connections where every kilobyte counts.
            </p>
          </div>
        </div>

        {/* Worked Example */}
        <div className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            A Real-World Example
          </h2>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              Sarah is a food blogger who shoots her recipes with a mirrorless camera. Her typical
              JPEG exports from Lightroom run 4–6MB each, and a single recipe post averages six
              photos — meaning a reader on a standard 4G connection has to download 24–36MB before
              the page feels complete. Her average page load time was hovering around 8–10 seconds.
            </p>
            <p>
              After converting those images to WebP at 80% quality, the same photos compressed to
              400–600KB each. A 5MB JPEG became a 480KB WebP — a roughly 90% reduction with no
              perceptible difference on screen. Her recipe pages now load in under 2 seconds, and
              her Google Search Console LCP scores improved from &quot;Poor&quot; to &quot;Good&quot;
              within a few weeks of the switch.
            </p>
            <p className="font-medium text-gray-700">Quality settings by use case:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Food, travel, and lifestyle photography (80–85%):</strong> The practical
                sweet spot for photographic content. Subtle tonal gradients compress well and the
                quality loss is invisible at typical display sizes.
              </li>
              <li>
                <strong>E-commerce product photos on white backgrounds (75–80%):</strong> A typical
                2MB product photo becomes 180–250KB without visible degradation — a significant
                saving on catalog pages with dozens of images.
              </li>
              <li>
                <strong>Logos and flat graphics (85–90%):</strong> Flat color areas are where
                WebP&apos;s efficiency is most obvious. Keep quality slightly higher to preserve
                crisp edges and prevent color banding.
              </li>
              <li>
                <strong>Screenshots and UI captures (70–80%):</strong> Text and interface elements
                tolerate moderate compression well. Below 70% you may start to see ringing
                artifacts around sharp edges.
              </li>
              <li>
                <strong>When you have a hard file size limit:</strong> Use &quot;Compress to Size&quot;
                mode instead of guessing at quality settings. Type your target in KB and the tool
                automatically finds the highest quality that fits — no trial and error required.
              </li>
            </ul>
          </div>
        </div>

        {/* Key Factors */}
        <div className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            What Affects Your Compression Results
          </h2>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              <strong>Original image format.</strong> A JPEG that has already been compressed once
              will show more quality loss when re-compressed to WebP than a source file from a RAW
              export, a TIFF, or a lossless PNG. Whenever possible, start from the
              highest-quality version of the file rather than a previously compressed copy.
            </p>
            <p>
              <strong>Quality setting.</strong> The quality slider runs from 1 to 100. Values of
              80–85 are the practical sweet spot for most web images — enough compression to
              substantially cut file sizes while preserving the detail the eye can see at screen
              resolution. Below 70, blocking and ringing artifacts become noticeable in
              photographic content. Above 90, file sizes grow quickly with rapidly diminishing
              visual returns.
            </p>
            <p>
              <strong>Image content type.</strong> Photographs — with their continuous tonal
              gradients, natural noise, and complex textures — compress far better than flat
              graphics or line art. A photo might achieve 80–90% size reduction; a logo or
              diagram with large areas of flat color might achieve 40–60%.
            </p>
            <p>
              <strong>Resolution and dimensions.</strong> Compression ratio is largely independent
              of pixel dimensions, but a 4000×3000px image will always produce a larger output
              file than an 1200×900px version at the same quality setting. If you don&apos;t need
              full resolution for web display, resize before converting to maximize savings.
            </p>
            <p>
              <strong>Transparency (alpha channel).</strong> PNG files with transparency convert
              to WebP while preserving the alpha channel — unlike JPEG, which drops transparency
              entirely. If you need transparent images for web use (icons, overlays, cut-out
              product photos), WebP handles this natively in all modern browsers.
            </p>
          </div>
        </div>

        {/* When to Use WebP */}
        <div className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            When to Use WebP (and When Not To)
          </h2>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              WebP is the right choice for almost every image on a public website: blog post
              photos, e-commerce product images, hero banners, thumbnails, open-graph social
              sharing images, and background graphics. It&apos;s particularly valuable for
              pages with many images, mobile-first sites where bandwidth is constrained, and
              any project where Core Web Vitals scores affect search visibility.
            </p>
            <p>
              There are a few situations where WebP isn&apos;t the right tool. Print materials
              require lossless, high-color-depth formats such as TIFF or PSD — lossy WebP is
              not appropriate for files headed to a print production workflow. If you&apos;re
              distributing images through platforms that don&apos;t support WebP (certain email
              clients, some legacy CMS systems, or older enterprise intranet tools), stick with
              JPEG or PNG for those specific outputs. And if a PNG uses complex layered
              transparency that will be composited further in a professional design application,
              keep working in PNG until the final web-export step.
            </p>
            <p>
              For everything else — anything going on a website that real users will load on
              real devices — WebP will give you smaller files, faster load times, and better
              search performance than JPEG or PNG.
            </p>
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

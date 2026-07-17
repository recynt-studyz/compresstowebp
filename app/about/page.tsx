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
            image formats to WebP — the modern format that loads faster and weighs less — entirely
            inside your browser, without sending your files anywhere.
          </p>

          <h2 className="text-base font-semibold text-gray-800 pt-2">Why This Tool Exists</h2>
          <p>
            For years, compress-or-die.com was the go-to client-side image compressor for web
            developers who needed fast, private compression without uploading files to a third-party
            server. When it became unavailable, a lot of people noticed — it was referenced in Stack
            Overflow answers, WordPress optimization guides, and web performance tutorials across the
            industry. Most of the alternatives that emerged required creating accounts, imposed file
            size limits, processed images one at a time, or quietly uploaded files to a server
            despite claiming otherwise.
          </p>
          <p>
            CompressToWebP was built to fill that gap: a genuinely browser-native tool that handles
            batches of up to 50 files simultaneously, adds a &quot;Compress to Size&quot; mode that
            hits an exact KB target automatically, and never touches a server for image data — by
            architecture, not just by policy.
          </p>

          <h2 className="text-base font-semibold text-gray-800 pt-2">Privacy-First by Architecture</h2>
          <p>
            The no-upload approach isn&apos;t a marketing claim — it&apos;s a technical constraint
            baked into how the tool works. When you drop files onto the converter, JavaScript reads
            them directly from your local disk into browser memory using the FileReader API. Each
            image is drawn onto a hidden HTML5{' '}
            <code className="bg-gray-100 px-1 rounded">canvas</code> element, and the
            browser&apos;s built-in WebP encoder produces the output file. The result is handed
            back to you as a download. No network request is made for your image data — you can
            verify this yourself by opening DevTools and watching the Network tab while converting.
          </p>
          <p>
            This matters in situations that go beyond general privacy preference. Photographers
            working with client images under NDA, designers handling unreleased product photos,
            developers processing images that contain sensitive content — all of them can use this
            tool without risk, because the files never leave the device.
          </p>

          <h2 className="text-base font-semibold text-gray-800 pt-2">Who Uses CompressToWebP</h2>
          <p>
            The tool was built with a few specific people in mind, but it gets used across a wider
            range of roles than expected:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Web developers and SEO professionals</strong> who need to optimize image
              assets for Core Web Vitals scores, particularly Largest Contentful Paint.
            </li>
            <li>
              <strong>Bloggers and content creators</strong> who shoot photos with DSLRs or
              mirrorless cameras and end up with 4–8MB JPEG files that need to be web-ready
              before publishing.
            </li>
            <li>
              <strong>E-commerce store owners</strong> resizing and compressing product photography
              for Shopify, WooCommerce, or other platforms where image weight directly affects
              conversion rates and page speed scores.
            </li>
            <li>
              <strong>Designers</strong> preparing web-ready assets and exporting optimized images
              for handoff without needing to round-trip through Photoshop or Figma export plugins.
            </li>
            <li>
              <strong>Photographers</strong> delivering client galleries through web portals that
              enforce file size limits, or preparing social media assets that need to be under a
              specific KB threshold.
            </li>
          </ul>

          <h2 className="text-base font-semibold text-gray-800 pt-2">How the Compress-to-Size Mode Works</h2>
          <p>
            Most image compression tools offer a quality slider and leave the rest to you. If you
            need a file under 200KB, you guess at a quality setting, check the output, adjust, and
            repeat. The &quot;Compress to Size&quot; mode eliminates that loop.
          </p>
          <p>
            When you enter a KB target, the tool runs a binary search over WebP quality values
            (from 0 to 1 in the underlying API). It tries the midpoint quality, checks whether the
            output is above or below the target, then narrows the search range accordingly —
            converging on the highest quality that fits within your limit in a handful of
            iterations. The result is the best possible image at exactly the size you need, with
            no manual guessing.
          </p>

          <h2 className="text-base font-semibold text-gray-800 pt-2">Supporting the Tool</h2>
          <p>
            The site is ad-supported to remain free for everyone. There&apos;s no paid tier, no
            watermarks, and no feature gating. If you find it useful, the best ways to support it
            are sharing it with colleagues who would benefit, and linking to it from relevant
            content — both of which help keep it discoverable for the next person searching for a
            private, no-upload image converter.
          </p>

          <p className="pt-2">
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

import type { Metadata } from 'next'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — CompressToWebP',
  description: 'Privacy policy for compresstowebp.com. Your images are never uploaded or stored.',
  alternates: {
    canonical: 'https://compresstowebp.com/privacy',
  },
}

export default function Privacy() {
  return (
    <>
      <main className="max-w-2xl mx-auto px-4 py-14 flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 text-sm leading-relaxed">
          <p>
            <strong>Last updated: June 2025</strong>
          </p>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">
              Client-Side Processing — No Image Uploads
            </h2>
            <p>
              CompressToWebP processes all images entirely within your browser using the native
              Canvas API. Your image files are never transmitted to any server, never stored, and
              never seen by anyone other than you. You can disconnect from the internet after the
              page loads and the tool will continue to work.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">Data We Do Not Collect</h2>
            <p>We do not collect, store, or transmit:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Your image files or their contents</li>
              <li>Your name, email address, or any personal identifiers</li>
              <li>File names or metadata from uploaded images</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">Google AdSense</h2>
            <p>
              This site displays advertisements served by Google AdSense (Publisher ID:
              ca-pub-8792838105001561). Google may use cookies and similar technologies to serve
              personalized ads based on your browsing activity across websites. These cookies are
              set by Google, not by compresstowebp.com.
            </p>
            <p className="mt-2">
              You can opt out of personalized advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                className="text-[#2563EB] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google&apos;s Ad Settings
              </a>
              . For more information on how Google uses data from sites that use its services, see
              Google&apos;s Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">Analytics</h2>
            <p>
              We may use anonymized analytics (e.g. page view counts) to understand traffic
              patterns. No personally identifiable information is collected.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">Changes to This Policy</h2>
            <p>
              We may update this policy occasionally. Changes will be reflected by the updated date
              at the top of this page.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}

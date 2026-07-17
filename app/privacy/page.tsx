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
              Your Images Never Leave Your Browser
            </h2>
            <p>
              CompressToWebP processes all images entirely within your browser using the native
              Canvas API. Your image files are never transmitted to compresstowebp.com&apos;s
              servers or any third-party server. They are never stored, logged, or seen by anyone
              other than you.
            </p>
            <p className="mt-2">
              This is an architectural guarantee, not just a policy. The tool has no backend that
              could receive image data even if it wanted to. When you drop a file onto the
              converter, JavaScript reads it from your local disk into browser memory, processes it
              using the browser&apos;s built-in WebP encoder, and returns the result to you as a
              download — all without making any outbound network request containing your image.
              You can verify this yourself: open your browser&apos;s DevTools, go to the Network
              tab, convert an image, and observe that no request is made carrying image data.
            </p>
            <p className="mt-2">
              You can disconnect from the internet after the page loads and the tool will continue
              to work perfectly. File names, EXIF metadata, pixel dimensions, and image content are
              all processed locally and discarded when you close the tab.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">
              No Accounts, No Email, No Personal Data
            </h2>
            <p>
              CompressToWebP does not offer user accounts and does not collect personal information.
              There is no registration form, no login, and no email capture of any kind. We do not
              know who you are, what files you converted, how many you converted, or what they
              contained — because that information is never transmitted to us.
            </p>
            <p className="mt-2">
              We do not collect, store, or transmit:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Your image files, thumbnails, or their pixel data</li>
              <li>File names or EXIF metadata from your images</li>
              <li>Your name, email address, or any personal identifiers</li>
              <li>Your IP address (beyond what is inherent in any HTTP request to load the page)</li>
              <li>Device fingerprints or persistent identifiers tied to you individually</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">Analytics (Google Analytics 4)</h2>
            <p>
              We use Google Analytics 4 (GA4) to understand how the tool is used in aggregate.
              GA4 collects anonymized data including page views, session duration, general
              geographic region (at the country or city level), browser type, and device
              category. This data helps us understand which features are most used and how
              people find the tool.
            </p>
            <p className="mt-2">
              GA4 does not receive your image files, file names, or any information about what
              you converted. Google anonymizes IP addresses before storing them. The data GA4
              collects is aggregated and not linked to any individual identity.
            </p>
            <p className="mt-2">
              You can opt out of Google Analytics across all websites using the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                className="text-[#2563EB] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              . You can also manage your Google data preferences at{' '}
              <a
                href="https://myaccount.google.com/data-and-privacy"
                className="text-[#2563EB] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                myaccount.google.com/data-and-privacy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">Google AdSense</h2>
            <p>
              This site displays advertisements served by Google AdSense. Google may use cookies
              and similar technologies to serve personalized ads based on your browsing activity
              across websites. These cookies are set by Google&apos;s ad-serving infrastructure,
              not by compresstowebp.com, and are governed by Google&apos;s own privacy policies.
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
              . If you prefer not to see interest-based ads from Google across the web, you can
              also use the{' '}
              <a
                href="https://optout.aboutads.info/"
                className="text-[#2563EB] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Digital Advertising Alliance opt-out tool
              </a>
              . Ad personalization does not affect how the image converter functions — it operates
              independently of any advertising cookies on the page.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">GDPR and CCPA</h2>
            <p>
              Under the General Data Protection Regulation (GDPR) for residents of the European
              Union and European Economic Area, and under the California Consumer Privacy Act
              (CCPA) for California residents, you have the right to know what personal data is
              collected about you, request its deletion, and opt out of its sale.
            </p>
            <p className="mt-2">
              Because compresstowebp.com does not collect personally identifiable information
              directly, there is no personal data held by this site to delete or export. For data
              collected through Google&apos;s services (Analytics and AdSense), you can manage or
              delete that data through Google&apos;s privacy controls at{' '}
              <a
                href="https://myaccount.google.com/data-and-privacy"
                className="text-[#2563EB] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                myaccount.google.com/data-and-privacy
              </a>
              .
            </p>
            <p className="mt-2">
              Cookie consent banners are not displayed on this site because we do not set any
              first-party cookies ourselves. Third-party cookies set by Google (for ads and
              analytics) are subject to Google&apos;s consent mechanisms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">Changes to This Policy</h2>
            <p>
              We may update this policy occasionally to reflect changes in how the site operates
              or in applicable privacy regulations. Changes will be reflected by the updated date
              at the top of this page. Significant changes that affect how data is handled will
              be noted prominently.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-2">Contact</h2>
            <p>
              If you have questions or concerns about this privacy policy, you can reach us
              through the contact link in the site footer. We aim to respond to privacy-related
              inquiries within 5 business days.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

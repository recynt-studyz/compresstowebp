const faqs = [
  {
    q: 'What is WebP and why should I use it?',
    a: 'WebP is a modern image format developed by Google that provides superior compression for web images. WebP files are typically 25–35% smaller than comparable JPEG and PNG files at the same visual quality, which means faster page loads and lower bandwidth usage. All modern browsers support WebP, making it the best default format for web images.',
  },
  {
    q: 'How do I convert JPG to WebP?',
    a: 'Drag and drop your JPG files onto the upload area above, make sure "Convert to WebP" mode is selected, and adjust the quality slider if desired (85 is a good default). The conversion happens instantly in your browser — no upload required.',
  },
  {
    q: 'How do I compress an image to a specific file size like 100KB?',
    a: 'Switch to "Compress to Size" mode, upload your image, then type your target size (e.g. 100) in the KB field. The tool uses binary search on the WebP quality parameter to automatically find the quality level that produces a file as close to your target as possible.',
  },
  {
    q: 'Are my images uploaded to a server?',
    a: 'No. All processing happens 100% in your browser using the native Canvas API. Your images never leave your device and are never sent to any server. You can disconnect from the internet after the page loads and the tool will still work.',
  },
  {
    q: 'Will converting to WebP reduce image quality?',
    a: 'WebP uses lossy compression by default, so some quality reduction is possible. However, at quality 80–90 the difference is barely perceptible. WebP\'s algorithm is more efficient than JPEG, so you can achieve similar perceived quality at a lower file size.',
  },
  {
    q: 'Does WebP work in all browsers?',
    a: 'Yes. WebP is supported in Chrome, Firefox, Safari (since v14), Edge, Opera, and all modern mobile browsers. As of 2024, WebP support covers over 97% of global browser usage.',
  },
  {
    q: 'Can I convert multiple images at once?',
    a: 'Yes! Drag and drop up to 50 files at once. All images are processed simultaneously in your browser. When 2 or more files are done, a "Download All as ZIP" button appears so you can grab everything in one click.',
  },
  {
    q: 'What image formats are supported?',
    a: 'CompressToWebP accepts JPG, JPEG, PNG, GIF, WebP, and BMP files. All are converted to WebP output. The tool uses your browser\'s built-in image decoding, so any format your browser can display can be converted.',
  },
  {
    q: 'How much smaller will my WebP files be?',
    a: 'Results vary by content and settings, but in general: JPG photos save 20–35%, and PNG graphics save 30–60%. The exact savings depend on image complexity and your quality setting. The before/after file size is shown on each file card.',
  },
  {
    q: 'Is compresstowebp.com completely free?',
    a: 'Yes, completely free with no limits. There\'s no signup, no account required, no watermarks, and no limit on file size. The 50-file batch limit is a soft limit per session. The site is supported by advertising.',
  },
]

export default function FAQ() {
  return (
    <section className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details key={i} className="group rounded-xl border border-gray-100 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-medium text-gray-800 hover:text-[#2563EB] transition">
              {faq.q}
              <span className="ml-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </summary>
            <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

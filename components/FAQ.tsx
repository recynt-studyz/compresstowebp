const faqs = [
  {
    q: 'What is WebP and why should I use it?',
    a: 'WebP is a modern image format developed by Google that delivers superior compression for web images. When you compress to WebP, files are typically 25–35% smaller than equivalent JPEG or PNG at the same visual quality — which means faster page loads, lower bandwidth costs, and better Core Web Vitals scores. All modern browsers support WebP, making it the best default format for images on the web.',
  },
  {
    q: 'How do I convert JPG to WebP?',
    a: 'Using this free JPG to WebP converter is simple: drag and drop your JPG files onto the upload zone above, make sure "Convert to WebP" mode is selected, and adjust the quality slider if needed (85 is a good default). The conversion runs instantly in your browser — no upload, no server, no waiting. PNG to WebP works the same way.',
  },
  {
    q: 'How do I compress an image to a specific file size like 100KB?',
    a: 'Switch to "Compress to Size" mode, upload your image, and type your target in the KB field (e.g. 100 to compress image to 100KB). This WebP image compressor uses binary search over quality levels to automatically find the highest quality that still fits under your target — a technique that beats manual guessing every time. Great for compressing images for web upload limits, email attachments, or CMS restrictions.',
  },
  {
    q: 'Are my images uploaded to a server?',
    a: 'No. This tool is a fully client-side WebP converter — all processing happens in your browser using the native Canvas API. Your images never leave your device and are never sent to any server. You can disconnect from the internet after the page loads and the tool will still work perfectly.',
  },
  {
    q: 'Will converting to WebP reduce image quality?',
    a: 'WebP uses lossy compression by default, so some quality reduction is expected. However, at quality 80–90 the difference is barely perceptible to the human eye. Because the WebP codec is more efficient than JPEG, you often get better perceived quality at a smaller file size — making it the ideal format when compressing images for web use.',
  },
  {
    q: 'Does WebP work in all browsers?',
    a: 'Yes. WebP is supported in Chrome, Firefox, Safari (since v14), Edge, Opera, and all modern mobile browsers. As of 2024, WebP support covers over 97% of global browser usage, so you can safely compress to WebP for any public website without worrying about compatibility.',
  },
  {
    q: 'Can I convert multiple images at once?',
    a: 'Yes! This bulk WebP converter lets you drag and drop up to 50 files at once. All images are processed simultaneously in your browser. When 2 or more files are done, a "Download All as ZIP" button appears so you can grab everything in one click — perfect for batch converting a whole folder of JPGs or PNGs to WebP.',
  },
  {
    q: 'What image formats are supported?',
    a: 'This free WebP converter and image compressor accepts JPG, JPEG, PNG, GIF, WebP, and BMP files as input. All are converted to WebP output. The tool relies on your browser\'s built-in image decoding, so any format your browser can display can be converted — no plugins or extensions required.',
  },
  {
    q: 'How much smaller will my WebP files be?',
    a: 'Results depend on image content and your quality setting, but typical savings when you compress images for web are: JPG photos 20–35% smaller, PNG graphics 30–60% smaller. The before/after file size and percentage reduction are shown on each file card after conversion. Use the "Compress to Size" mode if you need to hit a specific KB target like 100KB or 200KB.',
  },
  {
    q: 'Is compresstowebp.com completely free?',
    a: 'Yes, completely free with no limits. There\'s no signup, no account required, no watermarks on output files, and no cap on individual file size. The 50-file batch soft limit applies per session. This free WebP converter is supported by advertising so it can stay free for everyone.',
  },
  {
    q: 'Is this a good Squoosh alternative?',
    a: 'Yes. compresstowebp.com offers several advantages over Squoosh — bulk processing of multiple images simultaneously, a target file size mode that automatically finds the right quality level, and WebP compression that often produces better quality output at equivalent file sizes. If you need to compress a single image with advanced codec options, Squoosh is excellent. If you need to compress multiple images quickly or hit a specific file size target, compresstowebp.com is the faster choice.',
  },
  {
    q: 'Is compresstowebp.com a good compress-or-die alternative?',
    a: 'Yes. compresstowebp.com offers the same client-side WebP compression as compress-or-die with no uploads, no server processing, and no file size limits. All compression happens directly in your browser. It\'s completely free with no account required.',
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

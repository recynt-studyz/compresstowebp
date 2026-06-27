'use client'

import dynamic from 'next/dynamic'

const Converter = dynamic(() => import('./Converter'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-2xl mx-auto flex items-center justify-center py-20 text-gray-400 text-sm">
      Loading converter…
    </div>
  ),
})

export default function ConverterWrapper() {
  return <Converter />
}

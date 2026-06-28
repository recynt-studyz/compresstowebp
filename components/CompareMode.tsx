'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { flushSync } from 'react-dom'

type Preset = 'web' | 'email' | 'print' | null

const ACCEPTED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/bmp',
])
const MAX_DIM = 2000
const DEBOUNCE_MS = 150

function qualityLabel(q: number): string {
  if (q <= 40) return 'Low quality · smallest file'
  if (q <= 60) return 'Medium quality · good balance'
  if (q <= 80) return 'High quality · recommended'
  if (q <= 94) return 'Very high quality · large file'
  return 'Maximum quality · near lossless'
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function CompareMode() {
  const [quality, setQuality] = useState(80)
  const [preset, setPreset] = useState<Preset>(null)
  const [draggingDrop, setDraggingDrop] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [fileName, setFileName] = useState('')
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [rendering, setRendering] = useState(false)
  const [scaled, setScaled] = useState(false)
  const [aspectRatio, setAspectRatio] = useState('16/9')
  const [handleFrac, setHandleFrac] = useState(0.5)

  const originalCanvasRef = useRef<HTMLCanvasElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const currentBlobRef = useRef<Blob | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isDraggingHandleRef = useRef(false)
  const qualityRef = useRef(quality)
  qualityRef.current = quality

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  const renderPreview = useCallback(async (q: number) => {
    const src = sourceCanvasRef.current
    const preview = previewCanvasRef.current
    if (!src || !preview) { setRendering(false); return }

    // Fresh offscreen canvas from source on every call
    const offscreen = document.createElement('canvas')
    offscreen.width = src.width
    offscreen.height = src.height
    offscreen.getContext('2d')!.drawImage(src, 0, 0)

    const blob = await new Promise<Blob | null>((resolve) =>
      offscreen.toBlob(resolve, 'image/webp', q / 100)
    )
    if (!blob) { setRendering(false); return }

    console.log(`Quality ${q}: ${blob.size} bytes`)

    currentBlobRef.current = blob
    // Update size immediately — before canvas draw
    setCompressedSize(blob.size)

    // Revoke URL immediately after drawing — no cross-render URL state
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.src = url
    await new Promise<void>((resolve) => {
      img.onload = () => resolve()
    })
    URL.revokeObjectURL(url)

    const ctx = preview.getContext('2d')
    if (!ctx) { setRendering(false); return }
    ctx.clearRect(0, 0, preview.width, preview.height)
    ctx.drawImage(img, 0, 0, preview.width, preview.height)
    setRendering(false)
  }, [])

  const debouncedRenderPreview = useCallback(
    (q: number) => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      setRendering(true) // show loading state immediately on slider move
      debounceRef.current = setTimeout(() => renderPreview(q), DEBOUNCE_MS)
    },
    [renderPreview]
  )

  const loadImage = useCallback(
    async (file: File) => {
      currentBlobRef.current = null

      const fileUrl = URL.createObjectURL(file)
      const img = new Image()
      img.src = fileUrl
      try {
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve()
          img.onerror = () => reject(new Error('Failed to load image'))
        })
      } finally {
        URL.revokeObjectURL(fileUrl)
      }

      let w = img.naturalWidth
      let h = img.naturalHeight
      let wasScaled = false

      if (Math.max(w, h) > MAX_DIM) {
        const scale = MAX_DIM / Math.max(w, h)
        w = Math.round(w * scale)
        h = Math.round(h * scale)
        wasScaled = true
      }

      // Build off-screen source canvas
      const src = document.createElement('canvas')
      src.width = w
      src.height = h
      src.getContext('2d')!.drawImage(img, 0, 0, w, h)
      sourceCanvasRef.current = src

      // Flush state so canvas elements mount before we draw to them
      flushSync(() => {
        setFileName(file.name.replace(/\.[^.]+$/, '') + '.webp')
        setOriginalSize(file.size)
        setAspectRatio(`${w}/${h}`)
        setScaled(wasScaled)
        setHandleFrac(0.5)
        setCompressedSize(0)
        setImageLoaded(true)
      })

      // Set dimensions and draw original (canvases are now mounted)
      const origCanvas = originalCanvasRef.current
      if (origCanvas) {
        origCanvas.width = w
        origCanvas.height = h
        origCanvas.getContext('2d')!.drawImage(img, 0, 0, w, h)
      }
      const prevCanvas = previewCanvasRef.current
      if (prevCanvas) {
        prevCanvas.width = w
        prevCanvas.height = h
      }

      await renderPreview(qualityRef.current)
    },
    [renderPreview]
  )

  function processFile(file: File) {
    if (ACCEPTED_MIME.has(file.type)) loadImage(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDraggingDrop(false)
    const file = Array.from(e.dataTransfer.files).find((f) => ACCEPTED_MIME.has(f.type))
    if (file) processFile(file)
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) processFile(e.target.files[0])
    e.target.value = ''
  }

  const updateHandleFrac = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const frac = Math.max(0, Math.min((clientX - rect.left) / rect.width, 1))
    setHandleFrac(frac)
  }, [])

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!isDraggingHandleRef.current) return
      e.preventDefault()
      updateHandleFrac(e.clientX)
    }
    function onMouseUp() {
      isDraggingHandleRef.current = false
    }
    function onTouchMove(e: TouchEvent) {
      if (!isDraggingHandleRef.current) return
      e.preventDefault()
      updateHandleFrac(e.touches[0].clientX)
    }
    function onTouchEnd() {
      isDraggingHandleRef.current = false
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('touchmove', onTouchMove, { passive: false })
    document.addEventListener('touchend', onTouchEnd)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
    }
  }, [updateHandleFrac])

  function handleDownload() {
    const blob = currentBlobRef.current
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleChangeImage() {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    currentBlobRef.current = null
    sourceCanvasRef.current = null
    setImageLoaded(false)
    setCompressedSize(0)
    setOriginalSize(0)
    setRendering(false)
  }

  const compressionPct =
    originalSize > 0 && compressedSize > 0
      ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
      : 0
  const compressedSizeColor =
    compressionPct > 20
      ? 'text-green-600'
      : compressionPct >= 5
        ? 'text-yellow-600'
        : compressedSize > originalSize
          ? 'text-red-500'
          : 'text-gray-800'
  const handleLeft = `${handleFrac * 100}%`

  // ── Drop zone ──────────────────────────────────────────────────────────────
  if (!imageLoaded) {
    return (
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setDraggingDrop(true)
        }}
        onDragLeave={() => setDraggingDrop(false)}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition ${
          draggingDrop
            ? 'border-[#2563EB] bg-blue-50'
            : 'border-gray-200 bg-gray-50 hover:border-[#2563EB] hover:bg-blue-50/40'
        }`}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="16 16 12 12 8 16" />
            <line x1="12" y1="12" x2="12" y2="21" />
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
          </svg>
        </div>
        <p className="text-base font-semibold text-gray-700">
          Drop one image to compare or <span className="text-[#2563EB]">browse</span>
        </p>
        <p className="mt-1 text-sm text-gray-400">
          JPG, PNG, GIF, WebP, BMP — one image at a time
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp,image/bmp"
          className="hidden"
          onChange={handleFileInput}
        />
      </div>
    )
  }

  // ── Comparison view ────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      {/* Comparison container */}
      <div
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-md"
        style={{ aspectRatio, userSelect: 'none' }}
      >
        {/* Original (left) */}
        <canvas
          ref={originalCanvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />

        {/* WebP preview (right, clipped) */}
        <canvas
          ref={previewCanvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            clipPath: `inset(0 0 0 ${handleLeft})`,
          }}
        />

        {/* Drag handle */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: handleLeft,
            transform: 'translateX(-50%)',
            width: 20,
            zIndex: 10,
            cursor: 'ew-resize',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
          onMouseDown={(e) => {
            e.preventDefault()
            isDraggingHandleRef.current = true
          }}
          onTouchStart={(e) => {
            e.preventDefault()
            isDraggingHandleRef.current = true
          }}
        >
          {/* Vertical line */}
          <div
            style={{
              width: 2,
              background: '#2563EB',
              alignSelf: 'stretch',
              boxShadow: '0 0 6px rgba(37,99,235,0.35)',
            }}
          />
          {/* Circle handle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'white',
              border: '2px solid #2563EB',
              boxShadow: '0 2px 10px rgba(0,0,0,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2563EB',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="9 18 3 12 9 6" />
              <polyline points="15 6 21 12 15 18" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div style={{ position: 'absolute', bottom: 8, left: 8, zIndex: 5 }}>
          <span
            style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              color: 'white',
              borderRadius: 9999,
              padding: '3px 9px',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.01em',
            }}
          >
            Original
          </span>
        </div>
        <div style={{ position: 'absolute', bottom: 8, right: 8, zIndex: 5 }}>
          <span
            style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              color: 'white',
              borderRadius: 9999,
              padding: '3px 9px',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.01em',
            }}
          >
            Compressed
          </span>
        </div>
      </div>

      {scaled && (
        <p className="text-xs text-center text-amber-600">
          Preview scaled for performance — download is full resolution.
        </p>
      )}

      {/* Stats bar */}
      <div className="flex items-center justify-between rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
        {/* Left: Original */}
        <div className="text-center min-w-[80px]">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
            Original
          </div>
          <div className="text-xl font-bold text-gray-800">{formatBytes(originalSize)}</div>
        </div>

        {/* Center: arrow + reduction */}
        <div className="text-center flex-1 px-2">
          <div className="text-gray-300 text-lg leading-none">→</div>
          <div
            className={`text-xs font-bold mt-1 ${
              rendering
                ? 'text-gray-300'
                : compressionPct > 20
                  ? 'text-green-600'
                  : compressionPct >= 5
                    ? 'text-yellow-600'
                    : compressionPct < 0
                      ? 'text-red-500'
                      : 'text-gray-400'
            }`}
          >
            {rendering
              ? '…'
              : compressedSize === 0
                ? '…'
                : compressionPct > 0
                  ? `${compressionPct}% reduction`
                  : compressionPct < 0
                    ? `${Math.abs(compressionPct)}% larger`
                    : 'no change'}
          </div>
        </div>

        {/* Right: Compressed */}
        <div className="text-center min-w-[80px]">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
            Compressed
          </div>
          <div
            className={`text-xl font-bold transition-colors ${
              rendering ? 'animate-pulse text-gray-300' : compressedSize > 0 ? compressedSizeColor : 'text-gray-300'
            }`}
          >
            {rendering && compressedSize === 0 ? '…' : compressedSize > 0 ? formatBytes(compressedSize) : '…'}
          </div>
          {!rendering && compressedSize > 0 && (
            <div className={`text-[11px] font-medium mt-0.5 ${compressedSizeColor}`}>
              {compressionPct > 0
                ? `${compressionPct}% smaller`
                : compressionPct < 0
                  ? `${Math.abs(compressionPct)}% larger`
                  : 'same size'}
            </div>
          )}
        </div>
      </div>

      {/* Quality controls */}
      <div className="space-y-2">
        {/* Preset buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 shrink-0">Preset:</span>
          {(
            [
              { id: 'web', label: 'Web', value: 75 },
              { id: 'email', label: 'Email', value: 60 },
              { id: 'print', label: 'Print', value: 90 },
            ] as const
          ).map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setQuality(p.value)
                setPreset(p.id)
                debouncedRenderPreview(p.value)
              }}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                preset === p.id
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Quality label row */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium text-gray-700 shrink-0">Quality:</span>
          <span className="text-[#2563EB] font-semibold text-sm shrink-0">{quality}</span>
          <span className="text-xs text-gray-500 truncate">{qualityLabel(quality)}</span>
        </div>

        {/* Slider */}
        <input
          type="range"
          min={1}
          max={100}
          value={quality}
          onChange={(e) => {
            const q = Number(e.target.value)
            setQuality(q)
            setPreset(null)
            debouncedRenderPreview(q)
          }}
          className="w-full accent-[#2563EB]"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleDownload}
          disabled={!currentBlobRef.current}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download WebP{compressedSize > 0 ? ` · ${formatBytes(compressedSize)}` : ''}
        </button>
        <button
          onClick={handleChangeImage}
          className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
        >
          Change
        </button>
      </div>
    </div>
  )
}

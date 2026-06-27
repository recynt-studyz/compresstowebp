'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import FileCard, { ProcessedFile } from './FileCard'

type Mode = 'convert' | 'compress'
type Preset = 'web' | 'email' | 'print' | null

function qualityLabel(q: number): string {
  if (q <= 40) return 'Low quality · smallest file'
  if (q <= 60) return 'Medium quality · good balance'
  if (q <= 80) return 'High quality · recommended'
  if (q <= 94) return 'Very high quality · large file'
  return 'Maximum quality · near lossless'
}

function qualityReduction(q: number): string {
  if (q <= 40) return '~85%'
  if (q <= 60) return '~75%'
  if (q <= 80) return '~65%'
  if (q <= 94) return '~45%'
  return '~20%'
}

const ACCEPTED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/bmp',
])
const FILE_LIMIT = 50

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

async function buildCanvas(file: File): Promise<HTMLCanvasElement> {
  const url = URL.createObjectURL(file)
  const img = new Image()
  img.src = url
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = () => reject(new Error('Could not load image'))
  })
  URL.revokeObjectURL(url)
  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0)
  return canvas
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('toBlob returned null'))),
      'image/webp',
      quality
    )
  )
}

async function convertToWebP(file: File, quality: number): Promise<Blob> {
  const canvas = await buildCanvas(file)
  return canvasToBlob(canvas, quality / 100)
}

async function compressToSize(file: File, targetKB: number): Promise<Blob> {
  const targetBytes = targetKB * 1024
  const canvas = await buildCanvas(file)
  let lo = 0.01
  let hi = 1.0
  let result: Blob | null = null

  while (hi - lo > 0.01) {
    const mid = (lo + hi) / 2
    const blob = await canvasToBlob(canvas, mid)
    if (blob.size > targetBytes) {
      hi = mid
    } else {
      lo = mid
      result = blob
    }
  }

  // Fallback: if nothing fit under target, return the smallest possible
  if (!result) result = await canvasToBlob(canvas, lo)
  return result
}

export default function Converter() {
  const [mode, setMode] = useState<Mode>('convert')
  const [quality, setQuality] = useState(80)
  const [preset, setPreset] = useState<Preset>(null)
  const [targetKB, setTargetKB] = useState(100)
  const [files, setFiles] = useState<ProcessedFile[]>([])
  const [dragging, setDragging] = useState(false)
  const [limitWarning, setLimitWarning] = useState(false)
  const objectUrlsRef = useRef<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const filesRef = useRef(files)
  filesRef.current = files

  useEffect(() => {
    const urls = objectUrlsRef.current
    return () => urls.forEach((u) => URL.revokeObjectURL(u))
  }, [])

  const processFiles = useCallback(
    (rawFiles: File[]) => {
      const valid = rawFiles.filter((f) => ACCEPTED_MIME.has(f.type))
      if (valid.length === 0) return

      const currentCount = filesRef.current.length
      const remaining = FILE_LIMIT - currentCount

      if (remaining <= 0) {
        setLimitWarning(true)
        return
      }

      const batch = valid.slice(0, remaining)
      if (batch.length < valid.length) setLimitWarning(true)

      const capturedMode = mode
      const capturedQuality = quality
      const capturedTargetKB = targetKB

      const newEntries: ProcessedFile[] = batch.map((file) => ({
        id: crypto.randomUUID(),
        file,
        status: 'pending',
        originalSize: file.size,
        outputName: file.name.replace(/\.[^.]+$/, '') + '.webp',
      }))

      setFiles((prev) => [...prev, ...newEntries])

      newEntries.forEach(async (entry) => {
        setFiles((prev) =>
          prev.map((f) => (f.id === entry.id ? { ...f, status: 'converting' } : f))
        )
        try {
          const blob =
            capturedMode === 'convert'
              ? await convertToWebP(entry.file, capturedQuality)
              : await compressToSize(entry.file, capturedTargetKB)
          const objectUrl = URL.createObjectURL(blob)
          objectUrlsRef.current.push(objectUrl)
          setFiles((prev) =>
            prev.map((f) =>
              f.id === entry.id
                ? { ...f, status: 'done', outputSize: blob.size, outputBlob: blob, objectUrl }
                : f
            )
          )
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Unknown error'
          setFiles((prev) =>
            prev.map((f) => (f.id === entry.id ? { ...f, status: 'error', error: msg } : f))
          )
        }
      })
    },
    [mode, quality, targetKB]
  )

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    processFiles(Array.from(e.dataTransfer.files))
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setDragging(true)
  }

  function handleDragLeave() {
    setDragging(false)
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) processFiles(Array.from(e.target.files))
    e.target.value = ''
  }

  async function handleDownloadZip() {
    const done = files.filter((f) => f.status === 'done' && f.outputBlob)
    if (done.length < 2) return
    const { default: JSZip } = await import('jszip')
    const zip = new JSZip()
    done.forEach((f) => zip.file(f.outputName, f.outputBlob!))
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(zipBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'webp-images.zip'
    a.click()
    URL.revokeObjectURL(url)
  }

  function clearAll() {
    files.forEach((f) => f.objectUrl && URL.revokeObjectURL(f.objectUrl))
    objectUrlsRef.current = []
    setFiles([])
    setLimitWarning(false)
  }

  const doneFiles = files.filter((f) => f.status === 'done')
  const hasFiles = files.length > 0

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Mode toggle */}
      <div className="flex rounded-xl bg-gray-100 p-1 mb-2.5">
        <button
          onClick={() => setMode('convert')}
          className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${
            mode === 'convert'
              ? 'bg-white shadow text-[#2563EB]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Convert to WebP
        </button>
        <button
          onClick={() => setMode('compress')}
          className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${
            mode === 'compress'
              ? 'bg-white shadow text-[#2563EB]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Compress to Size
        </button>
      </div>

      {/* Settings row */}
      {mode === 'convert' && (
        <div className="mb-3 space-y-2">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm font-medium text-gray-700 shrink-0">Quality:</span>
              <span className="text-[#2563EB] font-semibold text-sm shrink-0">{quality}</span>
              <span className="text-xs text-gray-500 truncate">{qualityLabel(quality)}</span>
            </div>
            <span className="text-xs font-medium text-green-600 shrink-0 ml-2">
              {qualityReduction(quality)} smaller
            </span>
          </div>

          {/* Slider */}
          <input
            type="range"
            min={1}
            max={100}
            value={quality}
            onChange={(e) => {
              setQuality(Number(e.target.value))
              setPreset(null)
            }}
            className="w-full accent-[#2563EB]"
          />
        </div>
      )}

      {mode === 'compress' && (
        <div className="mb-3 flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700 shrink-0">Target size:</label>
          <div className="flex items-center rounded-lg border border-gray-200 bg-white">
            <input
              type="number"
              min={1}
              max={50000}
              value={targetKB}
              onChange={(e) => setTargetKB(Math.max(1, Number(e.target.value)))}
              className="w-24 rounded-l-lg px-3 py-2 text-sm outline-none"
            />
            <span className="rounded-r-lg border-l border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500">
              KB
            </span>
          </div>
          <span className="text-xs text-gray-400">e.g. 100, 200, 50</span>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition ${
          dragging
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
          Drop images here or <span className="text-[#2563EB]">browse</span>
        </p>
        <p className="mt-1 text-sm text-gray-400">JPG, PNG, GIF, WebP, BMP — up to 50 files</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/gif,image/webp,image/bmp"
          className="hidden"
          onChange={handleFileInput}
        />
      </div>

      {limitWarning && (
        <p className="mt-3 text-sm text-amber-600">
          Maximum 50 files per batch. Some files were skipped.
        </p>
      )}

      {/* File list */}
      {hasFiles && (
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">
              {doneFiles.length}/{files.length} converted
            </p>
            <button
              onClick={clearAll}
              className="text-xs text-gray-400 hover:text-gray-600 transition"
            >
              Clear all
            </button>
          </div>

          {files.map((pf) => (
            <FileCard key={pf.id} pf={pf} />
          ))}

          {doneFiles.length >= 2 && (
            <button
              onClick={handleDownloadZip}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download All as ZIP ({doneFiles.length} files)
            </button>
          )}
        </div>
      )}
    </div>
  )
}

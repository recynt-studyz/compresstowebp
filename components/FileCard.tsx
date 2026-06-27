'use client'

export type FileStatus = 'pending' | 'converting' | 'done' | 'error'

export interface ProcessedFile {
  id: string
  file: File
  status: FileStatus
  originalSize: number
  outputSize?: number
  outputBlob?: Blob
  outputName: string
  error?: string
  objectUrl?: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function pctReduced(original: number, output: number): number {
  return Math.round(((original - output) / original) * 100)
}

const STATUS_LABELS: Record<FileStatus, string> = {
  pending: 'Pending',
  converting: 'Converting…',
  done: 'Done',
  error: 'Error',
}

const STATUS_COLORS: Record<FileStatus, string> = {
  pending: 'text-gray-400',
  converting: 'text-blue-500',
  done: 'text-green-600',
  error: 'text-red-500',
}

export default function FileCard({ pf }: { pf: ProcessedFile }) {
  const pct = pf.outputSize != null ? pctReduced(pf.originalSize, pf.outputSize) : null

  function handleDownload() {
    if (!pf.objectUrl) return
    const a = document.createElement('a')
    a.href = pf.objectUrl
    a.download = pf.outputName
    a.click()
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-800">{pf.file.name}</p>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-500">
          <span className={STATUS_COLORS[pf.status]}>{STATUS_LABELS[pf.status]}</span>
          {pf.status === 'done' && pf.outputSize != null && (
            <>
              <span>·</span>
              <span>
                {formatBytes(pf.originalSize)} → {formatBytes(pf.outputSize)}
              </span>
            </>
          )}
          {pf.status === 'error' && pf.error && (
            <>
              <span>·</span>
              <span className="text-red-400">{pf.error}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {pf.status === 'converting' && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
        )}
        {pf.status === 'done' && pct != null && (
          <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
            {pct}% smaller
          </span>
        )}
        {pf.status === 'done' && pf.objectUrl && (
          <button
            onClick={handleDownload}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB] text-white transition hover:bg-blue-700"
            title="Download"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

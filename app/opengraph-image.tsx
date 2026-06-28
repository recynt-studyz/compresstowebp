import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Compress to WebP — Free Image Converter'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e40af 0%, #2563EB 50%, #3b82f6 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '32px',
        }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            fontWeight: 800,
            color: '#2563EB',
          }}>
            W
          </div>
          <span style={{
            fontSize: 36,
            fontWeight: 700,
            color: 'white',
            letterSpacing: '-0.5px',
          }}>
            compresstowebp.com
          </span>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 56,
          fontWeight: 800,
          color: 'white',
          textAlign: 'center',
          lineHeight: 1.1,
          marginBottom: '20px',
          maxWidth: '900px',
        }}>
          Compress Images to WebP Instantly
        </div>

        {/* Subheadline */}
        <div style={{
          fontSize: 26,
          color: 'rgba(255,255,255,0.85)',
          textAlign: 'center',
          marginBottom: '40px',
        }}>
          No upload required — files never leave your browser
        </div>

        {/* Trust pills */}
        <div style={{
          display: 'flex',
          gap: '16px',
        }}>
          {['Free', 'No Upload', 'Bulk Processing', 'Before & After'].map(label => (
            <div key={label} style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '100px',
              padding: '8px 20px',
              color: 'white',
              fontSize: 18,
              fontWeight: 500,
            }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}

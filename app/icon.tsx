import { ImageResponse } from 'next/og'

export const size = { width: 48, height: 48 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #1d4ed8, #2563EB)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}>
          {/* Top arrow pointing down */}
          <span style={{
            fontSize: 16,
            color: 'white',
            fontWeight: 900,
            lineHeight: 1,
          }}>▼</span>
          {/* Small image square */}
          <div style={{
            width: 18,
            height: 14,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.9)',
            border: '2px solid rgba(255,255,255,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontSize: 8,
              color: '#2563EB',
              fontWeight: 900,
            }}>W</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

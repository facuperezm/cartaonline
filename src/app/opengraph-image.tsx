import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Carta Online - Tu Menú Digital'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#faf8f5',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Background decorative blobs */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background:
            'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(234,179,8,0.15) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'linear-gradient(135deg, rgba(234,179,8,0.15) 0%, rgba(34,197,94,0.1) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '60%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(249,115,22,0.08)',
        }}
      />

      {/* Main content container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Logo/Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100px',
            height: '100px',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            marginBottom: '32px',
            boxShadow: '0 20px 40px -10px rgba(249,115,22,0.4)',
          }}
        >
          {/* Utensils icon */}
          <svg
            aria-label="Utensils icon"
            fill="none"
            height="56"
            role="img"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="56"
          >
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#1c1917',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Carta Online
          </h1>

          {/* Subtitle with highlight */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontSize: '32px',
                color: '#78716c',
                fontWeight: 400,
              }}
            >
              Tu menú digital
            </span>
            <span
              style={{
                fontSize: '32px',
                color: '#f97316',
                fontWeight: 600,
                padding: '4px 16px',
                backgroundColor: 'rgba(249,115,22,0.1)',
                borderRadius: '8px',
              }}
            >
              en minutos
            </span>
          </div>
        </div>

        {/* Features pills */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              backgroundColor: 'white',
              borderRadius: '100px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <span style={{ fontSize: '20px' }}>📱</span>
            <span
              style={{
                fontSize: '18px',
                color: '#44403c',
                fontWeight: 500,
              }}
            >
              Código QR
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              backgroundColor: 'white',
              borderRadius: '100px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <span style={{ fontSize: '20px' }}>⚡</span>
            <span
              style={{
                fontSize: '18px',
                color: '#44403c',
                fontWeight: 500,
              }}
            >
              Actualización instantánea
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              backgroundColor: 'white',
              borderRadius: '100px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <span style={{ fontSize: '20px' }}>🍽️</span>
            <span
              style={{
                fontSize: '18px',
                color: '#44403c',
                fontWeight: 500,
              }}
            >
              Fácil de usar
            </span>
          </div>
        </div>
      </div>

      {/* Bottom URL */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#22c55e',
          }}
        />
        <span
          style={{
            fontSize: '18px',
            color: '#78716c',
            fontWeight: 400,
          }}
        >
          cartaonline.facupm.dev
        </span>
      </div>
    </div>,
    {
      ...size,
    },
  )
}

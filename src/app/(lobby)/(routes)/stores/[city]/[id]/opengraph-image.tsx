/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

import { db } from '@/lib/db'

export const size = {
  width: 765,
  height: 300,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { id: string } }) {
  const { id } = await params
  const store = await db.store.findFirst({
    where: { id },
    include: {
      banner: true,
    },
  })

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {store?.banner ? (
        // biome-ignore lint/performance/noImgElement: ImageResponse doesn't support next/image
        <img
          alt="background"
          height={size.height}
          src={store.banner.url}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          width={size.width}
        />
      ) : null}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage:
            'linear-gradient(to top, rgba(0,0,0,1), transparent)',
        }}
      />
      <div
        style={{
          padding: 20,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontSize: '45px',
              textAlign: 'center',
              lineHeight: '40px',
              letterSpacing: '-0.025em',
              fontWeight: '900',
            }}
          >
            {store?.name ?? 'Tienda'}
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          inset: 0,
          padding: '30px',
          lineHeight: '28px',
          textAlign: 'center',
          fontSize: 20,
          color: 'white',
        }}
      >
        {store?.slug
          ? `cartaonline.facupm.dev/share/${store?.slug}`
          : 'cartaonline.facupm.dev'}
      </div>
    </div>,
    {
      ...size,
    },
  )
}

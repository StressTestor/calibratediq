import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'CalibratedIQ - Free Scientific IQ Assessment';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#0a0a1a',
          color: '#e0e0e8',
          fontFamily: 'system-ui, sans-serif',
          padding: 60,
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, marginBottom: 24, display: 'flex' }}>
          CalibratedIQ
        </div>
        <div style={{ fontSize: 32, color: '#9ca3af', marginBottom: 48, textAlign: 'center', display: 'flex' }}>
          Free Scientific IQ Assessment
        </div>
        <div style={{ display: 'flex', gap: 40, fontSize: 22, color: '#6b7280' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex' }}>30 Questions</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex' }}>15 Minutes</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex' }}>100% Free</div>
          </div>
        </div>
        <div style={{ fontSize: 20, color: '#2d6a7a', marginTop: 48, display: 'flex' }}>
          Based on Raven's Progressive Matrices methodology
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

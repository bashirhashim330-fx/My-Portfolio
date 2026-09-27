export default function Page() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b1020',
        color: '#f3f4f6',
        fontFamily: 'Arial, sans-serif',
        padding: '2rem',
      }}
    >
      <div
        style={{
          maxWidth: 720,
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 18,
          background: 'rgba(255,255,255,0.03)',
          padding: '3rem',
          boxShadow: '0 12px 36px rgba(0,0,0,0.25)',
        }}
      >
        <p style={{ letterSpacing: 3, textTransform: 'uppercase', opacity: 0.7, marginBottom: 12 }}>
          Portfolio
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', margin: '0 0 1rem' }}>Bashir Hashim</h1>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, opacity: 0.85 }}>
          Frontend developer and Computer Science student building clean, responsive web experiences.
        </p>
        <p style={{ marginTop: 24, opacity: 0.7 }}>GitHub Pages and Vercel path configuration is being stabilized.</p>
      </div>
    </main>
  )
}

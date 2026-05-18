export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white',
      padding: '40px',
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>✨ Year Tracker 2026</h1>
      <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '40px', fontSize: '1.2rem' }}>Choose your tracker:</p>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="/index.html" style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '16px',
          padding: '30px 40px',
          color: '#F4C2C2',
          textDecoration: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}>🌸 Sofia - Soft Girl</a>
        <a href="/ceos-tracker.html" style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '16px',
          padding: '30px 40px',
          color: '#F4C2C2',
          textDecoration: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}>✨ CEO's Tracker</a>
        <a href="/manly-tracker.html" style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '16px',
          padding: '30px 40px',
          color: '#7FB3D5',
          textDecoration: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}>💪 Manly Tracker</a>
      </div>
    </div>
  );
}
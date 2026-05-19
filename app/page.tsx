export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white',
      padding: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center', paddingTop: '40vh' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>✨ Sofia ✨</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem' }}>Loading your year tracker...</p>
        <p style={{ marginTop: '20px' }}>
          <a href="/sofia.html" style={{ color: '#FF6B9D' }}>Click here to enter</a>
        </p>
      </div>
    </div>
  );
}

import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDelete = () => {
    if (isConfirming) {
      setIsDeleting(true);
      setTimeout(() => {
        setIsDeleting(false);
        setIsConfirming(false);
      }, 2000);
    } else {
      setIsConfirming(true);
    }
  };

  const handleBlur = () => {
    setIsConfirming(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Project Settings</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>User Info</h2>
        {/* ✅ GOOD: Form with proper labels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', maxWidth: '300px' }}>
          <label htmlFor="email" style={{ fontSize: '14px', fontWeight: 'bold' }}>
            Email <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Danger Zone</h2>
        <p>Delete this project? This action cannot be undone.</p>

        {/* ✅ GOOD: Accessible button with ARIA label */}
        <button
          aria-label={isConfirming ? "Confirm delete project" : "Delete project"}
          onClick={handleDelete}
          onBlur={handleBlur}
          disabled={isDeleting}
          style={{
            backgroundColor: isConfirming ? '#fee2e2' : '#f3f4f6',
            borderColor: isConfirming ? '#ef4444' : '#d1d5db',
            color: isConfirming ? '#991b1b' : '#374151',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: isDeleting ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '40px',
            minHeight: '40px',
            fontWeight: 'bold',
            transition: 'all 0.2s'
          }}
        >
          {isDeleting ? (
            <span role="status" aria-label="Deleting">⏳</span>
          ) : isConfirming ? (
            <span>Confirm?</span>
          ) : (
            <span role="img" aria-hidden="true">🗑️</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default App;

import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDelete = () => {
    if (isConfirming) {
      setIsDeleting(true);
      setIsConfirming(false);
      setTimeout(() => setIsDeleting(false), 2000);
    } else {
      setIsConfirming(true);
    }
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
          aria-label={isConfirming ? "Confirm deletion" : "Delete project"}
          onClick={handleDelete}
          onBlur={() => setIsConfirming(false)}
          disabled={isDeleting}
          style={{
            backgroundColor: isConfirming ? '#ef4444' : '#fee2e2',
            color: isConfirming ? 'white' : 'inherit',
            border: '1px solid #ef4444',
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: isDeleting ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '40px',
            minHeight: '40px',
            transition: 'all 0.2s ease',
            fontWeight: isConfirming ? 'bold' : 'normal',
          }}
        >
          {isDeleting ? (
            <span role="status" aria-label="Deleting">⏳</span>
          ) : isConfirming ? (
            "Confirm?"
          ) : (
            <span role="img" aria-hidden="true">🗑️</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default App;

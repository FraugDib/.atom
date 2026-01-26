import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [deleteStatus, setDeleteStatus] = useState<'idle' | 'confirming' | 'deleting'>('idle');

  const handleDelete = () => {
    if (deleteStatus === 'idle') {
      setDeleteStatus('confirming');
      return;
    }

    if (deleteStatus === 'confirming') {
      setDeleteStatus('deleting');
      setTimeout(() => setDeleteStatus('idle'), 2000);
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
          aria-label={deleteStatus === 'confirming' ? "Confirm deletion" : "Delete project"}
          onClick={handleDelete}
          onBlur={() => deleteStatus === 'confirming' && setDeleteStatus('idle')}
          disabled={deleteStatus === 'deleting'}
          style={{
            backgroundColor: deleteStatus === 'confirming' ? '#fecaca' : '#fee2e2',
            border: '1px solid #ef4444',
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: deleteStatus === 'deleting' ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '40px',
            minHeight: '40px',
            color: '#991b1b',
            fontWeight: '500'
          }}
        >
          {deleteStatus === 'deleting' ? (
            <span role="status" aria-label="Deleting">⏳</span>
          ) : deleteStatus === 'confirming' ? (
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

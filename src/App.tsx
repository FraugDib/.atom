import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleted(true);
    }, 2000);
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
          aria-label={isDeleted ? "Project deleted" : "Delete project"}
          onClick={handleDelete}
          disabled={isDeleting || isDeleted}
          style={{
            backgroundColor: isDeleted ? '#dcfce7' : '#fee2e2',
            border: isDeleted ? '1px solid #22c55e' : '1px solid #ef4444',
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: (isDeleting || isDeleted) ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '40px',
            minHeight: '40px',
            color: isDeleted ? '#15803d' : 'inherit',
            fontWeight: isDeleted ? 'bold' : 'normal',
            transition: 'all 0.2s ease',
            gap: '8px'
          }}
        >
          {isDeleting ? (
            <span role="status" aria-label="Deleting">⏳</span>
          ) : isDeleted ? (
            <>
              <span aria-hidden="true">✅</span>
              <span>Deleted</span>
            </>
          ) : (
            <span role="img" aria-hidden="true">🗑️</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default App;

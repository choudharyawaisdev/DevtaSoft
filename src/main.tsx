import React, { useState, useEffect, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center', fontFamily: 'sans-serif', backgroundColor: '#F8FAFC', color: '#0F172A' }}>
      <div style={{ maxWidth: '480px', backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px', color: '#0F172A' }}>DevtaSoft Web Platform</h2>
        <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px', lineHeight: '1.6' }}>
          {error?.message || 'An unexpected rendering error occurred.'}
        </p>
        <button
          onClick={resetErrorBoundary}
          style={{
            padding: '12px 28px',
            backgroundColor: '#FF6B00',
            color: '#ffffff',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '14px',
          }}
        >
          Refresh Application
        </button>
      </div>
    </div>
  );
}

function AppWithGlobalErrorHandler() {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      if (event.error) {
        setError(event.error);
      }
    };
    window.addEventListener('error', handleGlobalError);
    return () => window.removeEventListener('error', handleGlobalError);
  }, []);

  if (error) {
    return (
      <ErrorFallback
        error={error}
        resetErrorBoundary={() => {
          setError(null);
          window.location.href = '/';
        }}
      />
    );
  }

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithGlobalErrorHandler />
  </StrictMode>
);

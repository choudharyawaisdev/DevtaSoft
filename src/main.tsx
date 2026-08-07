import { Component, ErrorInfo, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyCenter: 'center', padding: '40px', textAlign: 'center', fontFamily: 'sans-serif', backgroundColor: '#F8FAFC', color: '#0F172A' }}>
          <div style={{ maxWidth: '480px', backgroundColor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px', color: '#0F172A' }}>DevtaSoft Web Platform</h2>
            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px', lineHeight: '1.6' }}>
              {this.state.error?.message || 'An unexpected rendering error occurred. Please click below to refresh.'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/';
              }}
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
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);

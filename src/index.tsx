import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { theme } from '@theme/index'
import { QueryProvider } from '@providers/QueryProvider'
import { AuthProvider } from '@contexts/AuthContext'
import ErrorBoundary from '@components/common/ErrorBoundary'
import { Toaster } from 'react-hot-toast'
import 'react-confirm-alert/src/react-confirm-alert.css'
import './i18n' // Initialize i18n

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryProvider>
          <AuthProvider>
            <App />
            {/* Toast notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  borderRadius: '8px',
                  background: '#333',
                  color: '#fff',
                  fontSize: '14px',
                },
                success: {
                  iconTheme: {
                    primary: '#4ade80',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
)

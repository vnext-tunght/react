import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { AuthProvider } from '@contexts/AuthContext'
import { theme } from '@theme/index'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  })
}

interface TestProvidersProps {
  children: React.ReactNode
}

export const TestProviders: React.FC<TestProvidersProps> = ({ children }) => {
  const queryClient = createTestQueryClient()

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </I18nextProvider>
  )
}

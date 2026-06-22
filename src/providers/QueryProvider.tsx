import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import type { ReactNode } from 'react'
import { AxiosError } from 'axios'

interface QueryProviderProps {
  children: ReactNode
}

// Create query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        const axiosError = error as AxiosError

        // Don't retry on 401/403 errors (authentication/authorization issues)
        if (
          axiosError?.response?.status === 401 ||
          axiosError?.response?.status === 403
        ) {
          return false
        }

        // Don't retry on 404 errors (not found)
        if (axiosError?.response?.status === 404) {
          return false
        }

        // Don't retry on 400 errors (bad request)
        if (axiosError?.response?.status === 400) {
          return false
        }

        // Retry up to 3 times for server errors (5xx) and network errors
        return failureCount < 3
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: (failureCount, error: unknown) => {
        const axiosError = error as AxiosError

        // Don't retry mutations on client errors (4xx)
        if (
          axiosError?.response?.status &&
          axiosError.response.status >= 400 &&
          axiosError.response.status < 500
        ) {
          return false
        }

        // Retry up to 2 times for server errors (5xx)
        return failureCount < 2
      },
      onError: (error: unknown) => {
        if (import.meta.env.DEV) {
          console.error('[MutationError]', error)
        }
      },
    },
  },
})

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Only show devtools in development */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { queryClient, QueryProvider }

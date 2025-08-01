import React from 'react'
import { Box, Typography, Button, Container } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return (
          <FallbackComponent
            error={this.state.error}
            resetError={this.handleReset}
          />
        )
      }

      return (
        <DefaultErrorFallback
          error={this.state.error}
          resetError={this.handleReset}
        />
      )
    }

    return this.props.children
  }
}

interface DefaultErrorFallbackProps {
  error?: Error
  resetError: () => void
}

const DefaultErrorFallback: React.FC<DefaultErrorFallbackProps> = ({
  error,
  resetError,
}) => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="50vh"
        textAlign="center"
        gap={3}
      >
        <ErrorOutline color="error" sx={{ fontSize: 64 }} />

        <Typography variant="h4" color="error" gutterBottom>
          Oops! Something went wrong
        </Typography>

        <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
          We're sorry, but something unexpected happened. Please try again.
        </Typography>

        {process.env.NODE_ENV === 'development' && error && (
          <Box
            sx={{
              p: 2,
              bgcolor: 'grey.100',
              borderRadius: 1,
              maxWidth: '100%',
              overflow: 'auto',
            }}
          >
            <Typography
              variant="caption"
              component="pre"
              sx={{ fontSize: '0.75rem' }}
            >
              {error.message}
              {'\n'}
              {error.stack}
            </Typography>
          </Box>
        )}

        <Box display="flex" gap={2}>
          <Button variant="contained" onClick={resetError}>
            Try Again
          </Button>
          <Button variant="outlined" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default ErrorBoundary

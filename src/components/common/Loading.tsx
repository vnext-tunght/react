import React from 'react'
import {
  Box,
  CircularProgress,
  Typography,
  Backdrop,
  LinearProgress,
  Skeleton,
} from '@mui/material'
import { styled } from '@mui/material/styles'

// Styled components
const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 1,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
}))

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
}))

// Loading Props
interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
  overlay?: boolean
  color?: 'primary' | 'secondary'
}

// Main Loading Component
export const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  text,
  overlay = false,
  color = 'primary',
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 24
      case 'large':
        return 56
      default:
        return 40
    }
  }

  const loadingContent = (
    <LoadingContainer>
      <CircularProgress size={getSize()} color={color} />
      {text && (
        <Typography variant="body2" color="textSecondary">
          {text}
        </Typography>
      )}
    </LoadingContainer>
  )

  if (overlay) {
    return <StyledBackdrop open>{loadingContent}</StyledBackdrop>
  }

  return loadingContent
}

// Full Page Loading
export const FullPageLoading: React.FC<{ text?: string }> = ({
  text = 'Loading...',
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={2}
    >
      <CircularProgress size={48} />
      <Typography variant="h6" color="textSecondary">
        {text}
      </Typography>
    </Box>
  )
}

// Linear Loading for progress
interface LinearLoadingProps {
  value?: number
  text?: string
  color?: 'primary' | 'secondary'
}

export const LinearLoading: React.FC<LinearLoadingProps> = ({
  value,
  text,
  color = 'primary',
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      {text && (
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          {text}
        </Typography>
      )}
      <LinearProgress
        variant={value !== undefined ? 'determinate' : 'indeterminate'}
        value={value}
        color={color}
      />
      {value !== undefined && (
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ mt: 0.5, display: 'block' }}
        >
          {Math.round(value)}%
        </Typography>
      )}
    </Box>
  )
}

// Card Loading Skeleton
export const CardSkeleton: React.FC<{ rows?: number }> = ({ rows = 3 }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        sx={{ mb: 2 }}
      />
      <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width="100%"
          height={16}
          sx={{ mb: 0.5 }}
        />
      ))}
    </Box>
  )
}

// Table Loading Skeleton
export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 5,
  columns = 4,
}) => {
  return (
    <Box>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <Box key={rowIndex} display="flex" gap={2} mb={1}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} variant="text" width="100%" height={40} />
          ))}
        </Box>
      ))}
    </Box>
  )
}

// Button Loading
interface ButtonLoadingProps {
  loading?: boolean
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large'
}

export const ButtonLoading: React.FC<ButtonLoadingProps> = ({
  loading = false,
  children,
  size = 'small',
}) => {
  if (!loading) return <>{children}</>

  const getSpinnerSize = () => {
    switch (size) {
      case 'small':
        return 16
      case 'large':
        return 24
      default:
        return 20
    }
  }

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <CircularProgress size={getSpinnerSize()} color="inherit" />
      {children}
    </Box>
  )
}

// Export all components
export default Loading

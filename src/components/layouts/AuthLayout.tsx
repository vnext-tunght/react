import React from 'react'
import { Box, Container, Paper } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'
import { LanguageSwitcher } from '@components/common'
import { useAuth } from '@/contexts/AuthContext'

export const AuthLayout: React.FC = () => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper elevation={3} sx={{ width: '100%', p: 4, position: 'relative' }}>
          {/* Language Switcher */}
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
            }}
          >
            <LanguageSwitcher variant="compact" size="small" />
          </Box>

          <Outlet />
        </Paper>
      </Box>
    </Container>
  )
}

export default AuthLayout

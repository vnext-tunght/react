import { Box, Button, Container, AppBar, Toolbar } from '@mui/material'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@contexts/AuthContext'
import { LanguageSwitcher } from '@components/common'

export const Layout: React.FC = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Box width="100%" height="100vh">
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>

          <LanguageSwitcher />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Outlet />
      </Container>
    </Box>
  )
}

export default Layout

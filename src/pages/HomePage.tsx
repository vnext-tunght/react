import React from 'react'
import { Box, Typography, Container } from '@mui/material'

export const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Home Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to the React Base Project. This is the home page.
        </Typography>
      </Box>
    </Container>
  )
}

export default HomePage

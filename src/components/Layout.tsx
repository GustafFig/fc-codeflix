import { Box, Container } from '@mui/material'
import React from 'react'

// Receb um children e definie uma renderização padrão de estilo

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, background: "#000" }}>
        {children}
      </Container>
    </Box>
  )
}

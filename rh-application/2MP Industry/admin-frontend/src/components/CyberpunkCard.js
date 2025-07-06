import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function CyberpunkCard({ title, value, icon, color, accent, text }) {
  return (
    <Card sx={{
      minWidth: 220,
      borderRadius: 2,
      background: '#fff',
      boxShadow: '0 2px 12px 0 rgba(30, 34, 40, 0.08)',
      color: '#1a1a1a',
      border: '1px solid #e0e7ef',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Roboto, Arial, sans-serif',
      mb: 2,
      transition: 'box-shadow 0.2s',
      '&:hover': { boxShadow: '0 4px 24px 0 rgba(30, 34, 40, 0.12)' }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {icon && <Box sx={{ mr: 1, fontSize: 32, color: '#1976d2' }}>{icon}</Box>}
          <Typography variant="h6" sx={{ letterSpacing: 1, fontWeight: 700, color: '#1a1a1a' }}>{title}</Typography>
        </Box>
        <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: 0.5, color: '#1976d2', fontSize: { xs: 28, md: 36 } }}>{value}</Typography>
      </CardContent>
    </Card>
  );
}

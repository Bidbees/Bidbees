import React from 'react';
import { Box, Typography, Paper, Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Construction as ConstructionIcon } from '@mui/icons-material';

const SupportTicketsPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Support Tickets
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
        >
          Back to Dashboard
        </Button>
      </Box>
      
      <Paper 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '300px',
          justifyContent: 'center'
        }}
      >
        <ConstructionIcon sx={{ fontSize: 80, color: 'warning.main', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Under Construction
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mb: 3 }}>
          This page will provide a comprehensive interface for managing support tickets, including assignment, prioritization, and resolution tracking.
        </Typography>
        <Alert severity="info" sx={{ maxWidth: 600 }}>
          This page is part of the Admin Dashboard implementation based on the BidBees microservices architecture plan.
        </Alert>
      </Paper>
    </Box>
  );
};

export default SupportTicketsPage;
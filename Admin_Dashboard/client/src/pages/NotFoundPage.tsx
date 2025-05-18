import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SentimentDissatisfied as SadFaceIcon } from '@mui/icons-material';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
          }}
        >
          <SadFaceIcon sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} />
          
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '5rem', fontWeight: 'bold' }}>
            404
          </Typography>
          
          <Typography variant="h4" gutterBottom>
            Page Not Found
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 450, mb: 4 }}>
            We couldn't find the page you were looking for. It might have been removed, 
            renamed, or it didn't exist in the first place.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
              Back to Dashboard
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" gutterBottom>
        404 - Page non trouvée
      </Typography>
      <Typography variant="body1" gutterBottom>
        Désolé, la page que vous recherchez n'existe pas.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/dashboard">
        Retour au tableau de bord
      </Button>
    </Container>
  );
};

export default NotFoundPage;
import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const Unauthorized = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h1" component="h1" color="error" fontWeight="bold">
        Acceso No Autorizado
      </Typography>
      <Typography variant="h6" color="textSecondary" mt={4}>
        No tienes permiso para ver esta página.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 6, px: 6, py: 3 }}
        onClick={() => window.location.href = '/signin'}
      >
        Regresar
      </Button>
    </Box>
  );
};

export default Unauthorized;
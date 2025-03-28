import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { resetResponse } from '@type/types';
import { fetchDataFromAPI } from '@util/fetchDataFromAPI';
import { useState } from 'react';
import CustomButton from './CustomButton';

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCancel = () => {
    setError('');
    setLoading(false);
    handleClose();
  }
  const handleSubmit = async () => {
    const emailInput = document.getElementById('forgot-password-email') as HTMLInputElement;
    if (!emailInput || !emailInput.value) {
      setError('Por favor, ingrese un correo válido.');
      return;
    };
    setLoading(true);
    try {
      await fetchDataFromAPI({
        url: '/auth/forgot-password',
        method: 'POST',
        data: { email: emailInput.value },
      }) as resetResponse;

      handleClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Resetear Contraseña</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <DialogContentText>
          Ingrese la dirección de correo electrónico de su cuenta y le enviaremos un enlace para restablecer su contraseña.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          error={!!error}
          helperText={error}
          id="forgot-password-email"
          name="email"
          placeholder="Correo electrónico"
          type="email"
          fullWidth
        />
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleCancel}>Cancelar</Button>
          <CustomButton variant="contained" loading={loading} text="Continuar" onClick={handleSubmit} type="submit" />
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}




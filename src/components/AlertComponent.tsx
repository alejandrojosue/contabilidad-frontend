import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

interface AlertProps {
  open: boolean;
  message: string;
  type: 'error' | 'success' | 'info' | 'warning';
  handleClose: () => void;
}

const titleMap = {
  error: 'Operación rechazada',
  success: 'Operación realizada exitosamente',
  info: 'Información',
  warning: 'Advertencia',
};

const iconMap = {
  error: <ErrorOutlineIcon color="error" sx={{ fontSize: 40 }} />,
  success: <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />,
  info: <InfoOutlinedIcon color="info" sx={{ fontSize: 40 }} />,
  warning: <WarningAmberOutlinedIcon color="warning" sx={{ fontSize: 40 }} />,
};

export default function AlertComponent({ open, message, type, handleClose }: AlertProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
          },
          sx: { backgroundImage: 'none' },
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          {iconMap[type]}<Typography style={{fontWeight: 'bold', fontSize: '1.5em'}}>{titleMap[type]}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button variant="contained" onClick={handleClose}>Aceptar</Button>
      </DialogActions>
    </Dialog>
  );
}

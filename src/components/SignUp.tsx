import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '@theme/AppTheme';
import ColorModeSelect from '@theme/ColorModeSelect';
import { SitemarkIcon } from './CustomIcons';
import { fetchDataFromAPI } from '@util/fetchDataFromAPI';
import { IconButton, InputAdornment, Link } from '@mui/material';
import { userResponse } from '@type/types';
import AlertComponent from './AlertComponent';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
  const [messageError, setMessageError] = React.useState('');
  const [messageType, setMessageType] = React.useState<"error" | "success">("error");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  }

  const handleClose = () => {
    setMessageError('');
    if (messageType === 'success') {
      setInterval(() => {
        window.location.href = '/signin';
      }, 3000);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError || confirmPasswordError || !termsAccepted) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const res = await fetchDataFromAPI({
      url: '/auth/register',
      method: 'POST',
      data: {
        username: (data.get('username') as string).trim(),
        email: (data.get('email') as string).trim(),
        password: (data.get('password') as string).trim(),
        idRol: 1
      }
    }) as userResponse;
    if (!res.error) {
      setMessageError("Se ha enviado un correo de confirmación a tu dirección de correo electrónico. Por favor, sigue las instrucciones para activar tu cuenta.");
      setMessageType("success");
    } else {
      setMessageType("error");
      setMessageError(res.error.details[0]?.msg ?? res.error.msg);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const username = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const confirmPassword = document.getElementById('confirm-password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Por favor, ingrese un correo válido.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!username.value) {
      isValid = false;
      setUsernameError(true)
      setUsernameErrorMessage('Nombre de usuario es requerido.')
    } else {
      setUsernameError(false)
      setUsernameErrorMessage('')
    }

    if (!password.value || password.value.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage('La contraseña debe tener al menos 8 caracteres.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (password.value != confirmPassword.value) {
      isValid = false;
      setConfirmPasswordErrorMessage('No match with password.')
      setConfirmPasswordError(true)
    } else {
      isValid = false;
      setConfirmPasswordErrorMessage('')
      setConfirmPasswordError(false)
    }
    return isValid;
  };

  return (
    <AppTheme {...props}>
      <AlertComponent type={messageType} message={messageError} open={!!messageError} handleClose={handleClose} />
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography component="h1" variant="h4">Registrarse</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="username">Nombre Usuario</FormLabel>
              <TextField
                helperText={usernameErrorMessage}
                error={usernameError}
                id="username"
                name="username"
                required
                fullWidth
                placeholder='Nombre de usuario'
                variant="outlined"
                autoComplete="username" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
              <TextField error={emailError} placeholder='tu@correo.com' helperText={emailErrorMessage} id="email" type="email" name="email" required fullWidth variant="outlined" />
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                fullWidth
                variant="outlined"
                autoComplete="new-password"
                placeholder='••••••'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end" sx={{ border: 'none', '&:hover': { backgroundColor: 'transparent' } }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </FormControl>


            <FormControl>
              <FormLabel htmlFor="confirm-password">Confirmar Contraseña</FormLabel>
              <TextField
                error={confirmPasswordError}
                helperText={confirmPasswordErrorMessage}
                id="confirm-password"
                type={showPasswordConfirm ? 'text' : 'password'}
                name="confirm-password"
                required
                placeholder='••••••'
                fullWidth
                variant="outlined"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordConfirmVisibility} edge="end" sx={{ border: 'none', '&:hover': { backgroundColor: 'transparent' } }}>
                        {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </FormControl>

            <FormControlLabel control={
              <Checkbox checked={termsAccepted} onChange={() => {
                setTermsAccepted(!termsAccepted)
              }} />
            } label="I accept the terms and conditions" />
            <Button type="submit" fullWidth variant="contained" onClick={validateInputs} disabled={!termsAccepted}>Registrarse</Button>
            <Typography sx={{ textAlign: 'center' }}>
              ¿Tienes una cuenta?{' '}
              <Link
                href="/signin"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Iniciar sesión
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}

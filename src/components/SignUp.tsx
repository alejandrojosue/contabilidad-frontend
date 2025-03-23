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
import { setCookie } from '@util/cookies';
import { Link } from '@mui/material';
import { userResponse } from '@type/types';

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
        username: data.get('username'),
        email: data.get('email'),
        password: data.get('password'),
        idRol: 1
      }
    }) as userResponse;
    if (!res.error) {
      setCookie('email', res.email);
      setCookie('token', res.jwt);
      setCookie('idUser', res.id.toString());
      setCookie('username', res.username);
      location.href = '/dashboard';
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
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!username.value) {
      isValid = false;
      setUsernameError(true)
      setUsernameErrorMessage('Username is required.')
    }else{
      setUsernameError(false)
      setUsernameErrorMessage('')
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
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
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography component="h1" variant="h4">Sign up</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                helperText={usernameErrorMessage}
                error={usernameError}
                id="username"
                name="username" 
                required 
                fullWidth 
                variant="outlined" 
                autoComplete="username" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField error={emailError} helperText={emailErrorMessage} id="email" type="email" name="email" required fullWidth variant="outlined" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                id="password"
                type="password"
                name="password"
                required
                fullWidth
                variant="outlined"
                autoComplete="new-password"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
              <TextField
                error={confirmPasswordError}
                helperText={confirmPasswordErrorMessage}
                id="confirm-password"
                type="password"
                name="confirm-password"
                required
                fullWidth
                variant="outlined"
                autoComplete="new-password"
              />
            </FormControl>

            <FormControlLabel control={
              <Checkbox checked={termsAccepted} onChange={() =>{
                setTermsAccepted(!termsAccepted)
              }} />
              } label="I accept the terms and conditions" />
            <Button type="submit" fullWidth variant="contained" onClick={validateInputs} disabled={!termsAccepted}>Sign up</Button>
            <Typography sx={{ textAlign: 'center' }}>
              Have an account?{' '}
              <Link
                href="/signin"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}

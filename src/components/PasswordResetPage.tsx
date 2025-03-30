import { useEffect, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import AppTheme from "@theme/AppTheme";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from "@mui/material/styles";
import { Button, CssBaseline, Typography, Stack, TextField, InputAdornment, IconButton, Box } from "@mui/material";
import MuiCard from "@mui/material/Card";
import { ErrorOutline, LockReset, Visibility, VisibilityOff } from "@mui/icons-material";
import { SitemarkIcon } from "@common/CustomIcons";
import ColorModeSelect from "@theme/ColorModeSelect";
import CustomButton from "@common/CustomButton";
import AlertComponent from "@common/AlertComponent";

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

const ResetContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  }, '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function ResetPasswordPage({ token, disableCustomTheme }: { token: string, disableCustomTheme?: boolean }) {
  const { verifyTokenResetPassword, recoveryPass, message, status, email } = useAuth();
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) verifyTokenResetPassword({ token });
  }, [token]);

  const validateInputs = () => {
    const password = document.getElementById('password') as HTMLInputElement;
    const confirmPassword = document.getElementById('confirm-password') as HTMLInputElement;

    let isValid = true;


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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = (data.get('password') as string).trim();
    if (passwordError || confirmPasswordError) {
      return;
    }
    await recoveryPass({ password, email });
  };

  const handleClose = () => location.href = '/signin';

  return (
    <AppTheme disableCustomTheme={disableCustomTheme}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <AlertComponent open={!!message && status === "success"} message={message} type="success" handleClose={handleClose} />
      <ResetContainer>
        <Card variant="outlined">
          {status === "loading" ? (
            <Typography variant="h4">Validando token...</Typography>
          ) : status === "error" ? (
            <>
              <ErrorOutline color="error" sx={{ fontSize: 60 }} />
              <Typography variant="h4">Error al Restablecer Contraseña</Typography>
              <Typography variant="body1">{message}</Typography>
              <Button variant="contained" onClick={() => window.close()} fullWidth>
                Salir
              </Button>
            </>
          ) : (
            <>
              <SitemarkIcon />
              <Typography component="h1" variant="h4">Restablecer contraseña</Typography>
              <Typography component="h1">Correo: {email}</Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
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
                    type={showPassword ? 'text' : 'password'}
                    name="confirm-password"
                    required
                    placeholder='••••••'
                    fullWidth
                    variant="outlined"
                    autoComplete="new-password"
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
                <CustomButton type="submit" fullWidth variant="contained" onClick={validateInputs} text="Confirmar" loading={false} />
              </Box>
            </>
          )}
        </Card>
      </ResetContainer>
    </AppTheme>
  );
}

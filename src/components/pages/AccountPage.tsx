import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, TextField, Typography, Grid, FormControl, CssBaseline, FormLabel, InputAdornment, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import AppTheme from "@theme/AppTheme";
import { useState } from "react";
import CustomSelect from '@common/CustomSelect';
import TranslateIcon from '@mui/icons-material/Translate';
import { getCookie } from "@util/cookies";
import ColorModeSelect from "@theme/ColorModeSelect";

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  padding: theme.spacing(2),
}));

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: theme.spacing(2),
}));

const Avatar = styled("img")({
  width: 80,
  height: 80,
  borderRadius: "50%",
  objectFit: "cover",
});

export default function AccountPage() {
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [newPassordError, setNewPassordError] = useState(false);
  const [newPassordErrorMessage, setNewPassordErrorMessage] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
  const [language, setLanguage] = useState('es');

  const [formValues, setFormValues] = useState({
    nombre: '',
    apellido: '',
    email: getCookie("email") || '',
    username: getCookie("username") || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    language: 'es',
  });

  const [initialValues] = useState(formValues);
  // @ts-ignore
  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const hasChanges = JSON.stringify(formValues) !== JSON.stringify(initialValues);

  !getCookie("email") ? window.location.href = "/signin" : null

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Container>
        {/* Header */}
        <ProfileHeader>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/900px-Cat03.jpg" alt="User Avatar" />
            <Box>
              <Typography variant="h6">Mi perfil</Typography>
              <Typography variant="body2">Gestiona la información de tu cuenta y el avatar</Typography>
            </Box>
          </Box>
          <Button variant="contained" disabled={!hasChanges}>Guardar</Button>
        </ProfileHeader>

        {/* Perfil */}
        <Section>
          <Typography variant="h6" gutterBottom>
            Perfil
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="nombre">Nombre</FormLabel>
                <TextField
                  // error={nombreError}
                  // helperText={nombreErrorMessage}
                  id="nombre"
                  name="nombre"
                  variant="outlined"
                  placeholder="John"
                  fullWidth
                  value={formValues.nombre}
                  sx={{ cursor: 'pointer' }}
                  onChange={handleChange('nombre')}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="apellido">Apellido</FormLabel>
                <TextField
                  // error={apellidoError}
                  // helperText={apellidoErrorMessage}
                  id="apellido"
                  name="apellido"
                  required
                  placeholder="White"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange('apellido')}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
                <TextField
                  // error={emailError}
                  // helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  required
                  variant="outlined"
                  fullWidth
                  defaultValue={getCookie("email")}
                  onChange={handleChange('email')}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="username">Nombre Usuario</FormLabel>
                <TextField
                  defaultValue={getCookie("username")}
                  id="username"
                  name="username"
                  required
                  variant="outlined"
                  fullWidth
                  onChange={handleChange('username')}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Section>


        {/* Cambiar Contraseña */}
        <Section>
          <Typography variant="h6" gutterBottom>
            Cambiar Contraseña
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel htmlFor="current-password">Contraseña Actual</FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  id="current-password"
                  type={showPassword ? "text" : "password"}
                  name="current-password"
                  required
                  placeholder="••••••"
                  fullWidth
                  variant="outlined"
                  onChange={handleChange('currentPassword')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          sx={{ border: "none", "&:hover": { backgroundColor: "transparent" } }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel htmlFor="new-password">Nueva Contraseña</FormLabel>
                <TextField
                  error={newPassordError}
                  helperText={newPassordErrorMessage}
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  name="new-password"
                  required
                  placeholder="••••••"
                  fullWidth
                  variant="outlined"
                  autoComplete="new-password"
                  onChange={handleChange('newPassword')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          sx={{ border: "none", "&:hover": { backgroundColor: "transparent" } }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <FormLabel htmlFor="confirm-password">Confirmar Contraseña</FormLabel>
                <TextField
                  error={confirmPasswordError}
                  helperText={confirmPasswordErrorMessage}
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  name="confirm-password"
                  required
                  placeholder="••••••"
                  fullWidth
                  variant="outlined"
                  autoComplete="new-password"
                  onChange={handleChange('confirmPassword')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          sx={{ border: "none", "&:hover": { backgroundColor: "transparent" } }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Section>

        {/* Experiencia de Usuario */}
        <Section>
          <Typography variant="h6" gutterBottom>Experiencia de Usuario</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Tema</FormLabel>
                <ColorModeSelect fullWidth />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomSelect
                label="Idioma"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                options={[
                  { value: 'es', label: 'Español', icon: <TranslateIcon fontSize="small" /> },
                  { value: 'en', label: 'Inglés', icon: <TranslateIcon fontSize="small" /> },
                ]}
              />
            </Grid>
          </Grid>
        </Section>
      </Container>
    </AppTheme>
  );
}

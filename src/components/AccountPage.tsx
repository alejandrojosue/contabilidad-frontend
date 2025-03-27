import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, TextField, Typography, Grid, MenuItem, Select, FormControl, InputLabel, CssBaseline, FormLabel, InputAdornment, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import AppTheme from "@theme/AppTheme";
import { useState } from "react";
import CustomSelect from './CustomSelect';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import TranslateIcon from '@mui/icons-material/Translate';

const Container = styled(Box)(({ theme }) => ({
 width: "100%",
 display: "flex",
 flexDirection: "column",
 gap: theme.spacing(4),
 padding: theme.spacing(4),
}));

const Section = styled(Box)(({ theme }) => ({
 padding: theme.spacing(4),
 borderRadius: theme.shape.borderRadius,
 boxShadow:
  'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
 ...theme.applyStyles('dark', {
  boxShadow:
   'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
 }),
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
 display: "flex",
 alignItems: "center",
 justifyContent: "space-between",
 width: "100%",
 padding: theme.spacing(4),
 borderRadius: theme.shape.borderRadius,
 boxShadow:
  'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
 ...theme.applyStyles('dark', {
  boxShadow:
   'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
 }),
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
 const [theme, setTheme] = useState('light');
 const [language, setLanguage] = useState('es');

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
     <Button variant="contained">Guardar</Button>
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
         required
         variant="outlined"
         fullWidth
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
         variant="outlined"
         fullWidth
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
        />
       </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
       <FormControl fullWidth>
        <FormLabel htmlFor="username">Nombre Usuario</FormLabel>
        <TextField
         // error={usernameError}
         // helperText={usernameErrorMessage}
         id="username"
         name="username"
         required
         variant="outlined"
         fullWidth
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
         fullWidth
         variant="outlined"
         autoComplete="current-password"
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
         fullWidth
         variant="outlined"
         autoComplete="new-password"
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
         fullWidth
         variant="outlined"
         autoComplete="new-password"
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
       <CustomSelect
        label="Tema"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        options={[
         { value: 'light', label: 'Claro', icon: <Brightness4Icon fontSize="small" /> },
         { value: 'dark', label: 'Oscuro', icon: <Brightness4Icon fontSize="small" /> },
        ]}
       />
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

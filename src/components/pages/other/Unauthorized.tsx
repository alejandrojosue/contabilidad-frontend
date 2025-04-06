import ColorModeSelect from '@theme/ColorModeSelect';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '@theme/AppTheme';
import { SitemarkIcon } from '@common/CustomIcons';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const NotFoundContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.up('lg')]: {
   minHeight: '100vh',
  },
  [theme.breakpoints.up('sm')]: {
   padding: theme.spacing(4),
  },
}));

export default function UnauthorizedPage() {

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <NotFoundContainer>
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography variant="h4">403 - No tiene permiso para acceder a este recurso</Typography>
          <Typography variant="body1">
          No tienes los permisos necesarios para ver esta página. Si crees que esto es un error, por favor contacta al administrador del sistema.
          </Typography>
          <Button variant="contained" onClick={() => location.href = '/dashboard'}>Regresar</Button>
        </Card>
      </NotFoundContainer>
    </AppTheme>
  );
}

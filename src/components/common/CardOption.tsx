import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '@theme/AppTheme';

interface CardProps {
  title: string,
  link: string,
  children: React.ReactNode
}

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

export default function CardOption(props: CardProps) {

  return (
    <AppTheme>
      <Card variant="outlined">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, transform: 'scale(1.5)' }}>
          {props.children}
        </div>
        <Button variant="contained" onClick={() => window.location.href = props.link}>{props.title}</Button>
      </Card>
    </AppTheme>
  );
}

import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StatCard, { StatCardProps } from '@components/StatCard';
import AppTheme from '@theme/AppTheme';
import { Divider } from '@mui/material';
import PageViewsBarChart from '@components/PageViewsBarChart';

const data: StatCardProps[] = [
 {
  title: 'Sucursal 1',
  interval: 'Últimos 30 días',
  data: [
   200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
   360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
  ],
 },
 {
  title: 'Sucursal 2',
  interval: 'Últimos 30 días',
  data: [
   1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
   780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
  ],
 },
 {
  title: 'Sucursal 3',
  interval: 'Últimos 30 días',
  data: [
   500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
   520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
  ],
 },
 {
  title: 'Sucursal 4',
  interval: 'Últimos 30 días',
  data: [
   150, 180, 160, 170, 190, 200, 220, 240, 210, 200, 220, 260, 280, 300, 320,
   350, 330, 310, 290, 270, 250, 240, 260, 280, 300, 320, 340, 360, 380, 400,
  ],
 },
 {
  title: 'Sucursal 5',
  interval: 'Últimos 30 días',
  data: [
   900, 860, 820, 780, 740, 700, 660, 620, 580, 540, 500, 460, 420, 380, 340,
   300, 280, 260, 240, 220, 200, 180, 160, 140, 120, 100, 80, 60, 40, 20,
  ],
 },

 {
  title: 'Sucursal 6',
  interval: 'Últimos 30 días',
  data: [
   500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
   520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
  ],
 },
];


export default function MainGrid(props: { disableCustomTheme?: boolean }) {
 return (
  <AppTheme {...props}>
   <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
    <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
     {document.title}
    </Typography>
    <Divider sx={{ my: 3 }} />
    <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
     Reporte de ventas por sucursal
    </Typography>
    <Grid
     container
     spacing={2}
     columns={12}
     sx={{ mb: (theme) => theme.spacing(2) }}
    >
     {data.map((card, index) => (
      <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
       <StatCard {...card} />
      </Grid>
     ))}
    </Grid>
    <Divider sx={{ my: 3 }} />
    <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
     Comparacion de ventas por sucursal
    </Typography>
    <Grid
     container
     spacing={2}
     columns={12}
     sx={{ mb: (theme) => theme.spacing(2) }}
    >
     <PageViewsBarChart />
    </Grid>
   </Box>
  </AppTheme>
 );
}
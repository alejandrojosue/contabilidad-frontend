import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChartUserByCountry from '@components/ChartUserByCountry';
import CustomizedTreeView from '@common/CustomizedTreeView';
import CustomizedDataGrid from '@common/CustomizedDataGrid';
import HighlightedCard from '@components/HighlightedCard';
import PageViewsBarChart from '@components/PageViewsBarChart';
import SessionsChart from '@components/SessionsChart';
import StatCard, { StatCardProps } from '@components/StatCard';
import AppTheme from '@theme/AppTheme';

const data: StatCardProps[] = [
  {
    title: 'Ventas',
    interval: 'Last 30 days',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'Gastos',
    interval: 'Last 30 days',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
      780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
    ],
  },
  {
    title: 'Compras',
    interval: 'Last 30 days',
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
        {/* cards */}
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          {document.title}
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
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <HighlightedCard />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SessionsChart />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <PageViewsBarChart />
          </Grid>
        </Grid>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Detalles
        </Typography>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, lg: 9 }}>
            <CustomizedDataGrid />
          </Grid>
          <Grid size={{ xs: 12, lg: 3 }}>
            <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
              <CustomizedTreeView />
              <ChartUserByCountry />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </AppTheme>
  );
}
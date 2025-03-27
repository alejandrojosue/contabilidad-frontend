import Grid from "@mui/material/Grid";
import AppTheme from "@theme/AppTheme";
import CardOption from "./CardOption";
import Apartment from "@mui/icons-material/Apartment";
import Store from "@mui/icons-material/Store";
import AnalyticsRounded from "@mui/icons-material/AnalyticsRounded";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

interface CardProps {
  title: string;
  description: string;
  link: string;
  icon: string;
}

interface MenuCardOptionProps {
  data: CardProps[];
}

const Icons = {
  addBusinessIcon: <AddBusinessIcon fontSize="large" />,
  apartment: <Apartment fontSize="large" />,
  store: <Store fontSize="large" />,
  analyticsRounded: <AnalyticsRounded fontSize="large" />,
};

export default function MenuCardOption({ data }: MenuCardOptionProps) {
  return (
    <AppTheme>
      <Grid
        container
        spacing={3}
        justifyContent="flex-start"
        sx={{ width: "100%", maxWidth: "1200px", margin: "auto", padding: 0 }}
      >
        {data.map((item, index) => (
          <Grid key={index} padding={1} xs={12} sm={6} md={4} lg={3}>
            <CardOption title={item.title} link={item.link}>
              {/* @ts-ignore */}
              {Icons[item.icon]}
            </CardOption>
          </Grid>
        ))}
      </Grid>
    </AppTheme>
  );
}

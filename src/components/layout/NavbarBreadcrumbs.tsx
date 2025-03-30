import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { setCookie } from '@util/cookies';
import config from '@constants/config.json';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    //@ts-ignore
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs() {
  const fullPath = location.pathname
  const paths = fullPath.slice(1).split('/');

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }} onClick={() => { setCookie('item-selected-menu', `/dashboard`); location.href = '/dashboard' }}>Dashboard</Typography>
      {
        paths.map((item, index, array) => {
          if (!item || item === 'dashboard') return null;

          // Buscar si el item es un menú principal
          const pageKey = Object.keys(config.pages).find((key) => key === item);
          const menuLabel = pageKey ? config.pages[pageKey].label : null;

          // Buscar si el item es una opción dentro de un menú
          const parentPage = Object.keys(config.pages).find((key) =>
            config.pages[key].options.some((option) => `/${key}${option.link}` === fullPath)
          );

          const optionLabel = parentPage
            ? config.pages[parentPage].options.find((option) => `/${parentPage}${option.link}` === fullPath)?.title
            : null;

          const breadcrumbLabel = menuLabel || optionLabel || item; // Fallback al item si no se encuentra nada

          return (
            <Typography
              key={`option-menu-${index}`}
              variant="body1"
              onClick={() => {
                if (index !== array.length - 1) {
                  const fullPathX = `/${array.slice(0, index + 1).join('/')}`;
                  setCookie('item-selected-menu', fullPathX);
                  location.href = fullPathX;
                }
              }}
              sx={{
                color: index === array.length - 1 ? 'text.primary' : '',
                fontWeight: index === array.length - 1 ? 600 : 100,
                textTransform: 'capitalize',
                cursor: index === array.length - 1 ? 'default' : 'pointer',
                '&:hover': { textDecoration: index === array.length - 1 ? 'none' : 'underline' }
              }}
            >
              {breadcrumbLabel}
            </Typography>
          );
        })}

    </StyledBreadcrumbs>
  );
}

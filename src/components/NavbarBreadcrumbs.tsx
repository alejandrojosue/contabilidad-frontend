import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { setCookie } from '@util/cookies';

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
  const paths = window.location.pathname.slice(1).split('/');
  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }} onClick={() => { setCookie('item-selected-menu', `/dashboard`); location.href = '/dashboard' }}>Dashboard</Typography>
      {
        paths.map(
          (item, index, array) =>
            item && item !== 'dashboard' && <Typography
              onClick={() => {
                if (index !== array.length - 1) {
                  const fullPath = `/${array.slice(0, index + 1).join('/')}`;
                  setCookie('item-selected-menu', fullPath);
                  location.href = fullPath;
                }

              }}
              variant="body1"
              key={'option-menu-' + index}
              sx={{
                color: index === array.length - 1 ? 'text.primary' : '',
                fontWeight: index === array.length - 1 ? 600 : 100,
                textTransform: 'capitalize',
                cursor: index === array.length - 1 ? 'default' : 'pointer',
                '&:hover': { textDecoration: index === array.length - 1 ? 'none' : 'underline' }
              }}>
              {item}
            </Typography>
        )
      }

    </StyledBreadcrumbs>
  );
}

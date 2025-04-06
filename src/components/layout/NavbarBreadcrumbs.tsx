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

// export default function NavbarBreadcrumbs() {
//   const fullPath = location.pathname;
//   const paths = fullPath.slice(1).split('/');

//   // Generar ruta incremental para cada segmento
//   const breadcrumbItems = paths.map((segment, index, array) => {
//     const currentPath = '/' + array.slice(0, index + 1).join('/');
//     // Ver si es un menú principal
//     const pageKey = Object.keys(config.pages).find(key => config.pages[key].menu === '/' + segment);
//     if (pageKey) {
//       return {
//         label: config.pages[pageKey].label,
//         path: config.pages[pageKey].menu,
//         isLast: index === array.length - 1,
//       };
//     }

//     // Ver si es una opción dentro de un menú
//     const parentKey = Object.keys(config.pages).find(key =>
//       config.pages[key].options.some((opt: any) => `/${key}${opt.link}` === currentPath)
//     );

//     if (parentKey) {
//       const option = config.pages[parentKey].options.find(
//         (opt: any) => `/${parentKey}${opt.link}` === currentPath
//       );

//       if (option) {
//         return {
//           label: option.title,
//           path: currentPath,
//           isLast: index === array.length - 1,
//         };
//       }
//     }

//     // Si no es menú ni opción, usar el texto plano
//     return {
//       label: segment,
//       path: currentPath,
//       isLast: index === array.length - 1,
//     };
//   });

//   return (
//     <StyledBreadcrumbs
//       aria-label="breadcrumb"
//       separator={<NavigateNextRoundedIcon fontSize="small" />}
//     >
//       <Typography
//         variant="body1"
//         sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
//         onClick={() => {
//           setCookie('item-selected-menu', `/dashboard`);
//           location.href = '/dashboard';
//         }}
//       >
//         Dashboard
//       </Typography>

//       {breadcrumbItems.map((item, index) => (
//         <Typography
//           key={index}
//           variant="body1"
//           onClick={() => {
//             if (!item.isLast) {
//               setCookie('item-selected-menu', item.path);
//               location.href = item.path;
//             }
//           }}
//           sx={{
//             color: item.isLast ? 'text.primary' : '',
//             fontWeight: item.isLast ? 600 : 100,
//             textTransform: 'capitalize',
//             cursor: item.isLast ? 'default' : 'pointer',
//             '&:hover': { textDecoration: item.isLast ? 'none' : 'underline' },
//           }}
//         >
//           {item.label}
//         </Typography>
//       ))}
//     </StyledBreadcrumbs>
//   );
// }

export default function NavbarBreadcrumbs() {
  const fullPath = location.pathname;

  // Si estás exactamente en /dashboard, muestra solo "Dashboard"
  if (fullPath === '/dashboard') {
    return (
      <StyledBreadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextRoundedIcon fontSize="small" />}
      >
        <Typography
          variant="body1"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            cursor: 'default',
          }}
        >
          Dashboard
        </Typography>
      </StyledBreadcrumbs>
    );
  }

  const paths = fullPath.slice(1).split('/');

  const breadcrumbItems = paths.map((segment, index, array) => {
    const currentPath = '/' + array.slice(0, index + 1).join('/');

    // Ver si es un menú principal
    const pageKey = Object.keys(config.pages).find(key => config.pages[key].menu === '/' + segment);
    if (pageKey) {
      return {
        label: config.pages[pageKey].label,
        path: config.pages[pageKey].menu,
        isLast: index === array.length - 1,
      };
    }

    // Ver si es una opción dentro de un menú
    const parentKey = Object.keys(config.pages).find(key =>
      config.pages[key].options.some((opt: any) => `/${key}${opt.link}` === currentPath)
    );

    if (parentKey) {
      const option = config.pages[parentKey].options.find(
        (opt: any) => `/${parentKey}${opt.link}` === currentPath
      );

      if (option) {
        return {
          label: option.title,
          path: currentPath,
          isLast: index === array.length - 1,
        };
      }
    }

    // Si no es menú ni opción, usar el texto plano
    return {
      label: segment,
      path: currentPath,
      isLast: index === array.length - 1,
    };
  });

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography
        variant="body1"
        sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
        onClick={() => {
          setCookie('item-selected-menu', `/dashboard`);
          location.href = '/dashboard';
        }}
      >
        Dashboard
      </Typography>

      {breadcrumbItems.map((item, index) => (
        <Typography
          key={index}
          variant="body1"
          onClick={() => {
            if (!item.isLast) {
              setCookie('item-selected-menu', item.path);
              location.href = item.path;
            }
          }}
          sx={{
            color: item.isLast ? 'text.primary' : '',
            fontWeight: item.isLast ? 600 : 100,
            textTransform: 'capitalize',
            cursor: item.isLast ? 'default' : 'pointer',
            '&:hover': { textDecoration: item.isLast ? 'none' : 'underline' },
          }}
        >
          {item.label}
        </Typography>
      ))}
    </StyledBreadcrumbs>
  );
}

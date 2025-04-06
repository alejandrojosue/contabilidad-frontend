import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import StoreIcon from '@mui/icons-material/Store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { getCookie, setCookie } from '@util/cookies';

const mainListItems = [
  { text: 'Dashboard', icon: <HomeRoundedIcon />, link: '/dashboard' },
  { text: 'Analytics', icon: <AnalyticsRoundedIcon />, link: '/analitics' },
  { text: 'Clientes', icon: <PeopleRoundedIcon />, link: '/customers' },
  { text: 'Empresa', icon: <StoreIcon />, link: '/company' },
  { text: 'Tasks', icon: <AssignmentRoundedIcon />, link: '/auditing' },
  { text: 'Contabilidad', icon: <CollectionsBookmarkIcon />, link: '/contability' },
];

const secondaryListItems = [
  { text: 'Ajustes', icon: <SettingsRoundedIcon />, link: '/settings' },
  { text: 'Perfil', icon: <AccountCircleIcon />, link: '/account' },
  { text: 'About', icon: <InfoRoundedIcon />, link: '/about' },
  { text: 'Feedback', icon: <HelpRoundedIcon />, link: '/feedback' },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }} onClick={()=>setCookie('item-selected-menu', item.link)}>
            <ListItemButton selected={getCookie('item-selected-menu') === item.link} href={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }} onClick={()=>setCookie('item-selected-menu', item.link)}>
            <ListItemButton selected={getCookie('item-selected-menu') === item.link} href={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

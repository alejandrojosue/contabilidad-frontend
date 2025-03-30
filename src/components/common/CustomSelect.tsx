import * as React from 'react';
import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent, selectClasses } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  // @ts-ignore
  backgroundColor: (theme.vars || theme).palette.background.paper,
  // @ts-ignore
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

interface CustomSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string; icon?: React.ReactNode }[];
  onChange: (event: SelectChangeEvent) => void;
}

export default function CustomSelect({ label, value, options, onChange }: CustomSelectProps) {
  return (
    <FormControl fullWidth>
      <FormLabel>{label}</FormLabel>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        fullWidth
        variant="outlined"
        sx={{
          [`& .${selectClasses.select}`]: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            pl: 1,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.icon && (
              <ListItemAvatar>
                <Avatar alt={option.label}>{option.icon}</Avatar>
              </ListItemAvatar>
            )}
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

import React, { useContext } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Toolbar,
  Typography,
} from '@mui/material';
import { cyan } from '@mui/material/colors';

import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import NavbarMobile from './NavbarMobile';
import { AppContext } from 'context/AppContext';

const drawerWidth = 240;

function Navbar({ children }) {
  const { isMobile } = useContext(AppContext);

  if (isMobile) {
    return <NavbarMobile child={children} />;
  }

  const menuList = [
    { name: 'Beranda', icon: <HomeIcon /> },
    { name: 'Personnel List', icon: <GroupIcon /> },
    { name: 'Daily Attendant', icon: <EventAvailableIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#fff',
          color: '#000',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant='h5'
            noWrap
            component='div'
            sx={{ color: cyan[300], fontWeight: 'bold' }}
          >
            Gadjian
          </Typography>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Typography sx={{ marginRight: '10px' }} variant='h6'>
              Hallo,{' '}
              <span variant='body1' style={{ color: cyan[300] }}>
                Gadjian User
              </span>
            </Typography>
            <Skeleton
              variant='circular'
              width={30}
              height={30}
              animation={false}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List
            sx={{
              fontWeight: 'bold',
            }}
          >
            {menuList.map((item, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  sx={{
                    fontWeight: 700,
                    color: index === 1 ? cyan[300] : 'inherit',
                  }}
                  primary={item.name}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component='main'
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default Navbar;

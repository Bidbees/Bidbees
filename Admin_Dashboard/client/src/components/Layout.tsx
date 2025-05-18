import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  IconButton, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShieldCheck as SecurityIcon,
  SupportAgent as SupportIcon,
  AttachMoney as FinanceIcon,
  Flag as FlagIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  MenuOpen as MenuOpenIcon
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import ModuleAccessButtons from './ModuleAccessButtons';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

const menuItems = [
  { title: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { title: 'User Management', icon: <PeopleIcon />, path: '/users' },
  { title: 'System Health', icon: <SecurityIcon />, path: '/system-health' },
  { title: 'Support Tickets', icon: <SupportIcon />, path: '/support-tickets' },
  { title: 'Financial', icon: <FinanceIcon />, path: '/financial' },
  { title: 'Content Moderation', icon: <FlagIcon />, path: '/content-moderation' },
  { title: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBarStyled position="fixed" open={open} elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            BidBees Admin Dashboard
          </Typography>
          
          <IconButton color="inherit" onClick={handleNotificationOpen}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 2 }}>
              <Avatar sx={{ width: 32, height: 32 }}>
                {user?.name.charAt(0) || 'A'}
              </Avatar>
            </IconButton>
            <Typography variant="body2" sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
              {user?.name || 'Admin User'}
            </Typography>
          </Box>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
          
          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: { width: 320, maxHeight: 500 }
            }}
          >
            <MenuItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', width: '100%' }}>
                New User Registration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A new user has registered and requires approval.
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                5 minutes ago
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', width: '100%' }}>
                System Alert
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tender Service is experiencing high load.
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                20 minutes ago
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', width: '100%' }}>
                New Support Ticket
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A critical priority ticket has been opened.
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                45 minutes ago
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem sx={{ justifyContent: 'center' }}>
              <Button color="primary">View All Notifications</Button>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBarStyled>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
            <Avatar alt="BidBees Logo" src="/logo.png" sx={{ mr: 1 }} />
            <Typography variant="h6" noWrap>
              BidBees Admin
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        
        <Divider />
        
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton component="a" href={item.path}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Divider />
        
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary' }}>
            Quick Access
          </Typography>
          <ModuleAccessButtons />
        </Box>
      </Drawer>
      
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

export default Layout;
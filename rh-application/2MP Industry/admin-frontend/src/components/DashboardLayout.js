import React from 'react';
import { Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Typography, Box, IconButton, Divider, useTheme, useMediaQuery } from '@mui/material';
import { Group, RocketLaunch, AccountTree, DirectionsCar, Paid, Menu } from '@mui/icons-material';

const drawerWidth = 240;

const sections = [
  { label: 'Vue Globale', icon: <RocketLaunch />, key: 'global' },
  { label: 'Employés', icon: <Group />, key: 'employees' },
  { label: 'Missions', icon: <RocketLaunch />, key: 'missions' },
  { label: 'Transports', icon: <DirectionsCar />, key: 'transports' },
  { label: 'Autorisations', icon: <AccountTree />, key: 'exits' },
  { label: 'Décharges Argent', icon: <Paid />, key: 'decharges' },
];

export default function DashboardLayout({ section, setSection, children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <div>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={process.env.PUBLIC_URL + '/client-logo.png'} alt="Logo" style={{ height: 40, marginRight: 8 }} />
        <Typography variant="h6" fontWeight={900} sx={{ letterSpacing: 1 }}>RH Dashboard</Typography>
      </Box>
      <Divider />
      <List>
        {sections.map(({ label, icon, key }) => (
          <ListItem button selected={section === key} key={key} onClick={() => { setSection(key); if (isMobile) setMobileOpen(false); }}>
            <ListItemIcon sx={{ color: section === key ? '#1976d2' : '#555' }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f4f6f8' }}>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, background: '#fff', color: '#1a1a1a', boxShadow: '0 2px 8px #e0e7ef77' }}>
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
          )}
          <Typography variant="h6" noWrap fontWeight={700} sx={{ flexGrow: 1 }}>
            Tableau de bord RH
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {/* Sidebar drawer */}
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: '#fff',
              borderRight: '1px solid #e0e7ef',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, sm: 3 }, mt: 8, minHeight: '100vh' }}>
        {children}
      </Box>
    </Box>
  );
}

import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItemButton, ListItemText, LinearProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../utils/auth';
import { fetchCurrentUser } from '../services/auth';
import clientLogo from '../assets/LOGO 2MP SERVICES BLANC SANS SLOGAN.png';

const MainLayout = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await fetchCurrentUser();
      if (currentUser) {
        setUserRole(currentUser.role);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={clientLogo}
              alt="Logo"
              style={{ height: '40px', marginRight: '20px' }}
            />
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setSidebarOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Button color="inherit" component={Link} to="/dashboard">
              Tableau de bord
            </Button>
          </div>

          <div>
            <Button color="inherit" component={Link} to="/change-password">
              Changer MDP
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={{ width: 240, flexShrink: 0 }}
      >
        <List>
          {/* Admin Links */}
          {userRole === 1 && (
            <React.Fragment>
              <ListItemButton component={Link} to="/documents-legaux">
                <ListItemText primary="Documents" />
              </ListItemButton>
              <ListItemButton component={Link} to="/employees">
                <ListItemText primary="Employés" />
              </ListItemButton>
              <ListItemButton component={Link} to="/professions">
                <ListItemText primary="Professions" />
              </ListItemButton>
              <ListItemButton component={Link} to="/transports">
                <ListItemText primary="Transports" />
              </ListItemButton>
            </React.Fragment>
          )}

          {/* Common Links */}
          <ListItemButton component={Link} to="/mission-orders">
            <ListItemText primary="Missions" />
          </ListItemButton>
          <ListItemButton component={Link} to="/exit-authorizations">
            <ListItemText primary="Sorties" />
          </ListItemButton>
          <ListItemButton component={Link} to="/decharge-argents">
            <ListItemText primary="Décharges" />
          </ListItemButton>
        </List>
      </Drawer>

      <div style={{ padding: '20px', marginLeft: sidebarOpen ? 240 : 0 }}>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
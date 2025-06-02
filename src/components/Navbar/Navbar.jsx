import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useThemeToggle } from '../../ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../../assets/logo.jpg';
import './Navbar.css';
import { useGlobalContext } from '../../context';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated, logout } = useGlobalContext();
  const { toggleTheme, mode } = useThemeToggle();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { text: 'Home', path: '/book', icon: <HomeIcon className="mui-icon" /> },
    { text: 'About', path: '/about', icon: <InfoIcon className="mui-icon" /> },
    { text: 'Contact', path: '/contact', icon: <ContactMailIcon className="mui-icon"/> },
    { text: 'Favorites', path: '/favorites', icon: <FavoriteIcon className="mui-icon" /> },
  ];

  return (
    <>
      <AppBar position="sticky" className="mui-navbar">
        <Toolbar className="mui-toolbar">
          <Link to="/" className="mui-logo">
            <img src={logo} alt="logo" className="mui-logo-img" />
            <Typography variant="h4" className="mui-logo-text">
              BookHub
            </Typography>
          </Link>
          <div className="mui-nav-actions">
            <IconButton onClick={toggleTheme} color="inherit">
  {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
</IconButton>

            {isAuthenticated ? (
              <Button
                className="mui-nav-btn"
                component={Link}
                to="/login"
                onClick={logout}
                startIcon={<LoginIcon className="mui-icon" />}
              >
                Logout
              </Button>
            ) : (
              <Button
                className="mui-nav-btn"
                component={Link}
                to="/login"
                startIcon={<LoginIcon className="mui-logo-text" />}
              >
                Login
              </Button>
            )}
            <IconButton
              edge="end"
              className="mui-menu-btn"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon className="mui-icon" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List className="mui-drawer-list">
          {navItems.map((item, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={item.path}
              onClick={toggleDrawer(false)}
              className="mui-drawer-item"
            >
              <span className="mui-drawer-icon">{item.icon}</span>
              <ListItemText
                primary={
                  <Typography variant="h5" className="mui-drawer-text">
                    {item.text}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;

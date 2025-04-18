"use client"
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Menu, 
  MenuItem, 
  Badge,
  useMediaQuery,
  useTheme,
  Container
} from '@mui/material';
import { 
  ShoppingCart as CartIcon, 
  Menu as MenuIcon,
  Games as GamesIcon
} from '@mui/icons-material';
import Link from 'next/link';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <GamesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'primary.main' }} />
          
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Russo One',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'text.primary',
              textDecoration: 'none',
            }}
          >
            GAME STORE
          </Typography>

          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} component={Link} href="/">Home</MenuItem>
                  <MenuItem onClick={handleClose} component={Link} href="/?category=game">Games</MenuItem>
                  <MenuItem onClick={handleClose} component={Link} href="/?category=hardware">Hardware</MenuItem>
                  <MenuItem onClick={handleClose} component={Link} href="/?category=merchandise">Merchandise</MenuItem>
                </Menu>
              </Box>
              
              <GamesIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'primary.main' }} />
              <Typography
                variant="h5"
                noWrap
                component={Link}
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'Russo One',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                GAME STORE
              </Typography>
            </>
          ) : (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button component={Link} href="/" sx={{ my: 2, color: 'text.primary', display: 'block' }}>
                Home
              </Button>
              <Button component={Link} href="/?category=game" sx={{ my: 2, color: 'text.primary', display: 'block' }}>
                Games
              </Button>
              <Button component={Link} href="/?category=hardware" sx={{ my: 2, color: 'text.primary', display: 'block' }}>
                Hardware
              </Button>
              <Button component={Link} href="/?category=merchandise" sx={{ my: 2, color: 'text.primary', display: 'block' }}>
                Merchandise
              </Button>
            </Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            <IconButton component={Link} href="/cart" color="inherit">
              <Badge badgeContent={0} color="primary">
                <CartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
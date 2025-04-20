"use client"
import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Badge,
  useMediaQuery,
  useTheme,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { 
  ShoppingCart as CartIcon, 
  Menu as MenuIcon,
  SportsEsports as GamesIcon,
  Hardware as HardwareIcon,
  Redeem as MerchandiseIcon,
  Home as HomeIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(11, 17, 32, 0.85)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const LogoIcon = styled(GamesIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '2rem',
  filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Russo One, sans-serif',
  fontWeight: 700,
  letterSpacing: '1px',
  color: theme.palette.text.primary,
  textDecoration: 'none',
  background: 'linear-gradient(90deg, #8B5CF6, #C4B5FD)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
}));

const NavButton = styled(Button)(({ theme, active }: { theme: any, active: boolean }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1, 2),
  fontWeight: 600,
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  textTransform: 'none',
  fontSize: '1rem',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: active ? '100%' : '0%',
    height: '3px',
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease',
    borderRadius: '10px',
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    '&::after': {
      width: '100%',
    },
  },
}));

const CartButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.text.primary,
  borderRadius: '50%',
  padding: theme.spacing(1.2),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    transform: 'scale(1.05)',
  },
}));

const CartBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 'bold',
    boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 3),
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

const DrawerList = styled(List)(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

const DrawerListItem = styled(ListItem)<{ active?: boolean }>(({ theme, active }) => ({
  padding: 0,
  marginBottom: theme.spacing(1),
  '& .MuiListItemButton-root': {
    padding: theme.spacing(1.5, 3),
    borderRadius: '8px',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.05),
    },
  },
  '& .MuiListItemIcon-root': {
    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  },
  '& .MuiListItemText-primary': {
    fontWeight: active ? 600 : 500,
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
  },
}));

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/' && !searchParams.get('category');
    }
    // For category URLs
    if (path.includes('category=')) {
      const category = path.split('=')[1];
      return searchParams.get('category') === category;
    }
    return false;
  };
  
  const handleNavigation = (path: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    router.push(path);
    if (mobileOpen) {
      setMobileOpen(false); // Close drawer if open
    }
  };
  
  const drawer = (
    <>
      <DrawerHeader>
        <LogoContainer>
          <LogoIcon />
          <LogoText variant="h6">GAME STORE</LogoText>
        </LogoContainer>
        <IconButton onClick={handleDrawerToggle} edge="end">
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <DrawerList>
        <DrawerListItem active={isActive('/')}>
          <ListItemButton onClick={(e) => handleNavigation('/', e)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </DrawerListItem>
        <DrawerListItem active={isActive('/?category=game')}>
          <ListItemButton onClick={(e) => handleNavigation('/?category=game', e)}>
            <ListItemIcon>
              <GamesIcon />
            </ListItemIcon>
            <ListItemText primary="Games" />
          </ListItemButton>
        </DrawerListItem>
        <DrawerListItem active={isActive('/?category=hardware')}>
          <ListItemButton onClick={(e) => handleNavigation('/?category=hardware', e)}>
            <ListItemIcon>
              <HardwareIcon />
            </ListItemIcon>
            <ListItemText primary="Hardware" />
          </ListItemButton>
        </DrawerListItem>
        <DrawerListItem active={isActive('/?category=merchandise')}>
          <ListItemButton onClick={(e) => handleNavigation('/?category=merchandise', e)}>
            <ListItemIcon>
              <MerchandiseIcon />
            </ListItemIcon>
            <ListItemText primary="Merchandise" />
          </ListItemButton>
        </DrawerListItem>
      </DrawerList>
    </>
  );

  return (
    <StyledAppBar 
      position="sticky" 
      elevation={scrolled ? 4 : 0}
      sx={{
        py: scrolled ? 0.5 : 1,
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleDrawerToggle}
              color="inherit"
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          {/* Logo */}
          <LogoContainer>
            <LogoIcon />
            <LogoText
              variant="h6"
              noWrap
              component="a"
              href="/"
              onClick={(e) => handleNavigation('/', e)}
              sx={{
                display: { xs: 'flex' },
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                cursor: 'pointer'
              }}
            >
              GAME STORE
            </LogoText>
          </LogoContainer>

          {/* Desktop Navigation Links */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <NavButton 
                active={isActive('/')} 
                onClick={(e) => handleNavigation('/', e)}
              >
                Home
              </NavButton>
              <NavButton 
                active={isActive('/?category=game')} 
                onClick={(e) => handleNavigation('/?category=game', e)}
              >
                Games
              </NavButton>
              <NavButton 
                active={isActive('/?category=hardware')} 
                onClick={(e) => handleNavigation('/?category=hardware', e)}
              >
                Hardware
              </NavButton>
              <NavButton 
                active={isActive('/?category=merchandise')} 
                onClick={(e) => handleNavigation('/?category=merchandise', e)}
              >
                Merchandise
              </NavButton>
            </Box>
          )}

          {/* Shopping Cart */}
          <Box sx={{ flexGrow: isMobile ? 1 : 0, display: 'flex', justifyContent: 'flex-end' }}>
            <CartButton
              aria-label="shopping cart"
              onClick={(e) => handleNavigation('/cart', e)}
              color="inherit"
              disabled
            >
              <CartBadge badgeContent={0} color="primary">
                <CartIcon />
              </CartBadge>
            </CartButton>
          </Box>
        </Toolbar>
      </Container>
      
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            width: 280,
            backgroundColor: 'rgba(11, 17, 32, 0.98)',
            backgroundImage: 'linear-gradient(135deg, #0B1120 0%, #1A2236 100%)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </StyledAppBar>
  );
}
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B5CF6',
      light: '#A78BFA',
      dark: '#7C3AED',
    },
    secondary: {
      main: '#4F46E5',
      light: '#6366F1',
      dark: '#4338CA',
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F43F5E',
    },
    success: {
      main: '#10B981',
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#CBD5E1',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      fontFamily: '"Russo One", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.5px',
    },
    h2: {
      fontFamily: '"Russo One", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.5px',
    },
    h3: {
      fontFamily: '"Russo One", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.5px',
    },
    h4: {
      fontFamily: '"Russo One", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.5px',
    },
    h5: {
      fontFamily: '"Russo One", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.5px',
    },
    h6: {
      fontFamily: '"Russo One", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.5px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundColor: '#1E293B',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
            borderColor: '#8B5CF6',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
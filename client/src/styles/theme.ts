// src/styles/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B5CF6', // Vibrant purple
      light: '#A78BFA',
      dark: '#7C3AED',
    },
    secondary: {
      main: '#4F46E5', // Deep blue
      light: '#6366F1',
      dark: '#4338CA',
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F43F5E', // Bright pink/red
    },
    success: {
      main: '#10B981', // Green
    },
    background: {
      default: '#0B1120', // Darker background
      paper: '#1A2236', // Richer card background
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
    button: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #0B1120 0%, #151F33 100%)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '0.4em',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0,0,0,0.1)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(139, 92, 246, 0.5)',
            borderRadius: 8,
            '&:hover': {
              backgroundColor: 'rgba(139, 92, 246, 0.8)',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          position: 'relative',
          overflow: 'hidden',
        },
        contained: {
          boxShadow: '0 0 10px rgba(139, 92, 246, 0.2)',
          '&:hover': {
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #7C3AED 0%, #8B5CF6 100%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #8B5CF6 0%, #9F7AFA 100%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          backgroundColor: '#1A2236',
          backgroundImage: 'linear-gradient(135deg, #1E293B 0%, #1A2236 100%)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
            borderColor: 'rgba(139, 92, 246, 0.3)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        },
        elevation1: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(11, 17, 32, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 600,
        },
        filled: {
          backgroundColor: 'rgba(139, 92, 246, 0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            transition: 'all 0.2s',
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.3)',
            },
          },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: '#FFD700', // Gold color for stars
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width: 1200px)': {
            maxWidth: 1400,
          },
        },
      },
    },
  },
});
'use client';

import { createTheme } from '@mui/material/styles';

// ─── Color Palette ──────────────────────────────────────────
const colors = {
  primary: '#2563EB',
  primaryLight: '#3B82F6',
  primaryDark: '#1D4ED8',
  success: '#10B981',
  successLight: '#34D399',
  successDark: '#059669',
  warning: '#F59E0B',
  warningLight: '#FBBF24',
  warningDark: '#D97706',
  danger: '#EF4444',
  dangerLight: '#F87171',
  dangerDark: '#DC2626',
  backgroundLight: '#F8FAFC',
  backgroundDark: '#0F172A',
  surfaceLight: '#FFFFFF',
  surfaceDark: '#1E293B',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  border: '#E2E8F0',
};

// ─── Theme Configuration ────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,
      light: colors.primaryLight,
      dark: colors.primaryDark,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7C3AED',
      light: '#A78BFA',
      dark: '#5B21B6',
      contrastText: '#FFFFFF',
    },
    success: {
      main: colors.success,
      light: colors.successLight,
      dark: colors.successDark,
    },
    warning: {
      main: colors.warning,
      light: colors.warningLight,
      dark: colors.warningDark,
    },
    error: {
      main: colors.danger,
      light: colors.dangerLight,
      dark: colors.dangerDark,
    },
    background: {
      default: colors.backgroundLight,
      paper: colors.surfaceLight,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
    divider: colors.border,
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      color: colors.textSecondary,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: colors.textSecondary,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.04), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.05), 0px 2px 4px -2px rgba(0, 0, 0, 0.05)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.06), 0px 4px 6px -4px rgba(0, 0, 0, 0.05)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.06), 0px 8px 10px -6px rgba(0, 0, 0, 0.04)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
    ...Array(19).fill('0px 25px 50px -12px rgba(0, 0, 0, 0.15)'),
  ] as any,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          fontSize: '0.875rem',
          fontWeight: 600,
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(37, 99, 235, 0.3)',
            transform: 'translateY(-1px)',
          },
          '&.MuiButton-containedPrimary': {
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${colors.border}`,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.04), 0px 1px 2px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 10px 25px -5px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '0px 2px 8px rgba(37, 99, 235, 0.1)',
            },
            '&.Mui-focused': {
              boxShadow: '0px 2px 12px rgba(37, 99, 235, 0.15)',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '0.75rem',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${colors.border}`,
          padding: '16px',
        },
        head: {
          fontWeight: 700,
          color: colors.textSecondary,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 8,
          fontSize: '0.75rem',
          fontWeight: 500,
          padding: '8px 12px',
        },
      },
    },
  },
});

export default theme;
export { colors };

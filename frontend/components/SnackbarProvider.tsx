'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert, AlertColor, Slide, SlideProps } from '@mui/material';

// ─── Types ──────────────────────────────────────────────────
interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

interface SnackbarContextType {
  showSnackbar: (message: string, severity?: AlertColor) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

// ─── Context ────────────────────────────────────────────────
const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

// ─── Slide Transition ───────────────────────────────────────
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

// ─── Provider Component ─────────────────────────────────────
export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = useCallback((message: string, severity: AlertColor = 'success') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const showSuccess = useCallback((message: string) => {
    showSnackbar(message, 'success');
  }, [showSnackbar]);

  const showError = useCallback((message: string) => {
    showSnackbar(message, 'error');
  }, [showSnackbar]);

  const showWarning = useCallback((message: string) => {
    showSnackbar(message, 'warning');
  }, [showSnackbar]);

  const showInfo = useCallback((message: string) => {
    showSnackbar(message, 'info');
  }, [showSnackbar]);

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, showSuccess, showError, showWarning, showInfo }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        slots={{ transition: SlideTransition }}
        sx={{
          '& .MuiSnackbar-root': {
            borderRadius: '12px',
          },
        }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: '100%',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '0.875rem',
            boxShadow: '0px 10px 25px -5px rgba(0, 0, 0, 0.2)',
            alignItems: 'center',
            '& .MuiAlert-icon': {
              fontSize: '1.25rem',
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────
export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
}

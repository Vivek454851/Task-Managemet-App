'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import {
  WarningAmberRounded as WarningIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '@/types/task';

interface DeleteConfirmationDialogProps {
  open: boolean;
  task: Task | null;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteConfirmationDialog({
  open,
  task,
  onConfirm,
  onClose,
}: DeleteConfirmationDialogProps) {
  if (!task) return null;

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="xs"
          fullWidth
          slotProps={{
            paper: {
              component: motion.div,
              initial: { opacity: 0, scale: 0.9, y: 20 },
              animate: { opacity: 1, scale: 1, y: 0 },
              exit: { opacity: 0, scale: 0.9, y: 20 },
              transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
              sx: {
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.3)',
              },
            } as any,
          }}
        >
          {/* Header */}
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 2,
              px: 3,
              background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
              color: '#fff',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <WarningIcon sx={{ fontSize: 22 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                Delete Task
              </Typography>
            </Box>
            <IconButton
              id="close-delete-dialog"
              onClick={onClose}
              sx={{
                color: '#fff',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.15)' },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          {/* Content */}
          <DialogContent sx={{ px: 3, py: 3 }}>
            <Box sx={{ textAlign: 'center', py: 1 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 64,
                  height: 64,
                  borderRadius: '16px',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  mb: 2,
                }}
              >
                <WarningIcon sx={{ fontSize: 32, color: '#EF4444' }} />
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                Are you sure you want to delete this task?
              </Typography>
              <Box
                sx={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FEE2E2',
                  borderRadius: '10px',
                  px: 2,
                  py: 1.5,
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: '#991B1B',
                    fontSize: '0.85rem',
                  }}
                >
                  &ldquo;{task.title}&rdquo;
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{ color: '#94A3B8', fontSize: '0.75rem' }}
              >
                This action cannot be undone.
              </Typography>
            </Box>
          </DialogContent>

          {/* Actions */}
          <DialogActions
            sx={{
              px: 3,
              py: 2,
              borderTop: '1px solid #F1F5F9',
              gap: 1.5,
            }}
          >
            <Button
              id="cancel-delete-btn"
              onClick={onClose}
              variant="outlined"
              sx={{
                borderRadius: '10px',
                borderColor: '#E2E8F0',
                color: '#64748B',
                fontWeight: 600,
                px: 3,
                '&:hover': {
                  borderColor: '#CBD5E1',
                  backgroundColor: '#F8FAFC',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              id="confirm-delete-btn"
              onClick={onConfirm}
              variant="contained"
              sx={{
                borderRadius: '10px',
                fontWeight: 600,
                px: 3,
                background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #F87171 0%, #EF4444 100%)',
                },
              }}
            >
              Delete Task
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  TaskAlt as TaskIcon,
  GitHub as GitHubIcon,
  Brightness4 as ThemeIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 50%, #1a1a2e 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(20px)',
        zIndex: 1200,
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1400,
          width: '100%',
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          minHeight: { xs: 64, sm: 70 },
        }}
      >
        {/* Logo & Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', gap: 12 }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
              boxShadow: '0 4px 15px rgba(37, 99, 235, 0.35)',
            }}
          >
            <TaskIcon sx={{ color: '#fff', fontSize: 22 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2,
              }}
            >
              TaskFlow
            </Typography>
            {!isMobile && (
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(148, 163, 184, 0.7)',
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Task Management
              </Typography>
            )}
          </Box>
        </motion.div>

        <Box sx={{ flexGrow: 1 }} />

        {/* Right Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <Tooltip title="Toggle theme" arrow>
            <IconButton
              size="small"
              sx={{
                color: 'rgba(148, 163, 184, 0.8)',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ThemeIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="View on GitHub" arrow>
            <IconButton
              size="small"
              sx={{
                color: 'rgba(148, 163, 184, 0.8)',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </motion.div>
      </Toolbar>
    </AppBar>
  );
}

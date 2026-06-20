'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
  Add as AddIcon,
  InboxRounded as InboxIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  onCreateTask: () => void;
  hasFilters?: boolean;
}

export default function EmptyState({ onCreateTask, hasFilters = false }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 10,
          px: 3,
          textAlign: 'center',
        }}
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)',
              mb: 3,
              position: 'relative',
            }}
          >
            <InboxIcon
              sx={{
                fontSize: 48,
                color: '#94A3B8',
              }}
            />
            {/* Decorative dots */}
            <Box
              sx={{
                position: 'absolute',
                top: -6,
                right: -6,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                opacity: 0.4,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -4,
                left: -8,
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                opacity: 0.4,
              }}
            />
          </Box>
        </motion.div>

        {/* Text */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: '#0F172A',
            mb: 1,
            fontSize: '1.25rem',
          }}
        >
          {hasFilters ? 'No tasks match your filters' : 'No tasks yet'}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#94A3B8',
            mb: 3,
            maxWidth: 360,
            lineHeight: 1.6,
          }}
        >
          {hasFilters
            ? 'Try adjusting your search or filter criteria to find what you\'re looking for.'
            : 'Get started by creating your first task. Stay organized and boost your productivity!'}
        </Typography>

        {/* CTA */}
        {!hasFilters && (
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              id="empty-state-create-btn"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onCreateTask}
              sx={{
                borderRadius: '12px',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                fontSize: '0.9rem',
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                  boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
                },
              }}
            >
              Create Your First Task
            </Button>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
}

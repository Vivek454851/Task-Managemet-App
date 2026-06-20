'use client';

import React from 'react';
import { Box, Skeleton, Grid, Paper } from '@mui/material';

/**
 * Skeleton loader for the dashboard stats cards
 */
export function StatsLoader() {
  return (
    <Grid container spacing={2.5}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Grid key={i} size={{ xs: 6, sm: 4, md: 2.4 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              p: 2.5,
              height: 140,
            }}
          >
            <Skeleton
              variant="rounded"
              width={42}
              height={42}
              sx={{ borderRadius: '12px', mb: 1.5 }}
            />
            <Skeleton variant="text" width="50%" height={36} />
            <Skeleton variant="text" width="70%" height={18} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

/**
 * Skeleton loader for the task table rows
 */
export function TableLoader() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          px: 2,
          py: 1.5,
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <Skeleton variant="text" width="25%" height={20} />
        <Skeleton variant="text" width="12%" height={20} />
        <Skeleton variant="text" width="15%" height={20} />
        <Skeleton variant="text" width="15%" height={20} />
        <Skeleton variant="text" width="10%" height={20} />
      </Box>

      {/* Rows */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            px: 2,
            py: 2,
            borderBottom: '1px solid #F1F5F9',
          }}
        >
          <Box sx={{ flex: 2.5 }}>
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="60%" height={14} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="rounded" width={70} height={24} sx={{ borderRadius: '6px' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="rounded" width={85} height={24} sx={{ borderRadius: '6px' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="80%" height={18} />
          </Box>
          <Box sx={{ flex: 0.7, display: 'flex', gap: 1 }}>
            <Skeleton variant="circular" width={28} height={28} />
            <Skeleton variant="circular" width={28} height={28} />
          </Box>
        </Box>
      ))}
    </Paper>
  );
}

/**
 * Skeleton loader for mobile task cards
 */
export function CardLoader() {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              p: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Skeleton variant="rounded" width={70} height={24} sx={{ borderRadius: '6px' }} />
                <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: '6px' }} />
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Skeleton variant="circular" width={28} height={28} />
                <Skeleton variant="circular" width={28} height={28} />
              </Box>
            </Box>
            <Skeleton variant="text" width="85%" height={22} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="100%" height={16} />
            <Skeleton variant="text" width="70%" height={16} sx={{ mb: 1.5 }} />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                pt: 1.5,
                borderTop: '1px solid #F1F5F9',
              }}
            >
              <Skeleton variant="circular" width={14} height={14} />
              <Skeleton variant="text" width="40%" height={14} />
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

/**
 * Combined loader component
 */
export default function Loader({ variant = 'table' }: { variant?: 'stats' | 'table' | 'cards' }) {
  switch (variant) {
    case 'stats':
      return <StatsLoader />;
    case 'cards':
      return <CardLoader />;
    case 'table':
    default:
      return <TableLoader />;
  }
}

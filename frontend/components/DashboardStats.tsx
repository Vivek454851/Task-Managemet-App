'use client';

import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import {
  Assignment as TotalIcon,
  PendingActions as PendingIcon,
  AutorenewRounded as InProgressIcon,
  CheckCircle as CompletedIcon,
  PriorityHigh as HighPriorityIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import { DashboardStatsData } from '@/types/task';

interface StatCardConfig {
  key: keyof DashboardStatsData;
  label: string;
  icon: React.ReactNode;
  gradient: string;
  shadowColor: string;
  iconBg: string;
}

const statCards: StatCardConfig[] = [
  {
    key: 'total',
    label: 'Total Tasks',
    icon: <TotalIcon sx={{ fontSize: 24 }} />,
    gradient: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
    shadowColor: 'rgba(37, 99, 235, 0.25)',
    iconBg: 'rgba(255, 255, 255, 0.2)',
  },
  {
    key: 'pending',
    label: 'Pending',
    icon: <PendingIcon sx={{ fontSize: 24 }} />,
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
    shadowColor: 'rgba(245, 158, 11, 0.25)',
    iconBg: 'rgba(255, 255, 255, 0.2)',
  },
  {
    key: 'inProgress',
    label: 'In Progress',
    icon: <InProgressIcon sx={{ fontSize: 24 }} />,
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
    shadowColor: 'rgba(124, 58, 237, 0.25)',
    iconBg: 'rgba(255, 255, 255, 0.2)',
  },
  {
    key: 'completed',
    label: 'Completed',
    icon: <CompletedIcon sx={{ fontSize: 24 }} />,
    gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
    shadowColor: 'rgba(16, 185, 129, 0.25)',
    iconBg: 'rgba(255, 255, 255, 0.2)',
  },
  {
    key: 'highPriority',
    label: 'High Priority',
    icon: <HighPriorityIcon sx={{ fontSize: 24 }} />,
    gradient: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
    shadowColor: 'rgba(239, 68, 68, 0.25)',
    iconBg: 'rgba(255, 255, 255, 0.2)',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

interface DashboardStatsProps {
  stats: DashboardStatsData;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Grid container spacing={2.5}>
        {statCards.map((card) => (
          <Grid key={card.key} size={{ xs: 6, sm: 4, md: 2.4 }}>
            <motion.div variants={cardVariants} whileHover={{ scale: 1.04, y: -4 }}>
              <Card
                id={`stat-card-${card.key}`}
                elevation={0}
                sx={{
                  background: card.gradient,
                  color: '#fff',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: `0 8px 32px ${card.shadowColor}`,
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 16px 48px ${card.shadowColor}`,
                  },
                }}
              >
                {/* Decorative circle */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -30,
                    left: -15,
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                  }}
                />

                <CardContent sx={{ position: 'relative', p: '20px !important' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 42,
                      height: 42,
                      borderRadius: '12px',
                      background: card.iconBg,
                      mb: 1.5,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      fontSize: '1.75rem',
                      lineHeight: 1.1,
                      mb: 0.5,
                    }}
                  >
                    <AnimatedCounter value={stats[card.key]} />
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      opacity: 0.85,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {card.label}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
}

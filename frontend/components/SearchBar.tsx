'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search tasks by title or description...',
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  // Debounce the search
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  // Sync external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleClear = useCallback(() => {
    setLocalValue('');
    onChange('');
  }, [onChange]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Box sx={{ width: '100%' }}>
        <TextField
          id="search-bar"
          fullWidth
          size="small"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: localValue ? '#2563EB' : '#94A3B8',
                      fontSize: 20,
                      transition: 'color 0.2s ease',
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: localValue ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleClear}
                    sx={{
                      color: '#94A3B8',
                      '&:hover': { color: '#EF4444' },
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#fff',
              borderRadius: '12px',
              fontSize: '0.875rem',
              border: '1px solid #E2E8F0',
              transition: 'all 0.2s ease',
              '& fieldset': {
                border: 'none',
              },
              '&:hover': {
                borderColor: '#CBD5E1',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.08)',
              },
              '&.Mui-focused': {
                borderColor: '#2563EB',
                boxShadow: '0 2px 12px rgba(37, 99, 235, 0.15)',
              },
            },
          }}
        />
      </Box>
    </motion.div>
  );
}

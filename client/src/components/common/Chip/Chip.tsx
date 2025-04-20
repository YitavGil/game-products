"use client";

import React from 'react';
import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface ChipProps extends Omit<MuiChipProps, 'variant'> {
  variant?: 'filled' | 'outlined' | 'category';
}

const CategoryChip = styled(MuiChip)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.common.white,
  borderRadius: '4px',
  '&.game': {
    backgroundColor: theme.palette.primary.main,
  },
  '&.hardware': {
    backgroundColor: theme.palette.secondary.main,
  },
  '&.merchandise': {
    backgroundColor: theme.palette.warning.main,
  },
}));

export const Chip: React.FC<ChipProps> = ({
  variant = 'filled',
  size = 'small',
  label,
  color = 'primary',
  ...props
}) => {
  if (variant === 'category') {
    const categoryClass = typeof label === 'string' ? label.toLowerCase() : '';
    
    return (
      <CategoryChip
        size={size}
        label={label}
        className={categoryClass}
        color={color}
        variant="filled"
        {...props}
      />
    );
  }
  
  return (
    <MuiChip
      variant={variant === 'filled' ? 'filled' : 'outlined'}
      size={size}
      label={label}
      color={color}
      {...props}
    />
  );
};

export default Chip;
// src/components/ui/Button.tsx
import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text' | 'contained';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  loading = false,
  disabled,
  ...props
}) => {
  // Map our custom variants to MUI variants and colors
  const getMuiVariant = (): MuiButtonProps['variant'] => {
    if (variant === 'primary' || variant === 'secondary') {
      return 'contained';
    }
    return variant as MuiButtonProps['variant'];
  };

  const getMuiColor = (): MuiButtonProps['color'] => {
    if (variant === 'primary') {
      return 'primary';
    }
    if (variant === 'secondary') {
      return 'secondary';
    }
    return 'primary';
  };

  return (
    <MuiButton
      variant={getMuiVariant()}
      color={getMuiColor()}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </MuiButton>
  );
};

export default Button;
import React from 'react';
import { 
  TextField as MuiTextField, 
  InputAdornment, 
  alpha, 
  TextFieldProps as MuiTextFieldProps, 
} from '@mui/material';

export interface CustomTextFieldProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: 'outlined' | 'filled' | 'standard';
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  InputProps?: any;
  sx?: any;
}

export type TextFieldProps = CustomTextFieldProps & Omit<MuiTextFieldProps, 'variant'>;

export const TextField: React.FC<TextFieldProps> = ({
  startIcon,
  endIcon,
  variant = 'outlined',
  fullWidth = true,
  size = 'medium',
  InputProps = {},
  sx = {},
  ...props
}) => {
  const inputProps = {
    ...(startIcon && {
      startAdornment: (
        <InputAdornment position="start">
          {startIcon}
        </InputAdornment>
      ),
    }),
    ...(endIcon && {
      endAdornment: (
        <InputAdornment position="end">
          {endIcon}
        </InputAdornment>
      ),
    }),
    ...InputProps,
  };

  const styles = {
    '& .MuiOutlinedInput-root': {
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: (theme: any) => alpha(theme.palette.primary.main, 0.5),
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: (theme: any) => theme.palette.primary.main,
      },
    },
    ...sx,
  };

  return (
    <MuiTextField
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      InputProps={inputProps}
      sx={styles}
      {...props}
    />
  );
};

export default TextField;
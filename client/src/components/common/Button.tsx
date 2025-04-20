import React from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false,
  icon,
}) => {
  const baseStyles = 'rounded-lg font-medium transition-all duration-200 flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-primary hover:bg-primary-hover text-text-primary',
    secondary: 'bg-secondary hover:bg-opacity-90 text-text-primary',
    outline: 'bg-transparent border-2 border-primary text-text-primary hover:bg-primary hover:bg-opacity-10',
    danger: 'bg-error hover:bg-opacity-90 text-text-primary',
  };
  
  const sizeStyles = {
    small: 'text-sm py-1 px-3',
    medium: 'text-base py-2 px-4',
    large: 'text-lg py-3 px-6',
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const buttonClasses = twMerge(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabledStyles,
    widthStyles,
    className
  );
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
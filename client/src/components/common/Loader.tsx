import React from 'react';
import { twMerge } from 'tailwind-merge';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
  fullPage?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  color = 'primary',
  className = '',
  fullPage = false,
}) => {
  const sizeStyles = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };
  
  const colorStyles = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    white: 'border-text-primary',
  };
  
  const containerStyles = fullPage
    ? 'fixed inset-0 flex items-center justify-center bg-background-dark bg-opacity-75 z-50'
    : 'flex items-center justify-center p-4';
  
  return (
    <div className={twMerge(containerStyles, className)}>
      <div
        className={twMerge(
          'rounded-full border-t-transparent animate-spin',
          sizeStyles[size],
          colorStyles[color]
        )}
      />
    </div>
  );
};

export default Loader;
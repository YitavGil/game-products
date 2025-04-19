// src/components/ui/Badge.tsx
import React from 'react';
import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material';

export interface BadgeProps extends MuiBadgeProps {
  count?: number;
}

export const Badge: React.FC<BadgeProps> = ({
  count = 0,
  children,
  color = 'primary',
  ...props
}) => {
  // Don't show badge if count is 0
  const badgeContent = count > 0 ? count : undefined;
  
  return (
    <MuiBadge 
      badgeContent={badgeContent} 
      color={color}
      {...props}
    >
      {children}
    </MuiBadge>
  );
};

export default Badge;
import React from 'react';
import { Card as MuiCard, CardProps as MuiCardProps, CardContent, CardMedia, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface CardProps extends MuiCardProps {
  elevation?: number;
  interactive?: boolean;
  mediaHeight?: number | string;
  mediaUrl?: string;
  mediaAlt?: string;
}

const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) => prop !== 'interactive',
})<{ interactive?: boolean }>(({ theme, interactive }) => ({
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid rgba(255, 255, 255, 0.1)`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  ...(interactive && {
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
      borderColor: theme.palette.primary.main,
    },
  }),
}));

const CardComponent = ({
  children,
  elevation = 0,
  interactive = false,
  mediaHeight,
  mediaUrl,
  mediaAlt,
  ...props
}: CardProps) => {
  return (
    <StyledCard elevation={elevation} interactive={interactive} {...props}>
      {mediaUrl && (
        <CardMedia
          component="img"
          height={mediaHeight || 140}
          image={mediaUrl}
          alt={mediaAlt || 'Card image'}
        />
      )}
      {children}
    </StyledCard>
  );
};

type CardCompoundComponent = typeof CardComponent & {
  Content: typeof CardContent;
  Actions: typeof CardActions;
};

export const Card = CardComponent as CardCompoundComponent;
Card.Content = CardContent;
Card.Actions = CardActions;

export default Card;
import React from 'react';
import { Box, Container, Typography, SxProps, Theme } from '@mui/material';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  sx?: SxProps<Theme>;
  titleSx?: SxProps<Theme>;
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  maxWidth = 'xl',
  sx,
  titleSx,
}) => {
  return (
    <Box
      component="section"
      sx={{
        py: 4,
        ...sx,
      }}
    >
      <Container maxWidth={maxWidth}>
        {(title || subtitle) && (
          <Box sx={{ mb: 3, ...titleSx }}>
            {title && (
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body1" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
        {children}
      </Container>
    </Box>
  );
};

export default Section;
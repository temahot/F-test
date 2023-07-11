import React from 'react';

import { Box, CircularProgress } from '@mui/material';

import { MEASURES } from '~/styles/measures';

interface LayoutLoadingProps {
  height?: number;
}

export const LayoutLoading = ({ height }: LayoutLoadingProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: height ?? `calc(100vh - ${MEASURES.HEADER_HEIGHT}px)`,
      }}
    >
      <CircularProgress size={80} />
    </Box>
  );
};

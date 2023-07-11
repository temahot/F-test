import React from 'react';

import { AppBar, Typography } from '@mui/material';
import * as process from 'process';

import { COLORS } from '~/styles/colors';
import { MEASURES } from '~/styles/measures';

const appBarStyles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: MEASURES.HEADER_HEIGHT,
  backgroundColor: COLORS.BLACK,
  boxShadow: 'none',
  px: 1,
};

const typographyStyles = {
  fontWeight: 800,
  userSelect: 'none',
  textTransform: 'uppercase',
};

export const Header = (): JSX.Element => {
  return (
    <AppBar sx={appBarStyles}>
      <Typography variant="h4" noWrap component="div" sx={typographyStyles}>
        {process.env.NEXT_PUBLIC_APP_NAME}
      </Typography>
    </AppBar>
  );
};

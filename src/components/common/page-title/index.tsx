import React from 'react';

import { Typography } from '@mui/material';

interface PageTitleProps {
  title: string;
}

export const PageTitle = ({ title }: PageTitleProps): JSX.Element => (
  <Typography gutterBottom={true} variant={'h4'}>
    {title}
  </Typography>
);

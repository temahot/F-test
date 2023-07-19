import React, { ReactElement } from 'react';

import { Typography } from '@mui/material';

interface PageTitleProps {
  title: string;
}

export const PageTitle = ({ title }: PageTitleProps): ReactElement => (
  <Typography gutterBottom={true} variant={'h4'}>
    {title}
  </Typography>
);

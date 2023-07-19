import React, { ReactElement } from 'react';
import { type FieldError } from 'react-hook-form';

import { Typography } from '@mui/material';

interface ErrorFieldProps {
  message: FieldError['message'];
}

export const ErrorField = ({ message }: ErrorFieldProps): ReactElement => (
  <Typography
    color={'error'}
    variant={'subtitle2'}
    position={'absolute'}
    bottom={-6}
  >
    {message}
  </Typography>
);

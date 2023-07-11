import React from 'react';

import { Button as MuiButton, type ButtonProps } from '@mui/material';

interface ExpandedButtonProps extends ButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
}
export const Button = ({
  isLoading = false,
  disabled,
  ...rest
}: ExpandedButtonProps) => (
  <MuiButton {...rest} disabled={disabled ?? isLoading} />
);

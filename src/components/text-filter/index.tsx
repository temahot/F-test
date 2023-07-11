import React from 'react';

import { Search } from '@mui/icons-material';
import {
  debounce,
  FormControl,
  InputAdornment,
  type StandardTextFieldProps,
  TextField,
} from '@mui/material';

export const TextFilter = ({ onChange, ...rest }: StandardTextFieldProps) => {
  const label = rest.label;

  const handleFilterChange = debounce((e) => {
    if (onChange) onChange(e);
  }, 250);

  return (
    <FormControl sx={{ width: '100%', mb: 1 }}>
      <TextField
        fullWidth
        label={label}
        onChange={handleFilterChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

import React, { ReactElement } from 'react';
import { type Path, useController } from 'react-hook-form';
import {
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form/dist/types';

import { Box, Skeleton, TextField, type TextFieldProps } from '@mui/material';

import { ErrorField } from '~/components/common/error-field';
import getErrorMessage from '~/helpers/common/getErrorMessage';
import { insertSpacesAndLowercase } from '~/helpers/common/insertSpacesAndLowercase';

type TextInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  isNumber?: boolean;
  isLoading?: boolean;
} & TextFieldProps;

export const TextInput = <T extends FieldValues>({
  name,
  form,
  isNumber,
  isLoading,
  ...restProps
}: TextInputProps<T>): ReactElement => {
  const { field } = useController({
    name,
    control: form.control,
  });

  const error = getErrorMessage(form.formState.errors, name);

  return (
    <Box sx={{ p: 2, position: 'relative', width: '100%' }}>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width={restProps.fullWidth ? '100%' : 224}
          height={58}
        />
      ) : (
        <>
          <TextField
            label={insertSpacesAndLowercase(name)}
            value={field.value}
            onChange={field.onChange}
            onFocus={() => {
              form.clearErrors(name);
            }}
            onBlur={async (e) => {
              const value = e.target.value;
              if (isNumber && !Number(value)) {
                field.onChange(0);
                return;
              }
              field.onChange(isNumber ? Number(value) : value);
            }}
            error={!!error}
            {...restProps}
          />

          <ErrorField message={error as string} />
        </>
      )}
    </Box>
  );
};

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';

import { type Person } from '~/types/person';

const numValidation = y
  .number()
  .positive('More then one')
  .required('Please add value')
  .transform((value) => (isNaN(value) || value === undefined ? null : value));

export default function usePersonValidation() {
  const validation = y.object().shape({
    name: y.string().required(),
    height: numValidation,
    mass: numValidation,
    eye_color: y.string().required(),
    gender: y.string().required(),
    hair_color: y.string().required(),
    homeworld: y.string().required(),
    skin_color: y.string().required(),
  });

  const defaultValues = {
    eye_color: '',
    gender: '',
    hair_color: '',
    height: '',
    homeworld: '',
    mass: '',
    name: '',
    skin_color: '',
  };

  const form = useForm<Person>({
    defaultValues,
    mode: 'all',
    resolver: yupResolver(validation),
  });

  const resetPersonForm = useCallback(
    (defaultValues: Person) => {
      form.reset(defaultValues, {
        keepDefaultValues: true,
      });
    },
    [form]
  );

  return {
    form,
    defaultValues,
    resetPersonForm,
  };
}

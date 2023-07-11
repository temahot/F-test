// @ts-nocheck
const getErrorMessage = (errors: object, name: string) => {
  const keys = name.split('.');
  let error = errors;

  for (const key of keys) {
    error = error?.[key];
    if (!error) break;
  }

  return error?.message || '';
};

export default getErrorMessage;

export const insertSpacesAndLowercase = (str: string): string => {
  if (!str) {
    return '';
  }

  const result = str.replace(/([a-z])([A-Z])/g, '$1 $2').replaceAll('_', ' ');

  return (
    result.substring(0, 1).toUpperCase() + result.substring(1).toLowerCase()
  );
};

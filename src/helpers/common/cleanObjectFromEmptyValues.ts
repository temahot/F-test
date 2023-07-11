export const cleanObjectFromEmptyValues = (obj: Record<string, unknown>) => {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === '') {
      delete obj[propName];
    }
  }
  return obj;
};

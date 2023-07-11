export const cleanObjectFromEmptyValues = (obj: Record<string, unknown>) => {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === '') {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete obj[propName];
    }
  }
  return obj;
};

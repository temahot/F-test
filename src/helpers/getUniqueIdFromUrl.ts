const getUniqueIdFromUrl = (url: string) => {
  const regex = /people\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : url;
};

export default getUniqueIdFromUrl;

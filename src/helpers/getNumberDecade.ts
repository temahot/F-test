export default function getNumberDecade(number: number | string) {
  const integerPart = Math.floor(Math.abs(Number(number)));
  return Math.floor(integerPart / 10);
}

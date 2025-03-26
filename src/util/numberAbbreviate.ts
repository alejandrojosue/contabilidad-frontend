export const abbreviateNumber = (value: number): string => {
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi'];
  let suffixIndex = 0;

  while (value >= 1000 && suffixIndex < suffixes.length - 1) {
    value /= 1000;
    suffixIndex++;
  }

  return `${value.toFixed(1)}${suffixes[suffixIndex]}`;
}

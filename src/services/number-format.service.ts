export const parseAndTrimFloat = (value: string, decimalPlaces: number) =>
  +(Number.parseFloat(value) || 0).toFixed(decimalPlaces)

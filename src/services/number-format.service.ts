export const parseAndTrimFloat = (value: string, precision: number) =>
  +(Number.parseFloat(value) || 0).toFixed(precision)

export const toMaxPrecision = (value: number, maxPrecision: number) =>
  Number(value.toFixed(maxPrecision));

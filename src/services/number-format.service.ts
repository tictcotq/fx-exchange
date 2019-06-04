export const toMaxPrecision = (value: number, maxPrecision: number) =>
  Number(value.toFixed(maxPrecision));

export const parseWithPrecision = (value: string, precision: number) =>
  toMaxPrecision((Number.parseFloat(value) || 0), precision);

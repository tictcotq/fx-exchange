import RatesSnapshot from '../models/rates-snapshot';

export const convert = (
  amount: number,
  sourceCurrencyCode: string,
  targetCurrencyCode: string,
  rates: RatesSnapshot,
): number => {
  return sourceCurrencyCode === rates.base
    ? convertDirectly(amount, targetCurrencyCode, rates)
    : convertCrossCurrency(amount, sourceCurrencyCode, targetCurrencyCode, rates);
};

function convertDirectly(
  amount: number,
  targetCurrencyCode: string,
  rates: RatesSnapshot,
): number {
  const rate = rates.rates[targetCurrencyCode];
  return rate
    ? rate * amount
    : 0;
}

function convertCrossCurrency(
  amount: number,
  sourceCurrencyCode: string,
  targetCurrencyCode: string,
  rates: RatesSnapshot,
): number {
  const baseToSourceRate = rates.rates[sourceCurrencyCode];
  const targetToSourceRate = rates.rates[targetCurrencyCode];

  return baseToSourceRate && targetToSourceRate
    ? amount / baseToSourceRate * targetToSourceRate
    : 0;
};

import RatesSnapshot from '../models/rates-snapshot';
import { toMaxPrecision } from './number-format.service';

export const convert = (
  amount: number,
  sourceCurrencyCode: string,
  targetCurrencyCode: string,
  rates: RatesSnapshot,
  precision: number = 2,
): number => {
  const convertedAmount = sourceCurrencyCode === rates.base
    ? convertDirectly(amount, targetCurrencyCode, rates)
    : convertCrossCurrency(amount, sourceCurrencyCode, targetCurrencyCode, rates);

  return toMaxPrecision(convertedAmount, precision);
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

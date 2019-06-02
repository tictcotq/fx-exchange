import { useEffect, useState } from 'react';
import { fetchRates } from '../../api/rates.api';
import RatesSnapshot from '../../models/rates-snapshot';
import Wallet from '../../models/wallet';

export const useRates = (currencies: string[], refreshInterval: number) => {
  const [rates, setRates] = useState<RatesSnapshot | null>(null);

  const refreshRates = async () => {
    const data = await fetchRates(currencies);
    setRates(data);
  };

  useEffect(() => {
    refreshRates();
    const intervalId = setInterval(refreshRates, refreshInterval);
    return clearInterval.bind(null, intervalId);
  }, []);

  return rates;
}

export const useWallets = (currencies: string[]) =>
  currencies.map((currencyCode: string, index: number): Wallet => ({
    balance: index * 100, // fake data
    currencyCode,
    currencySymbol: currencyCode,
}));

export const useCurrencies = (): string[] =>
  process.env.REACT_APP_SUPPORTED_CURRENCIES
    ? process.env.REACT_APP_SUPPORTED_CURRENCIES.split(',')
    : [];

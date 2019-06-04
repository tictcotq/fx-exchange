import { useEffect, useState, useMemo } from 'react';
import { fetchRates } from '../../api/rates.api';
import { fetchWallets } from '../../api/wallets.api';
import RatesSnapshot from '../../models/rates-snapshot';
import Wallet from '../../models/wallet';

export const useRates = (currencies: string[], refreshInterval: number) => {
  const [rates, setRates] = useState<RatesSnapshot | null>(null);

  const loadRates = async () => {
    setRates(await fetchRates(currencies));
  };

  useEffect(() => {
    loadRates();
    const intervalId = setInterval(loadRates, refreshInterval);
    return clearInterval.bind(null, intervalId);
  }, []);

  return rates;
};

export const useWallets = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);

  const loadWallets = async (): Promise<void> => {
    setWallets(await fetchWallets());
  }

  useEffect(() => {
    loadWallets();
  }, []);

  return wallets;
};

export const useCurrencyCodes = (wallets: Wallet[]): string[] =>
  useMemo(() =>
    wallets.map((wallet: Wallet) => wallet.currencyCode),
    [wallets]
  );

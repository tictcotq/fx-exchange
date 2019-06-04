import { useEffect, useMemo, useReducer, useState } from 'react';
import { fetchRates } from '../../api/rates.api';
import { fetchWallets } from '../../api/wallets.api';
import RatesSnapshot from '../../models/rates-snapshot';
import Wallet from '../../models/wallet';
import { ExchangePageActions, createActionDispatcher } from './exchange-page.actions';
import { exchangeFormReducer } from './exchange-page.reducer';
import { ExchangePageState, initState } from './exchange-page.state';
import { ExchangePageSelection, select } from './exchange-page.selectors';

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

export const useExchangePage = (wallets: Wallet[], rates: RatesSnapshot | null): {
  state: ExchangePageState,
  actions: ExchangePageActions,
  selection: ExchangePageSelection,
} => {
  const [state, dispatch] = useReducer(exchangeFormReducer, { wallets }, initState);
  const actions = useMemo(() => createActionDispatcher(dispatch), []);

  useEffect(() => {
    actions.setRates(rates);
  }, [rates]);

  useEffect(() => {
    actions.setWallets(wallets);
  }, [wallets]);

  return {
    state,
    actions,
    selection: select(state),
  };
}

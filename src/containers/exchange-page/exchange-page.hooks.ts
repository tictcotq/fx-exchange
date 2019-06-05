import { useEffect, useMemo, useReducer, useState } from 'react';
import { fetchRates } from '../../api/rates.api';
import { fetchWallets } from '../../api/wallets.api';
import RatesSnapshot from '../../models/rates-snapshot';
import { createActionDispatcher, ExchangePageActions } from './exchange-page.actions';
import { exchangeFormReducer } from './exchange-page.reducer';
import { ExchangePageSelection, select } from './exchange-page.selectors';
import { ExchangePageState, initState } from './exchange-page.state';

export const useRates = (refreshInterval: number) => {
  const [rates, setRates] = useState<RatesSnapshot | null>(null);

  const loadRates = async () => {
    setRates(await fetchRates());
  };

  useEffect(() => {
    loadRates();
    const intervalId = setInterval(loadRates, refreshInterval);
    return clearInterval.bind(null, intervalId);
  }, []);

  return rates;
};

export const useExchangePage = (refreshInterval: number): {
  state: ExchangePageState,
  actions: ExchangePageActions,
  selection: ExchangePageSelection,
} => {
  const [state, dispatch] = useReducer(exchangeFormReducer, { wallets: [] }, initState);

  const actions = useMemo(
    () => createActionDispatcher(dispatch),
    []);

  const rates = useRates(refreshInterval);

  useEffect(() => {
    fetchWallets().then(actions.setWallets)
  }, []);

  useEffect(() => {
    actions.setRates(rates);
  }, [rates]);

  return {
    state,
    actions,
    selection: select(state),
  };
}

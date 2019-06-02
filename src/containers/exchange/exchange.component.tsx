import React, { useEffect, useReducer } from 'react';
import { fetchRates } from '../../api/rates.api';
import ExchangeParty from '../../components/exchange-party/exchange-party.component';
import Wallet from '../../models/wallet';
import { exchangeReducer } from './exchange.reducer';
import { initState } from './exchange.state';

export interface ExchangeProps {
  wallets: Wallet[]
}

const CURRENCIES = process.env.REACT_APP_SUPPORTED_CURRENCIES
  ? process.env.REACT_APP_SUPPORTED_CURRENCIES.split(',')
  : [];

export default ({
  wallets,
}: ExchangeProps) => {
  const [{source, target}, dispatch] = useReducer(exchangeReducer, { wallets }, initState);

  const refreshRates = async () => {
    const data = await fetchRates(CURRENCIES);
    dispatch({type: 'setRates', payload: data});
  };

  useEffect(() => {
    refreshRates();
  }, []);

  return (
    <main className="exchange">
      Exchange
      {source.wallet &&
        <ExchangeParty
          wallets={wallets}
          amount={source.amount}
          selectedCurrencyCode={source.wallet.currencyCode}
          onSelectCurrencyCode={(currencyCode: string): void => dispatch({ type: 'setSourceCurrency', payload: currencyCode})}
          onChangeAmount={(amount) => dispatch({ type: 'setSourceAmount', payload: amount })} />}
      {target.wallet &&
        <ExchangeParty
          wallets={wallets}
          amount={target.amount}
          selectedCurrencyCode={target.wallet.currencyCode}
          onSelectCurrencyCode={(currencyCode: string): void => dispatch({ type: 'setTargetCurrency', payload: currencyCode})}
          onChangeAmount={(amount) => dispatch({ type: 'setTargetAmount', payload: amount })} />}
    </main>
  );
}

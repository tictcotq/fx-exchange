import React, { useEffect, useReducer } from 'react';
import ExchangeParty from '../../components/exchange-party/exchange-party.component';
import RatesSnapshot from '../../models/rates-snapshot';
import Wallet from '../../models/wallet';
import { exchangeFormReducer } from './exchange-form.reducer';
import { initState } from './exchange-form.state';

export interface ExchangeProps {
  wallets: Wallet[],
  rates: RatesSnapshot | null,
}

export default function ExchangeForm ({
  wallets,
  rates,
}: ExchangeProps) {
  const [{source, target}, dispatch] = useReducer(exchangeFormReducer, { wallets }, initState);

  useEffect(() => {
    dispatch({type: 'setRates', payload: rates});
  }, [rates]);

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

import React from 'react';
import ExchangeForm from '../../components/exchange-form/exchange-form.component';
import { useCurrencyCodes, useExchangePage, useRates, useWallets } from './exchange-page.hooks';
import './exchange-page.component.scss';

const REFRESH_RATE = 10*1000;

export default function ExchangePage() {
  const wallets = useWallets();
  const currencyCodes = useCurrencyCodes(wallets);
  const rates = useRates(currencyCodes, REFRESH_RATE);
  const { state, actions, selection } = useExchangePage(wallets, rates);
  const { source, target } = state;

  return (
    <main className="exchange-page">
      <h1 className="page-title">Exchange</h1>
      <ExchangeForm
        wallets={wallets}
        rates={rates}
        sourceWallet={source.wallet}
        targetWallet={target.wallet}
        sourceAmount={source.amount}
        targetAmount={target.amount}
        onChangeSourceAmount={actions.setSourceAmount}
        onChangeTargetAmount={actions.setTargetAmount}
        onSelectSourceWallet={actions.setSourceWallet}
        onSelectTargetWallet={actions.setTargetWallet} />
      <button
        disabled={!selection.canExchange}
        onClick={actions.exchange}>Exchange</button>
    </main>
  );
}

import React from 'react';
import ExchangeForm from '../../components/exchange-form/exchange-form.component';
import { useExchangePage } from './exchange-page.hooks';
import './exchange-page.component.scss';

const REFRESH_RATE = 10*1000;

export default function ExchangePage() {
  const { state, actions, selection } = useExchangePage(REFRESH_RATE);
  const { source, target } = state;

  return (
    <main className="exchange-page">
      <h1 className="page-title">Exchange</h1>
      <ExchangeForm
        wallets={state.wallets}
        rates={state.rates}
        sourceWallet={source.wallet}
        targetWallet={target.wallet}
        sourceAmount={source.amount}
        targetAmount={target.amount}
        onChangeSourceAmount={actions.setSourceAmount}
        onChangeTargetAmount={actions.setTargetAmount}
        onSelectSourceWallet={actions.setSourceWallet}
        onSelectTargetWallet={actions.setTargetWallet} />

      <div className="exchange-page__actions">
        <button
          className="button button--primary"
          disabled={!selection.canExchange}
          onClick={actions.exchange}>Exchange</button>
      </div>
    </main>
  );
}

import React from 'react';
import ExchangeForm from '../../components/exchange-form/exchange-form.component';
import { useCurrencyCodes, useRates, useWallets } from './exchange-page.hooks';
import './exchange-page.component.scss';

const REFRESH_RATE = 10*1000;

export default function ExchangePage() {
  const wallets = useWallets();
  const currencyCodes = useCurrencyCodes(wallets);
  const rates = useRates(currencyCodes, REFRESH_RATE);

  return (
    <main className="exchange-page">
      <h1 className="page-title">Exchange</h1>
      <ExchangeForm wallets={wallets} rates={rates} />
    </main>
  );
}

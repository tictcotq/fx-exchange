import React from 'react';
import ExchangeForm from '../../components/exchange-form/exchange-form.component';
import { useCurrencies, useRates, useWallets } from './exchange-page.hooks';

const REFRESH_RATE = 10*1000;

export default function ExchangePage() {
  const currencies = useCurrencies();
  const rates = useRates(currencies, REFRESH_RATE);
  const wallets = useWallets(currencies);

  return (
    <main className="exchange-page">
      <ExchangeForm wallets={wallets} rates={rates} />
    </main>
  );
}

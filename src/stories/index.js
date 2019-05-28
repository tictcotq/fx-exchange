import React from 'react';
import { storiesOf } from '@storybook/react';
import ExchangeParty from '../components/exchange-party/exchange-party.component';
import Wallet from '../models/wallet';
import { action } from '@storybook/addon-actions';

const WALLETS: Wallet[] = [
  { currencyCode: 'USD', currencySymbol: '$', balance: 201.13 },
  { currencyCode: 'EUR', currencySymbol: '€', balance: 0 },
  { currencyCode: 'GBP', currencySymbol: '£', balance: 100 },
];

storiesOf('ExchangeParty', module)
  .add('default', () =>
    <ExchangeParty
      wallets={WALLETS}
      selectedCurrencyCode="GBP"
      onSelectCurrencyCode={action('onSelectCurrencyCode')} />
  );

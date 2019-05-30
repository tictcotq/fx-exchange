import React from 'react';
import { storiesOf } from '@storybook/react';
import ExchangeParty from '../components/exchange-party/exchange-party.component';
import Exchange from '../containers/exchange/exchange.component';
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
      amount={30.25}
      onSelectCurrencyCode={action('onSelectCurrencyCode')}
      onChangeAmount={action('onChangeAmount')} />
  );

storiesOf('Exchange', module)
  .add('default', () =>
    <Exchange wallets={WALLETS} />
  );

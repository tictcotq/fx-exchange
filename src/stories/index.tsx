import React from 'react';
import { storiesOf } from '@storybook/react';
import ExchangeParty from '../components/exchange-party/exchange-party.component';
import Exchange from '../components/exchange-form/exchange-form.component';
import ExchangePage from '../containers/exchange-page/exchange-page.component';
import Wallet from '../models/wallet';
import RatesSnapshot from '../models/rates-snapshot';
import { action } from '@storybook/addon-actions';
import '../index.scss';

const WALLETS: Wallet[] = [
  { currencyCode: 'USD', currencySymbol: '$', balance: 201.13 },
  { currencyCode: 'EUR', currencySymbol: '€', balance: 0 },
  { currencyCode: 'GBP', currencySymbol: '£', balance: 100 },
];

const RATES: RatesSnapshot = {
  timestamp: 1559278800,
  base: 'USD',
  rates: {
    'EUR': .25,
    'GBP': .5,
    'USD': 1
  }
};

storiesOf('ExchangeParty', module)
  .add('default', () =>
    <ExchangeParty
      wallets={WALLETS}
      selectedCurrencyCode="GBP"
      amount={30.25}
      onSelectCurrencyCode={action('onSelectCurrencyCode')}
      onChangeAmount={action('onChangeAmount')} />
  );

storiesOf('ExchangeForm', module)
  .add('default', () =>
    <Exchange wallets={WALLETS} rates={RATES} />
  );

storiesOf('ExchangePage', module)
  .add('default', () =>
    <ExchangePage />
  );

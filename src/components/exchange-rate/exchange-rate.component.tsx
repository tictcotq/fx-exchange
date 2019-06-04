import React from 'react';
import RatesSnapshot from '../../models/rates-snapshot';
import AmountDisplay from '../amount-display/amount-display.component';
import { convert } from '../../services/currency-converter.service';
import './exchange-rate.component.scss';

export interface ExchangeRateProps {
  rates: RatesSnapshot | null,
  amount?: number,
  sourceCurrencyCode?: string | null,
  sourceCurrencySymbol: string | null,
  targetCurrencyCode?: string | null,
  targetCurrencySymbol: string | null,
}

export default function ExchangeRate({
  rates,
  amount = 1,
  sourceCurrencyCode,
  sourceCurrencySymbol,
  targetCurrencySymbol,
  targetCurrencyCode,
}: ExchangeRateProps): JSX.Element {
  const targetAmount = rates && sourceCurrencyCode && targetCurrencyCode
    ? convert(amount, sourceCurrencyCode, targetCurrencyCode, rates)
    : 0;

  return (
    <div className="exchange-rate">
      <AmountDisplay
        amount={amount}
        currencySymbol={sourceCurrencySymbol} />

      &nbsp;=&nbsp;

      <AmountDisplay
        amount={targetAmount}
        currencySymbol={targetCurrencySymbol}
        precision={4} />
    </div>
  );
}

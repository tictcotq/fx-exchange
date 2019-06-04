import React from 'react';
import { toMaxPrecision } from '../../services/number-format.service';

export interface AmountInputProps {
  amount: number | null,
  currencySymbol?: string | null,
  precision?: number,
}

export default function AmountDisplay({
  amount,
  currencySymbol,
  precision = 2,
}: AmountInputProps): JSX.Element {
  const formattedAmount = amount !== null
    ? toMaxPrecision(amount, precision)
    : '';

  return (
    <span className="amount-display">
      <span className="amount-display__amount">{formattedAmount}</span>
      &nbsp;
      <span className="amount-display__currency-symbol">{currencySymbol}</span>
    </span>
  );
}

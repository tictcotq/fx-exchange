import React from 'react';

export interface AmountInputProps {
  amount?: number | null,
  currencySymbol?: string | null,
}

export default function AmountDisplay({
  amount,
  currencySymbol,
}: AmountInputProps): JSX.Element {
  return (
    <span className="amount-display">
      <span className="amount-display__amount">{amount}</span>
      &nbsp;
      <span className="amount-display__currency-symbol">{currencySymbol}</span>
    </span>
  );
}

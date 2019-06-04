import React from 'react';
import { parseWithPrecision } from '../../services/number-format.service';
import './amount-input.component.scss';

export interface AmountInputProps {
  amount?: number;
  placeholder?: string;
  precision?: number;
  onChangeAmount?: (value: number) => void;
}

export default function AmountInput({
  amount = 0,
  placeholder = '0',
  precision = 2,
  onChangeAmount,
}: AmountInputProps) {
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseWithPrecision(ev.target.value, precision);
    onChangeAmount && onChangeAmount(amount);
  }

  return (
    <div className="amount-input">
      <input
        type="number"
        value={amount || ''}
        onChange={handleChange}
        placeholder={placeholder} />
    </div>
  );
}

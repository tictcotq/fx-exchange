import React from 'react';
import Wallet from '../../models/wallet';
import { parseAndTrimFloat } from '../../services/number-format.service';

export interface ExchangePartyProps {
  wallets?: Wallet[];
  selectedCurrencyCode?: string;
  amount?: number;
  onSelectCurrencyCode?: (currencyCode: string) => void;
  onChangeAmount?: (amount: number) => void;
}

export default function ExchangeParty({
  wallets = [],
  selectedCurrencyCode = '',
  amount = 0,
  onSelectCurrencyCode,
  onChangeAmount,
}: ExchangePartyProps) {

  const handleCurrencyChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectCurrencyCode && onSelectCurrencyCode(ev.target.value);
  }

  const handleAmountChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseAndTrimFloat(ev.target.value, 2);
    onChangeAmount && onChangeAmount(amount);
  }

  const selectedWallet = wallets.find((wallet: Wallet) =>
    wallet.currencyCode === selectedCurrencyCode);

  return (
    <div className="exchange-party">
      <select value={selectedCurrencyCode} onChange={handleCurrencyChange}>
        {wallets.map((wallet: Wallet): JSX.Element =>
          <option key={wallet.currencySymbol} value={wallet.currencyCode}>
            {wallet.currencyCode}({wallet.balance})
          </option>
        )}
      </select>
      <label>Balance: {selectedWallet && selectedWallet.balance}</label>
      <input type="number" value={amount || ''} onChange={handleAmountChange} />
    </div>
  );
}

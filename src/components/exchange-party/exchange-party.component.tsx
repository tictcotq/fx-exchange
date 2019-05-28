import React from 'react';
import Wallet from '../../models/wallet';

export interface ExchangePartyProps {
  wallets?: Wallet[];
  selectedCurrencyCode?: string;
  amount?: number;
  onSelectCurrencyCode?: (currencyCode: string) => void;
  onChangeAmount?: (amount: number) => void;
}

export default ({
  wallets = [],
  selectedCurrencyCode = '',
  amount = 0,
  onSelectCurrencyCode,
  onChangeAmount,
}: ExchangePartyProps) => {

  const handleCurrencyChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectCurrencyCode && onSelectCurrencyCode(ev.target.value);
  }

  const handleAmountChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const amount = +ev.target.value;
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
      <input value={amount} onChange={handleAmountChange} />
    </div>
  );
}

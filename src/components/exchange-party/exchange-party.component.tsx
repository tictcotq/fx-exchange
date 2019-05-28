import React from 'react';
import Wallet from '../../models/wallet';

export interface ExchangePartyProps {
  wallets?: Wallet[];
  selectedCurrencyCode?: string;
  amount?: number;
  onSelectCurrencyCode?: (currencyCode: string) => void;
}

export default ({
  wallets = [],
  selectedCurrencyCode = '',
  onSelectCurrencyCode,
}: ExchangePartyProps) => {

  const handleCurrencyChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectCurrencyCode && onSelectCurrencyCode(ev.target.value);
  }

  return (
    <div className="exchange-party">
      <select value={selectedCurrencyCode} onChange={handleCurrencyChange}>
        {wallets.map((wallet: Wallet): JSX.Element =>
          <option key={wallet.currencySymbol} value={wallet.currencyCode}>
            {wallet.currencyCode}({wallet.balance})
          </option>
        )}
      </select>
    </div>
  );
}

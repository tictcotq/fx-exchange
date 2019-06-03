import React from 'react';
import Wallet from '../../models/wallet';
import './wallet-dropdown.component.scss';

export interface WalletDropdownProps {
  wallets?: Wallet[],
  selectedWallet?: Wallet | null;
  onSelectWallet?: (wallet: Wallet) => void;
}

export default function WalletDropdown({
  wallets,
  selectedWallet,
  onSelectWallet,
}: WalletDropdownProps) {

  const handleSelectionChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = ev.target.value;
    const wallet = wallets && wallets.find((wallet: Wallet) => wallet.currencyCode === selectedCode);
    onSelectWallet && wallet && onSelectWallet(wallet);
  }

  return (
    <div className="wallet-dropdown">
      <select
        value={(selectedWallet && selectedWallet.currencyCode) || ''}
        onChange={handleSelectionChange}>
        {wallets && wallets.map((wallet: Wallet): JSX.Element =>
          <option key={wallet.currencySymbol} value={wallet.currencyCode}>
            {wallet.currencyCode}
          </option>
        )}
      </select>
    </div>
  );
}

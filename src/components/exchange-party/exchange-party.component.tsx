import React from 'react';
import Wallet from '../../models/wallet';
import { parseAndTrimFloat } from '../../services/number-format.service';
import WalletDropdown from '../wallet-dropdown/wallet-dropdown.component';
import AmountInput from '../amount-input/amount-input.component';

export interface ExchangePartyProps {
  wallets?: Wallet[];
  selectedWallet?: Wallet | null;
  amount?: number;
  onSelectWallet?: (wallet: Wallet) => void;
  onChangeAmount?: (amount: number) => void;
}

export default function ExchangeParty({
  wallets = [],
  selectedWallet,
  amount = 0,
  onSelectWallet,
  onChangeAmount,
}: ExchangePartyProps) {
  return (
    <div className="exchange-party">
      <WalletDropdown wallets={wallets} selectedWallet={selectedWallet} onSelectWallet={onSelectWallet} />
      {/*<label>Balance: {selectedWallet && selectedWallet.balance}</label>*/}
      <AmountInput amount={amount} onChangeAmount={onChangeAmount} />
    </div>
  );
}

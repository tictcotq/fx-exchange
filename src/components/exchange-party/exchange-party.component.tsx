import React from 'react';
import classnames from 'classnames';
import Wallet from '../../models/wallet';
import WalletDropdown from '../wallet-dropdown/wallet-dropdown.component';
import AmountInput from '../amount-input/amount-input.component';
import './exchange-party.component.scss';

export interface ExchangePartyProps {
  wallets?: Wallet[];
  selectedWallet?: Wallet | null;
  amount?: number;
  className?: string | null;
  onSelectWallet?: (wallet: Wallet) => void;
  onChangeAmount?: (amount: number) => void;
}

export default function ExchangeParty({
  wallets = [],
  selectedWallet,
  amount = 0,
  className,
  onSelectWallet,
  onChangeAmount,
}: ExchangePartyProps) {
  return (
    <div className={classnames('exchange-party', className)}>
      <div className="exchange-party__inputs">
        <WalletDropdown wallets={wallets} selectedWallet={selectedWallet} onSelectWallet={onSelectWallet} />
        {/*<label>Balance: {selectedWallet && selectedWallet.balance}</label>*/}
        <AmountInput amount={amount} onChangeAmount={onChangeAmount} />
      </div>
    </div>
  );
}

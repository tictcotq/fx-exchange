import React from 'react';
import ExchangeParty from '../../components/exchange-party/exchange-party.component';
import RatesSnapshot from '../../models/rates-snapshot';
import Wallet from '../../models/wallet';
import ExchangeRate from '../exchange-rate/exchange-rate.component';
import './exchange-form.component.scss';

export interface ExchangeFormProps {
  wallets: Wallet[];
  rates: RatesSnapshot | null;
  sourceWallet?: Wallet | null;
  sourceAmount?: number;
  targetWallet?: Wallet | null;
  targetAmount?: number;
  onSelectSourceWallet?: (wallet: Wallet) => void;
  onSelectTargetWallet?: (wallet: Wallet) => void;
  onChangeSourceAmount?: (amount: number) => void;
  onChangeTargetAmount?: (amount: number) => void;
}

export default function ExchangeForm ({
  wallets,
  rates,
  sourceWallet,
  sourceAmount,
  targetWallet,
  targetAmount,
  onSelectSourceWallet,
  onSelectTargetWallet,
  onChangeSourceAmount,
  onChangeTargetAmount,
}: ExchangeFormProps) {
  return (
    <div className="exchange-form">
      {sourceWallet &&
        <ExchangeParty
          wallets={wallets}
          amount={sourceAmount}
          selectedWallet={sourceWallet}
          onSelectWallet={onSelectSourceWallet}
          onChangeAmount={onChangeSourceAmount} />}

      {sourceWallet && targetWallet &&
        <ExchangeRate
          rates={rates}
          sourceCurrencyCode={sourceWallet.currencyCode}
          sourceCurrencySymbol={sourceWallet.currencySymbol}
          targetCurrencyCode={targetWallet.currencyCode}
          targetCurrencySymbol={targetWallet.currencySymbol} />
      }

      {targetWallet &&
        <ExchangeParty
          className="exchange-form__party-target"
          wallets={wallets}
          amount={targetAmount}
          selectedWallet={targetWallet}
          onSelectWallet={onSelectTargetWallet}
          onChangeAmount={onChangeTargetAmount} />}
    </div>
  );
}

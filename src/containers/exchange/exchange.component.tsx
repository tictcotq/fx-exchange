import React, { useState, useEffect } from 'react';
import ExchangeParty from '../../components/exchange-party/exchange-party.component';
import Wallet from '../../models/wallet';
import { convert } from '../../services/currency-converter.service';

export interface ExchangeProps {
  wallets: Wallet[]
}

const RATES = {
  timestamp: 1559278800,
  base: 'USD',
  rates: {
    'EUR': 0.9,
    'GBP': 0.8,
    'USD': 1
  }
};

export default ({
  wallets,
}: ExchangeProps) => {
  const [sourceWallet, setSourceWallet] = useState<Wallet | null>(null);
  const [targetWallet, setTargetWallet] = useState<Wallet | null>(null);
  const [sourceAmount, setSourceAmount] = useState<number>(0);
  const [targetAmount, setTargetAmount] = useState<number>(0);

  const swapWallets = () => {
    setSourceWallet(targetWallet);
    setTargetWallet(sourceWallet);
  }

  const handleSelectSourceCurrencyCode = (currencyCode: string) => {
    if (targetWallet && currencyCode === targetWallet.currencyCode) {
      swapWallets();
    } else {
      const wallet = wallets.find(wallet => wallet.currencyCode === currencyCode);
      setSourceWallet(wallet || null);
    }
  };

  const handleSelectTargetCurrencyCode = (currencyCode: string) => {
    if (sourceWallet && currencyCode === sourceWallet.currencyCode) {
      swapWallets();
    } else {
      const wallet = wallets.find(wallet => wallet.currencyCode === currencyCode);
      setTargetWallet(wallet || null);
    }
  };

  const handleChangeSourceAmount = (amount: number) => {
    setSourceAmount(amount);

    let targetAmount = 0;
    if (sourceWallet && targetWallet) {
      targetAmount = convert(amount, sourceWallet.currencyCode, targetWallet.currencyCode, RATES);
    }
    setTargetAmount(targetAmount);
  };

  const handleChangeTargetAmount = (amount: number) => {
    setTargetAmount(amount);

    let sourceAmount = 0;
    if (sourceWallet && targetWallet) {
      sourceAmount = convert(amount, targetWallet.currencyCode, sourceWallet.currencyCode, RATES);
    }
    setSourceAmount(sourceAmount);
  };

  useEffect(() => {
    wallets.length && setSourceWallet(wallets[0]);
    wallets.length > 1 && setTargetWallet(wallets[1]);
  }, [wallets]);

  useEffect(() => {
    let targetAmount = 0;
    if (sourceWallet && targetWallet) {
      targetAmount = convert(sourceAmount, sourceWallet.currencyCode, targetWallet.currencyCode, RATES);
    }
    setTargetAmount(targetAmount);
  }, [sourceWallet, targetWallet]);

  return (
    <main className="exchange">
      Exchange
      {sourceWallet &&
        <ExchangeParty
          wallets={wallets}
          amount={sourceAmount}
          selectedCurrencyCode={sourceWallet.currencyCode}
          onSelectCurrencyCode={handleSelectSourceCurrencyCode}
          onChangeAmount={handleChangeSourceAmount} />}
      {targetWallet &&
        <ExchangeParty
          wallets={wallets}
          amount={targetAmount}
          selectedCurrencyCode={targetWallet.currencyCode}
          onSelectCurrencyCode={handleSelectTargetCurrencyCode}
          onChangeAmount={handleChangeTargetAmount} />}
    </main>
  );
}

import React, { useState, useEffect } from 'react';
import ExchangeParty from '../../components/exchange-party/exchange-party.component';
import Wallet from '../../models/wallet';

export interface ExchangeProps {
  wallets: Wallet[]
}

export default ({
  wallets,
}: ExchangeProps) => {
  const [sourceWallet, setSourceWallet] = useState<Wallet | null>(null);
  const [targetWallet, setTargetWallet] = useState<Wallet | null>(null);

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

  useEffect(() => {
    wallets.length && setSourceWallet(wallets[0]);
    wallets.length > 1 && setTargetWallet(wallets[1]);
  }, [wallets]);

  return (
    <main className="exchange">
      Exchange
      {sourceWallet &&
        <ExchangeParty
          wallets={wallets}
          selectedCurrencyCode={sourceWallet.currencyCode}
          onSelectCurrencyCode={handleSelectSourceCurrencyCode} />}
      {targetWallet &&
        <ExchangeParty
          wallets={wallets}
          selectedCurrencyCode={targetWallet.currencyCode}
          onSelectCurrencyCode={handleSelectTargetCurrencyCode} />}
    </main>
  );
}

import Wallet from '../models/wallet';

export const fetchWallets = async (): Promise<Wallet[]> =>
  // Hardcoding wallets for now
  Promise.resolve([
    { currencyCode: 'USD', currencySymbol: '$', balance: 201.13 },
    { currencyCode: 'EUR', currencySymbol: '€', balance: 0 },
    { currencyCode: 'GBP', currencySymbol: '£', balance: 100 },
  ]);

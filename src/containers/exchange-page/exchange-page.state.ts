import Wallet from '../../models/wallet';
import RatesSnapshot from '../../models/rates-snapshot';

type ExchangePartyState = {
  wallet: Wallet | null;
  amount: number;
}

export enum ExchangeParty {
  Source = 'source',
  Target = 'target',
}

export interface ExchangePageState {
  source: ExchangePartyState,
  target: ExchangePartyState,
  wallets: Wallet[],
  rates: RatesSnapshot | null,
  lastEdited?: ExchangeParty,
}

export const initState = ({wallets}: {wallets: Wallet[]}): ExchangePageState => ({
  source: { amount: 0, wallet: wallets[0] },
  target: { amount: 0, wallet: wallets[1] },
  lastEdited: ExchangeParty.Source,
  wallets,
  rates: null,
});

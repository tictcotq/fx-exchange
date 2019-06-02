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

export interface ExchangeState {
  source: ExchangePartyState,
  target: ExchangePartyState,
  wallets: Wallet[],
  rates?: RatesSnapshot,
  lastEdited?: ExchangeParty,
}

export const initState = ({wallets}: {wallets: Wallet[]}): ExchangeState => ({
  source: { amount: 0, wallet: wallets[0] },
  target: { amount: 0, wallet: wallets[1] },
  lastEdited: ExchangeParty.Source,
  wallets,
});

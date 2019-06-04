import { Dispatch } from 'react';
import Wallet from '../../models/wallet';
import RatesSnapshot from '../../models/rates-snapshot';

export enum ExchangePageActionType {
  SetRates = 'SetRates',
  SetWallets = 'SetWallets',
  SetSourceAmount = 'SetSourceAmount',
  SetTargetAmount = 'SetTargetAmount',
  SetSourceWallet = 'SetSourceWallet',
  SetTargetWallet = 'SetTargetWallet',
  Exchange = 'Exchange',
}

export interface ExchangePageActions {
  setRates: (rates: RatesSnapshot | null) => void;
  setWallets: (wallets: Wallet[]) => void;
  setSourceAmount: (amount: number) => void;
  setTargetAmount: (amount: number) => void;
  setSourceWallet: (wallet: Wallet) => void;
  setTargetWallet: (wallet: Wallet) => void;
  exchange: () => void;
}

export const createActionDispatcher = (dispatch: Dispatch<any>): ExchangePageActions => ({
  setRates: rates => dispatch({type: ExchangePageActionType.SetRates, payload: rates}),
  setWallets: wallets => dispatch({type: ExchangePageActionType.SetWallets, payload: wallets}),
  setSourceAmount: amount => dispatch({ type: ExchangePageActionType.SetSourceAmount, payload: amount }),
  setTargetAmount: amount => dispatch({ type: ExchangePageActionType.SetTargetAmount, payload: amount }),
  setSourceWallet: wallet => dispatch({ type: ExchangePageActionType.SetSourceWallet, payload: wallet}),
  setTargetWallet: wallet => dispatch({ type: ExchangePageActionType.SetTargetWallet, payload: wallet}),
  exchange: () => dispatch({ type: ExchangePageActionType.Exchange }),
});

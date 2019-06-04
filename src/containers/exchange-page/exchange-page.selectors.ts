import { ExchangePageState } from './exchange-page.state';

export interface ExchangePageSelection {
  canExchange: boolean;
}

export const select = (state: ExchangePageState): ExchangePageSelection => ({
  canExchange: canExchange(state),
});

function canExchange(state: ExchangePageState): boolean {
  return !!(state.source.wallet
    && state.source.wallet.balance >= state.source.amount
    && state.target.wallet);
}

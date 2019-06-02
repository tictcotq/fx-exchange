import { ExchangeState, ExchangeParty } from './exchange.state';
import { convert } from '../../services/currency-converter.service';

export const exchangeReducer = (state: ExchangeState, action: any) => {
  switch (action.type) {
    case 'setRates':
      return { ...state, rates: action.payload };
    case 'setSourceAmount':
      return setSourceAmount(state, action.payload);
    case 'setTargetAmount':
      return setTargetAmount(state, action.payload);
    case 'setSourceCurrency':
      return setSourceCurrency(state, action.payload);
    case 'setTargetCurrency':
      return setTargetCurrency(state, action.payload);
    default:
      return state;
  }
}

function setSourceAmount(state: ExchangeState, sourceAmount: number): ExchangeState {
  let targetAmount = 0;
  if (state.source.wallet && state.target.wallet && state.rates) {
    targetAmount = convert(sourceAmount, state.source.wallet.currencyCode, state.target.wallet.currencyCode, state.rates);
  }
  return {
    ...state,
    source: { ...state.source, amount: sourceAmount },
    target: { ...state.target, amount: targetAmount },
    lastEdited: ExchangeParty.Source,
  };
}

function setTargetAmount(state: ExchangeState, targetAmount: number): ExchangeState {
  let sourceAmount = 0;
  if (state.source.wallet && state.target.wallet && state.rates) {
    sourceAmount = convert(targetAmount, state.target.wallet.currencyCode, state.source.wallet.currencyCode, state.rates);
  }
  return {
    ...state,
    source: { ...state.source, amount: sourceAmount },
    target: { ...state.target, amount: targetAmount },
    lastEdited: ExchangeParty.Target,
  };
}

function setSourceCurrency(state: ExchangeState, currencyCode: string) {
  if (state.target.wallet && currencyCode === state.target.wallet.currencyCode) {
    return swapWallets(state);
  } else {
    const sourceWallet = state.wallets.find(wallet => wallet.currencyCode === currencyCode);
    return recalcAmounts({
      ...state,
      source: {
        ...state.source,
        wallet: sourceWallet || null
      }
    });
  }
}

function setTargetCurrency(state: ExchangeState, currencyCode: string) {
  if (state.source.wallet && currencyCode === state.source.wallet.currencyCode) {
    return swapWallets(state);
  } else {
    const targetWallet = state.wallets.find(wallet => wallet.currencyCode === currencyCode);
    return recalcAmounts({
      ...state,
      target: {
        ...state.target,
        wallet: targetWallet || null,
      },
    });
  }
}

function recalcAmounts(state: ExchangeState) {
  const canConvert = state.source.wallet && state.target.wallet && state.rates;

  return {
    ...state,
    source: {
      ...state.source,
      amount: state.lastEdited === ExchangeParty.Source
        ? state.source.amount
        : canConvert
          ? convert(state.target.amount, state.source.wallet!.currencyCode, state.target.wallet!.currencyCode, state.rates!)
          : 0
    },
    target: {
      ...state.target,
      amount: state.lastEdited === ExchangeParty.Target
        ? state.target.amount
        : canConvert
          ? convert(state.source.amount, state.source.wallet!.currencyCode, state.target.wallet!.currencyCode, state.rates!)
          : 0
    }
  }
}

function swapWallets(state: ExchangeState) {
  return recalcAmounts({
    ...state,
    source: { ...state.source, wallet: state.target.wallet },
    target: { ...state.target, wallet: state.source.wallet },
  });
}

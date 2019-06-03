import { ExchangeFormState, ExchangeParty } from './exchange-form.state';
import { convert } from '../../services/currency-converter.service';
import Wallet from '../../models/wallet';

export const exchangeFormReducer = (state: ExchangeFormState, action: any) => {
  switch (action.type) {
    case 'setRates':
      return recalcAmounts({ ...state, rates: action.payload });
    case 'setSourceAmount':
      return setSourceAmount(state, action.payload);
    case 'setTargetAmount':
      return setTargetAmount(state, action.payload);
    case 'setSourceWallet':
      return setSourceWallet(state, action.payload);
    case 'setTargetWallet':
      return setTargetWallet(state, action.payload);
    default:
      return state;
  }
}

function setSourceAmount(state: ExchangeFormState, sourceAmount: number): ExchangeFormState {
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

function setTargetAmount(state: ExchangeFormState, targetAmount: number): ExchangeFormState {
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

function setSourceWallet(state: ExchangeFormState, wallet: Wallet) {
  if (state.target.wallet && wallet.currencyCode === state.target.wallet.currencyCode) {
    return swapWallets(state);
  } else {
    return recalcAmounts({
      ...state,
      source: {
        ...state.source,
        wallet: wallet,
      }
    });
  }
}

function setTargetWallet(state: ExchangeFormState, wallet: Wallet) {
  if (state.source.wallet && wallet.currencyCode === state.source.wallet.currencyCode) {
    return swapWallets(state);
  } else {
    return recalcAmounts({
      ...state,
      target: {
        ...state.target,
        wallet: wallet,
      },
    });
  }
}

function recalcAmounts(state: ExchangeFormState) {
  const canConvert = state.source.wallet && state.target.wallet && state.rates;

  return {
    ...state,
    source: {
      ...state.source,
      amount: state.lastEdited === ExchangeParty.Source
        ? state.source.amount
        : canConvert
          ? convert(state.target.amount, state.target.wallet!.currencyCode, state.source.wallet!.currencyCode, state.rates!)
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

function swapWallets(state: ExchangeFormState) {
  return recalcAmounts({
    ...state,
    source: { ...state.source, wallet: state.target.wallet },
    target: { ...state.target, wallet: state.source.wallet },
  });
}

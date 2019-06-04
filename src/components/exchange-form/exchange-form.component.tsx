import React, { useEffect, useReducer } from 'react';
import ExchangeParty from '../../components/exchange-party/exchange-party.component';
import RatesSnapshot from '../../models/rates-snapshot';
import Wallet from '../../models/wallet';
import { exchangeFormReducer } from './exchange-form.reducer';
import { initState } from './exchange-form.state';
import './exchange-form.component.scss';

export interface ExchangeFormProps {
  wallets: Wallet[],
  rates: RatesSnapshot | null,
}

export default function ExchangeForm ({
  wallets,
  rates,
}: ExchangeFormProps) {
  const [{source, target}, dispatch] = useReducer(exchangeFormReducer, { wallets }, initState);

  useEffect(() => {
    dispatch({type: 'setRates', payload: rates});
  }, [rates]);

  return (
    <div className="exchange-form">
      {source.wallet &&
        <ExchangeParty
          wallets={wallets}
          amount={source.amount}
          selectedWallet={source.wallet}
          onSelectWallet={(wallet: Wallet): void => dispatch({ type: 'setSourceWallet', payload: wallet})}
          onChangeAmount={(amount) => dispatch({ type: 'setSourceAmount', payload: amount })} />}

      {target.wallet &&
        <ExchangeParty
          className="exchange-form__party-target"
          wallets={wallets}
          amount={target.amount}
          selectedWallet={target.wallet}
          onSelectWallet={(wallet: Wallet): void => dispatch({ type: 'setTargetWallet', payload: wallet})}
          onChangeAmount={(amount) => dispatch({ type: 'setTargetAmount', payload: amount })} />}
    </div>
  );
}

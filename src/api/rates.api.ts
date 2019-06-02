import axios from 'axios';
import RatesSnapshot from '../models/rates-snapshot';

export const fetchRates = async (/*currencyCodes: string[]*/): Promise<RatesSnapshot> => {

  return Promise.resolve({
    timestamp: 1559278800,
    base: 'USD',
    rates: {
      'EUR': 0.9,
      'GBP': 0.8,
      'USD': 1
    }
  });

  // const { data } = await axios.get(
  //   'https://openexchangerates.org/api/latest.json?app_id=4ac9539715d242f69ed81e50a5096126&symbols=USD,GBP,EUR'
  // );
  //
  // return data;
}

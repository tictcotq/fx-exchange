import axios from 'axios';
import RatesSnapshot from '../models/rates-snapshot';

export default class RatesApi {

  static async fetchRates(currencyCodes: string[]): Promise<RatesSnapshot> {
    const { data } = await axios.get(
      'https://openexchangerates.org/api/latest.json?app_id=4ac9539715d242f69ed81e50a5096126&symbols=USD,GBP,EUR'
    );

    return data;
  }

}

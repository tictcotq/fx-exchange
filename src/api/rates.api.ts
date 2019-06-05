import axios from 'axios';
import RatesSnapshot from '../models/rates-snapshot';

export const fetchRates = async (): Promise<RatesSnapshot> => {
  const response = await axios.get(
    'https://openexchangerates.org/api/latest.json', {
      params: {
        'app_id': process.env.REACT_APP_FX_API_KEY,
      }
    }
  );

  return response.data;
}

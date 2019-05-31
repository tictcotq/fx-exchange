export default interface RatesSnapshot {
  timestamp: number;
  base: string;
  rates: { [currencyCode: string]: number };
}

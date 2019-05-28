export default interface RatesSnapshot {
  timestamp: number;
  base: string;
  rates: Map<string, number>;
}

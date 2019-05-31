import {convert} from './currency-converter.service';

const RATES = {
  timestamp: 1559278800,
  base: 'USD',
  rates: {
    'EUR': 0.9,
    'GBP': 0.8,
    'USD': 1
  }
};

describe('Currency Converter service', () => {

  it('should have method convert', () => {
    // Assert
    expect(typeof convert).toBe('function');
  });

  it('should convert from base currency to target', () => {
    // Act
    const result = convert(100, 'USD', 'GBP', RATES);

    // Assert
    expect(result).toBe(80);
  });

  it('should return 0 if target currency is not present', () => {
    // Act
    const result = convert(100, 'USD', 'XXX', RATES);

    // Assert
    expect(result).toBe(0);
  });

  it('should convert from base currency to base', () => {
    // Act
    const result = convert(100, 'USD', 'USD', RATES);

    // Assert
    expect(result).toBe(100);
  });

  it('should convert from non-base currency to target', () => {
    // Act
    const result = convert(100, 'EUR', 'GBP', RATES);

    // Assert
    // 100 EUR => 111.(1) USD => 88.(8) GBP
    expect(result).toBe(100 / .9 * .8);
  });

  it('should return 0 if source currency is not present in cross conversion', () => {
    // Act
    const result = convert(100, 'XXX', 'GBP', RATES);

    // Assert
    expect(result).toBe(0);
  });

  it('should return 0 if target currency is not present in cross conversion', () => {
    // Act
    const result = convert(100, 'EUR', 'XXX', RATES);

    // Assert
    expect(result).toBe(0);
  });

});

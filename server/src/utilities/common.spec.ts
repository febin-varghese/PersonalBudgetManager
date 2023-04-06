import { months } from '../utilData';
import { convertMonthStringToNumber, getDataPath } from './common';

describe('common/getDataPath', () => {
  it('should throw an exception if environment is not set', () => {
    expect(getDataPath).toThrowError('Environment is not set');
  });

  it('should throw an exception if an invalid environment is set', () => {
    const environment = 'invalid env';
    process.env = { ...process.env, environment };
    expect(getDataPath).toThrowError(
      `${environment} is invalid environment configuration`
    );
  });

  const environments = [
    ['production', '../../data/'],
    ['development', '../../test/data/'],
    ['testing', '../../test/data/']
  ];
  it.each(environments)(
    'should return proper data path for the set environment: %s',
    (environment, dataPath) => {
      process.env = { ...process.env, environment };
      expect(getDataPath()).toBe(dataPath);
    }
  );
});

describe('common/convertMonthStringToNumber', () => {
  it('should return -1 for invalid month', () => {
    expect(convertMonthStringToNumber('invalid month')).toBe(-1);
  });

  const testData: [string, number][] = months.map((monthString, index) => [
    monthString,
    index + 1
  ]); // TODO: Full string test as well
  it.each(testData)(
    'should convert textual month to numeric month: %s',
    (monthString, monthNumber) => {
      expect(convertMonthStringToNumber(monthString)).toBe(monthNumber);
    }
  );
});

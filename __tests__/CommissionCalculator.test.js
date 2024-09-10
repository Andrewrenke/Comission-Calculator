const CommissionCalculator = require('../services/CommissionCalculator');

describe('CommissionCalculator', () => {

  describe('calculateCashInCommission', () => {
    it('should return the correct commission for cash in', () => {
      const commission = CommissionCalculator.calculateCashInCommission(10000);
      expect(commission).toBeCloseTo(3, 2); // 0.03% of 10000 is 3, which is less than the max of 5
    });

    it('should return 5 when commission exceeds the max limit', () => {
      const commission = CommissionCalculator.calculateCashInCommission(2000000);
      expect(commission).toBe(5); // 0.03% of 2000000 is 600, but the max limit is 5
    });
  });

  describe('calculateCashOutNaturalCommission', () => {
    it('should return 0 commission if the transaction amount is less than the weekly limit', () => {
      const userHistory = {};
      const commission = CommissionCalculator.calculateCashOutNaturalCommission(500, 1, '2023-09-04', userHistory);
      expect(commission).toBe(0);
    });

    it('should only return the commission on the amount exceeding the weekly limit', () => {
      const userHistory = {};
      const commission = CommissionCalculator.calculateCashOutNaturalCommission(1500, 1, '2023-09-04', userHistory);
      expect(commission).toBe(1.5); // Commission from the exceeding 500 EUR, 0.3% of 500 = 1.5
    });

    it('must account for user’s previous operations within one week', () => {
      const userHistory = { 1: { weekStart: '2023-09-04', totalAmount: 600 } };
      const commission = CommissionCalculator.calculateCashOutNaturalCommission(600, 1, '2023-09-06', userHistory);
      expect(commission).toBe(0.6); // 600 - 400 free -> commission from 200
    });

    it('should reset the weekly limit at the start of a new week', () => {
      const userHistory = { 1: { weekStart: '2023-08-28', totalAmount: 1000 } };
      const commission = CommissionCalculator.calculateCashOutNaturalCommission(500, 1, '2023-09-04', userHistory);
      expect(commission).toBe(0); // New week, so the limit resets
    });
  });

  describe('calculateCashOutLegalCommission', () => {
    it('should return 0.5 if the commission is less than the minimum', () => {
      const commission = CommissionCalculator.calculateCashOutLegalCommission(100);
      expect(commission).toBe(0.5); // Minimum commission for legal entities
    });

    it('should return the correct commission for large transactions', () => {
      const commission = CommissionCalculator.calculateCashOutLegalCommission(10000);
      expect(commission).toBe(30); // 0.3% of 10000 = 30
    });
  });

  describe('getWeekStartDate', () => {
    it('should return the start date of the week (Monday)', () => {
      const weekStartDate = CommissionCalculator.getWeekStartDate('2023-09-06'); // Wednesday
      expect(weekStartDate).toBe('2023-09-04'); // Monday of the same week
    });

    it('should return the same date if the current day is Monday', () => {
      const weekStartDate = CommissionCalculator.getWeekStartDate('2023-09-04'); // Monday
      expect(weekStartDate).toBe('2023-09-04'); // Same date
    });

    it('should return the previous Monday when the current day is Sunday', () => {
      const weekStartDate = CommissionCalculator.getWeekStartDate('2023-09-10'); // Sunday
      expect(weekStartDate).toBe('2023-09-04'); // Previous Monday
    });
  });

  describe('roundCommission', () => {
    it('should round up the commission correctly', () => {
      const rounded = CommissionCalculator.roundCommission(3.1415);
      expect(rounded).toBe(3.15); // Rounds up to two decimal places
    });
  });

});

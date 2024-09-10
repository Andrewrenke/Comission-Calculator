class CommissionCalculator {

  static calculateCashInCommission(amount) {
    const commission = amount * 0.0003;
    return Math.min(commission, 5.0);
  }

  static calculateCashOutNaturalCommission(amount, userId, operationDate, userHistory) {
    const weeklyLimit = 1000.0;
    const commissionRate = 0.003;

    const weekStart = CommissionCalculator.getWeekStartDate(operationDate);

    let currentWeekData = userHistory[userId] || { weekStart, totalAmount: 0 };

    if (currentWeekData.weekStart !== weekStart) {
      currentWeekData = { weekStart, totalAmount: 0 };
    }

    const freeAmount = Math.max(0, weeklyLimit - currentWeekData.totalAmount);
    const taxableAmount = Math.max(0, amount - freeAmount);

    currentWeekData.totalAmount += amount;
    userHistory[userId] = currentWeekData;

    return taxableAmount * commissionRate;
  }

  static calculateCashOutLegalCommission(amount) {
    const commission = amount * 0.003;
    return Math.max(commission, 0.5);
  }

  static getWeekStartDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff)).toISOString().slice(0, 10);
  }

  static roundCommission(commission) {
    return Math.ceil(commission * 100) / 100;
  }
}

module.exports = CommissionCalculator;

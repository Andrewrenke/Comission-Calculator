const {
  CASH_IN,
  CASH_OUT,
  NATURAL,
  JURIDICAL,
} = require('../constants/constants');
const CommissionCalculator = require('../services/CommissionCalculator')

const calculateCommissions = (path) => {
  const data = require(path);

  if (!data) {
    console.error('No data to process');
    return;
  }

  const userHistory = {};

  data.forEach((operation) => {
    let commission = 0;

    const {
      user_id,
      user_type,
      type,
      date,
      operation: { amount },
    } = operation;

    if (type === CASH_IN) {
      commission = CommissionCalculator.calculateCashInCommission(amount);
    } else if (type === CASH_OUT) {
      if (user_type === NATURAL) {
        commission = CommissionCalculator.calculateCashOutNaturalCommission(
          amount,
          user_id,
          date,
          userHistory,
        );
      } else if (user_type === JURIDICAL) {
        commission = CommissionCalculator.calculateCashOutLegalCommission(amount);
      }
    }
    console.log(CommissionCalculator.roundCommission(commission).toFixed(2));
  });
};

module.exports = {
  calculateCommissions,
};

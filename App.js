const { DATA_PATH } = require('./constants/constants');
const { calculateCommissions } = require('./utils/calculateCommissions');

// start calculations
calculateCommissions(DATA_PATH);

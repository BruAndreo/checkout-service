import "dotenv/config";

const envVars = process.env;

export default {
  serverPort: envVars.PORT,
  blackFridayDate: envVars.BLACK_FRIDAY_DATE,
  logLevel: envVars.LOG_LEVEL || 'INFO',
  discountService: {
    host: envVars.DISCOUNT_SERVICE_HOST || 'localhost',
    port: envVars.DISCOUNT_SERVICE_PORT || '50051'
  }
};

import "dotenv/config";

const envVars = process.env;

export default {
  serverPort: envVars.PORT,
  blackFridayDate: envVars.BLACK_FRIDAY_DATE,
  logLevel: envVars.LOG_LEVEL || 'INFO'
};

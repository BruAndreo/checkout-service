import app from "./server/application";
import configs from "./config"
import log, { LogLevelDesc } from "loglevel";

log.setDefaultLevel(configs.logLevel as LogLevelDesc);

app.listen(configs.serverPort, () => log.info(`Server online at port ${configs.serverPort}`))

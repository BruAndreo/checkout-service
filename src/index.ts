import app from "./server/application";
import configs from "./config"

app.listen(configs.serverPort, () => console.log(`Server online at port ${configs.serverPort}`))

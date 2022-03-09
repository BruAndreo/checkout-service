import 'dotenv/config'
import app from "./server/application";

const port = process.env.PORT;

app.listen(port, () => console.log(`Server online at port ${port}`))

import { Router } from "express";
import checkout from "../controllers/checkout";

const routes = Router();

routes.post('/checkout', checkout);

routes.use((req, res) => res.status(404).json({
  error: "Not found"
}))

export default routes;

import { Request, Response } from "express";
import { ValidationException } from "../helpers/exceptions";

export default function checkout(req: Request, res: Response): Response {
  const products = req.body.products;

  try {
    if (!products || products.length < 1) {
      throw new ValidationException("Products are required", 400);
    }

    return res.json({ message: "checkout" });
  }
  catch(e: any) {
    return res.status(e.statusCode || 500).json({
      message: e.message
    });
  }
}

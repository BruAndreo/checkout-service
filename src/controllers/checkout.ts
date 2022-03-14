import { Request, Response } from "express";
import Checkout from "../domain/checkout";
import { ValidationException } from "../helpers/exceptions";

export default async function checkout(req: Request, res: Response): Promise<Response> {
  const products = req.body.products;

  try {
    if (!products || products.length < 1) {
      throw new ValidationException("Products are required");
    }

    const checkout = new Checkout(products);
    await checkout.validateProducts();
    const checkoutResume = checkout.getCheckoutResume();

    return res.status(200).json(checkoutResume);
  }
  catch(e: any) {
    return res.status(e.statusCode || 500).json({
      message: e.message
    });
  }
}

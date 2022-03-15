import { Request, Response } from "express";
import Checkout from "../domain/checkout";
import { ValidationException } from "../helpers/exceptions";
import log from "loglevel";

export default async function checkout(req: Request, res: Response): Promise<Response> {
  const products = req.body.products;

  try {
    if (!products || products.length < 1) {
      log.warn("Products is not founded", products);
      throw new ValidationException("Products are required");
    }

    const checkout = new Checkout(products);
    await checkout.validateProducts();
    const checkoutResume = checkout.getCheckoutResume();

    log.debug("Finished process of request");
    return res.status(200).json(checkoutResume);
  }
  catch(e: any) {
    if (e.statusCode) {
      log.warn(`Request finish with fail: ${e.message}`);
    } else {
      log.error(`Request finish with unknown error: ${e.message}`);
    }

    return res.status(e.statusCode || 500).json({
      message: e.message
    });
  }
}

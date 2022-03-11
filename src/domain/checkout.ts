import { ValidationException } from "../helpers/exceptions";
import Product from "./product";

type ProductBase = {
  id: number
  quantity: number
}

export default class Checkout {

  private products: Array<Product>;

  constructor(products: Array<ProductBase>) {
    this.validateProducts(products);
  }

  private validateProducts(products: Array<ProductBase>) {
    this.products = products.map(product => {
      if (product.quantity < 1) {
        throw new ValidationException("Quantity is not ", 400);
      }

      return new Product(product.id, product.quantity);
    });
  }

}

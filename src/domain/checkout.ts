import { ValidationException } from "../helpers/exceptions";
import Product from "./product";
import { ProductBase } from "../types/productBase";
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

      const productCompelte =  new Product(product.id, product.quantity);

      if (productCompelte.isGift()) {
        throw new ValidationException("A gift product doesn't to be added", 400);
      }

      return productCompelte;
    });
  }

  getCheckoutResume() {
    const totalAmount = this.products.reduce((amount, product) => product.getAmount() + amount, 0);
    const totalDiscount = this.products.reduce((discount, product) => product.getDiscount() + discount, 0);

    return {
      total_amount: totalAmount,
      total_amount_with_discount: totalAmount - totalDiscount,
      total_discount: totalDiscount,
      products: this.products.map(product => product.getResume())
    }
  }

}

import { ValidationException } from "../helpers/exceptions";
import Product from "./product";
import { ProductBase } from "../types/productBase";
import {isBlackFriday} from "../helpers/blackFriday";
import log from "loglevel";

export default class Checkout {

  private products: Array<ProductBase>;
  private productsComplete: Array<Product> = [];

  constructor(products: Array<ProductBase>) {
    this.products = products;
  }

  public async validateProducts() {
    for(const product of this.products) {
      if (product.quantity < 1) {
        log.warn(`Quantity is not valid: ${product.quantity}`);
        throw new ValidationException("Quantity is not valid");
      }

      const productComplet = await this.createAndLoadProduct(product.id, product.quantity);

      if (productComplet.isGift()) {
        log.warn(`Trying to add a gift in checkout`);
        throw new ValidationException("A gift product doesn't to be added");
      }

      this.productsComplete.push(productComplet);
    };

    await this.addBlackFridayGift();
  }

  private async addBlackFridayGift() {
    if (!isBlackFriday()) {
      return;
    }

    log.info("Adding Gift! Is Black Friday!");
    this.productsComplete.push(await this.createAndLoadProduct(6, 1));
  }

  private async createAndLoadProduct(id: number, quantity: number): Promise<Product> {
    const product = new Product(id, quantity);
    await product.load();
    return product;
  }

  getCheckoutResume() {
    const totalAmount = this.productsComplete.reduce((amount, product) => product.getTotalAmount() + amount, 0);
    const totalDiscount = this.productsComplete.reduce((discount, product) => product.getTotalDiscount() + discount, 0);

    return {
      total_amount: totalAmount,
      total_amount_with_discount: totalAmount - totalDiscount,
      total_discount: totalDiscount,
      products: this.productsComplete.map(product => product.getResume())
    }
  }

}

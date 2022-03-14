import { ValidationException } from "../helpers/exceptions";
import Product from "./product";
import { ProductBase } from "../types/productBase";
import {isBlackFriday} from "../helpers/blackFriday";
export default class Checkout {

  private products: Array<ProductBase>;
  private productsComplet: Array<Product> = [];

  constructor(products: Array<ProductBase>) {
    this.products = products;
  }

  public async validateProducts() {
    for(const product of this.products) {
      if (product.quantity < 1) {
        throw new ValidationException("Quantity is not ");
      }

      const productComplet = await this.createAndLoadProduct(product.id, product.quantity);

      if (productComplet.isGift()) {
        throw new ValidationException("A gift product doesn't to be added");
      }

      this.productsComplet.push(productComplet);
    };

    await this.addBlackFridayGift();
  }

  private async addBlackFridayGift() {
    if (!isBlackFriday()) {
      return;
    }

    this.productsComplet.push(await this.createAndLoadProduct(6, 1));
  }

  private async createAndLoadProduct(id: number, quantity: number): Promise<Product> {
    const product = new Product(id, quantity);
    await product.load();
    return product;
  }

  async getCheckoutResume() {
    const totalAmount = this.productsComplet.reduce((amount, product) => product.getTotalAmount() + amount, 0);
    const totalDiscount = this.productsComplet.reduce((discount, product) => product.getTotalDiscount() + discount, 0);

    return {
      total_amount: totalAmount,
      total_amount_with_discount: totalAmount - totalDiscount,
      total_discount: totalDiscount,
      products: this.productsComplet.map(product => product.getResume())
    }
  }

}

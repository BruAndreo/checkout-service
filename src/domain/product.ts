import ProductsModel from "../data/productsModel";
import { ProductNotFoundException, ValidationException } from "../helpers/exceptions";
import { getDiscountService } from "../infra/discount";
import log from "loglevel";

export default class Product {

  private id: number;
  private quantity: number;
  private title: string;
  private description: string;
  private amount: number;
  private discount: number = 0;
  private is_gift: boolean;

  constructor(id: number, quantity: number) {
    this.id = id;
    this.quantity = quantity;
  }

  public async load() {
    const product = ProductsModel.getById(this.id);

    if (!product) {
      throw new ProductNotFoundException("Product not found");
    }

    this.title = product.title;
    this.description = product.description;
    this.amount = product.amount;
    this.is_gift = product.is_gift;
    await this.setDiscount();

    log.debug(`Product ${this.title} loaded`);
  }

  private async setDiscount() {
    let discountPercentage = 0;

    try {
      discountPercentage = await getDiscountService(this.id);
    } catch (e) {
      log.warn("Error in get value from Discount Service, using 0 by default");
    }

    this.discount = Math.trunc(this.amount * discountPercentage);
    log.debug(`Discount for ${this.id}|${this.title} setted: ${this.discount}`);
  }

  public isGift() {
    return this.is_gift;
  }

  public getTotalAmount(): number {
    return this.isGift() ? 0 : (this.amount * this.quantity) - this.getTotalDiscount();
  }

  public getTotalDiscount(): number {
    return this.isGift() ? 0 : this.discount * this.quantity;
  }

  public getResume() {
    return {
      id: this.id,
      quantity: this.quantity,
      unit_amount: this.isGift() ? 0 : this.amount,
      total_amount: this.getTotalAmount(),
      discount: this.getTotalDiscount(),
      is_gift: this.is_gift
    }
  }
}

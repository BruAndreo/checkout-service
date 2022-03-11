import ProductsModel from "../data/productsModel";
import { ProductNotFoundException, ValidationException } from "../helpers/exceptions";

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

    this.load();
  }

  private load() {
    const product = ProductsModel.getById(this.id);

    if (!product) {
      throw new ProductNotFoundException("Product not found");
    }

    this.title = product.title;
    this.description = product.description;
    this.amount = product.amount;
    this.is_gift = product.is_gift;
  }

  public isGift() {
    return this.is_gift;
  }

  public getAmount(): number {
    return this.amount * this.quantity;
  }

  public getDiscount(): number {
    return this.discount * this.quantity;
  }

  public getResume() {
    return {
      id: this.id,
      quantity: this.quantity,
      unit_amount: this.amount,
      total_amount: this.getAmount(),
      discount: this.getDiscount(),
      is_gift: this.is_gift
    }
  }
}

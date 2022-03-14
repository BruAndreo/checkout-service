import ProductsModel from "../data/productsModel";
import { ProductNotFoundException, ValidationException } from "../helpers/exceptions";
import { getDiscountService } from "../infra/discount";

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

    const discountPercentage = await getDiscountService(this.id);
    this.setDiscount(discountPercentage);
  }

  private setDiscount(discountPercentage: number) {
    this.discount = Math.trunc(this.amount * discountPercentage);
  }

  public isGift() {
    return this.is_gift;
  }

  public getAmount(): number {
    return this.isGift() ? 0 : this.amount * this.quantity;
  }

  public getDiscount(): number {
    return this.isGift() ? 0 : this.discount * this.quantity;
  }

  public getResume() {
    return {
      id: this.id,
      quantity: this.quantity,
      unit_amount: this.isGift() ? 0 : this.amount,
      total_amount: this.getAmount(),
      discount: this.getDiscount(),
      is_gift: this.is_gift
    }
  }
}

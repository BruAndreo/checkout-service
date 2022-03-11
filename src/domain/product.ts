import ProductsModel from "../data/productsModel";
import { ProductNotFoundException, ValidationException } from "../helpers/exceptions";

export default class Product {

  private id: number;
  private quantity: number;
  private title: string;
  private description: string;
  private amount: number;
  private is_gift: boolean;

  constructor(id: number, quantity: number) {
    this.id = id;
    this.quantity = quantity;

    this.load();
  }

  private load() {
    const product = ProductsModel.getById(this.id);

    if (!product) {
      throw new ProductNotFoundException("Product not found", 404);
    }

    this.title = product.title;
    this.description = product.description;
    this.amount = product.amount;
    this.is_gift = product.is_gift;
  }

  public isGift() {
    return this.is_gift;
  }
}

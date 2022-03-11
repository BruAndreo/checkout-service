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
    this.products = products.map(product => new Product(product.id, product.quantity));
  }

}

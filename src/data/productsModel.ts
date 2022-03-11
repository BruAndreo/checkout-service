import products from "./products.json";

export default class ProductsModel {

  public static getById(id: number) {
    return products.find(product => product.id === id);
  }

}

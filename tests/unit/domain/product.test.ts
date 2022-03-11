import Product from "../../../src/domain/product";
import { ProductNotFoundException } from "../../../src/helpers/exceptions";

describe("Product Domain", () => {

  test("Should throw exception when product is not found", () => {
    const t = () => new Product(10, 1);

    expect(t).toThrow(ProductNotFoundException);
  });

  test("Should load Product when product is found", () => {
    const product = new Product(1, 1);

    expect(product).not.toBeNull();
  });

});

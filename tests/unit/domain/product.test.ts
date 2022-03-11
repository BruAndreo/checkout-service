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

  test("getAmount should return zero when product is a gift", () => {
    const product = new Product(6, 1);

    expect(product.getAmount()).toEqual(0);
  });

  test("getDiscount should return zero when product is a gift", () => {
    const product = new Product(6, 1);

    expect(product.getDiscount()).toEqual(0);
  })

  test("getAmount should return multiple value when quantity is more than one", () => {
    const product = new Product(1, 2);

    const valueExpected = 15157 * 2;

    expect(product.getAmount()).toEqual(valueExpected);
  });

  test("getDiscount should return multiple value when quantity is more than one", () => {
    const product = new Product(1, 2);

    const valueExpected = 0 * 2;

    expect(product.getDiscount()).toEqual(valueExpected);
  })

});

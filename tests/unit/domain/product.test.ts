import Product from "../../../src/domain/product";
import { ProductNotFoundException } from "../../../src/helpers/exceptions";
import * as discountService from "../../../src/infra/discount";


describe("Product Domain", () => {
  jest.mock('../../../src/infra/discount', () => jest.fn(() => 0));

  test("Should throw exception when product is not found", async () => {
    const t = async () => {
      const product = new Product(10, 1);
      await product.load();
    }

    expect(t).rejects.toThrow(ProductNotFoundException);
  });

  test("Should load Product when product is found", async () => {
    const product = new Product(1, 1);
    await product.load();

    expect(product.getResume()).not.toBeNull();
  });

  test("getAmount should return zero when product is a gift", async () => {
    const product = new Product(6, 1);
    await product.load();

    expect(product.getTotalAmount()).toEqual(0);
  });

  test("getDiscount should return zero when product is a gift", async () => {
    const product = new Product(6, 1);
    await product.load();

    expect(product.getTotalDiscount()).toEqual(0);
  })

  test("getAmount should return multiple value when quantity is more than one", async () => {
    const product = new Product(1, 2);
    await product.load();

    const valueExpected = 15157 * 2;

    expect(product.getTotalAmount()).toEqual(valueExpected);
  });

});

describe("Product Domain With 0.05 discount", () => {
  test("getDiscount should return multiple value when quantity is more than one", async () => {
    jest.spyOn(discountService, 'getDiscountService').mockResolvedValueOnce(0.05);

    const product = new Product(1, 2);
    await product.load();

    const valueExpected = 1514;

    expect(product.getTotalDiscount()).toEqual(valueExpected);
  });
});

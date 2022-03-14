import Checkout from "../../../src/domain/checkout";
import * as blackFriday from "../../../src/helpers/blackFriday";
import { ValidationException } from "../../../src/helpers/exceptions";

jest.mock('../../../src/infra/discount', () => jest.fn(() => 0));

describe("Checkout Domain", () => {

  test("Should throw exception when quantity of item is less than 1", async () => {
    const t = async () => {
      const checkout = new Checkout([{ id: 1, quantity: 0 }]);
      await checkout.validateProducts();
    }

    expect(t).rejects.toThrow(ValidationException);
  });

  test("Should throw exception when the product is a gift", async () => {
    const t = async () => {
      const checkout = new Checkout([{ id: 6, quantity: 1 }]);
      await checkout.validateProducts();
    }

    expect(t).rejects.toThrow(ValidationException);
  });

  test("Should validate and load Prodcts when the id and quantity are ok", () => {
    const t = async () => {
      const checkout = new Checkout([{ id: 1, quantity: 1 }]);
      await checkout.validateProducts();
      return checkout;
    }

    expect(t).not.toBeNull();
  });

  test("Should not add a gift product when isn't black friday", async () => {
    jest.spyOn(blackFriday, 'isBlackFriday').mockReturnValueOnce(false);

    const checkout = new Checkout([{ id: 1, quantity: 1 }]);
    await checkout.validateProducts();
    const resume = checkout.getCheckoutResume();
    const gifts = resume.products.filter(product => product.is_gift);

    expect(gifts.length).toEqual(0);
  });

  test("Should add a gift product when is black friday", async () => {
    jest.spyOn(blackFriday, 'isBlackFriday').mockReturnValueOnce(true);

    const checkout = new Checkout([{ id: 1, quantity: 1 }]);
    await checkout.validateProducts();
    const resume = checkout.getCheckoutResume();
    const gifts = resume.products.filter(product => product.is_gift);

    expect(gifts.length).toEqual(1);
  });

});

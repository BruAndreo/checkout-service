import Checkout from "../../../src/domain/checkout";
import * as blackFriday from "../../../src/helpers/blackFriday";
import { ValidationException } from "../../../src/helpers/exceptions";


describe("Checkout Doamin", () => {

  test("Should throw exception when quantity of item is less than 1", () => {
    const t = () => new Checkout([{ id: 1, quantity: 0 }]);

    expect(t).toThrow(ValidationException);
  });

  test("Should throw exception when the product is a gift", () => {
    const t = () => new Checkout([{ id: 6, quantity: 1 }]);

    expect(t).toThrow(ValidationException);
  });

  test("Should validate and load Prodcts when the id and quantity are ok", () => {
    const checkout = new Checkout([{ id: 1, quantity: 1 }]);

    expect(checkout).not.toBeNull();
  });

  test("Should not add a gift product when isn't black friday", () => {
    jest.spyOn(blackFriday, 'isBlackFriday').mockReturnValueOnce(false);

    const checkout = new Checkout([{ id: 1, quantity: 1 }]);
    const resume = checkout.getCheckoutResume();
    const gifts = resume.products.filter(product => product.is_gift);

    expect(gifts.length).toEqual(0);
  });

  test("Should add a gift product when is black friday", () => {
    jest.spyOn(blackFriday, 'isBlackFriday').mockReturnValueOnce(true);

    const checkout = new Checkout([{ id: 1, quantity: 1 }]);
    const resume = checkout.getCheckoutResume();
    const gifts = resume.products.filter(product => product.is_gift);

    expect(gifts.length).toEqual(1);
  });

});

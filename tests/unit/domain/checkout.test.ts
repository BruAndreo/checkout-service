import Checkout from "../../../src/domain/checkout";
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

});

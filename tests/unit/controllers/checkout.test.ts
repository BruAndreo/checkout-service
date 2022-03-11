import checkout from '../../../src/controllers/checkout';
import mockRequest from '../mocks/request';
import mockResponse from '../mocks/response';
import { emptyBody, bodyWithZeroProducts, bodyCorrect } from '../mocks/bodys';

describe("Checkout Controller", () => {
  const checkoutController = checkout;

  test('Should return error when products are not passed', () => {
    const response = checkout(
      mockRequest({}, emptyBody),
      mockResponse()
    );

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ message: "Products are required" });
  });

  test('Should return error when products are empty', () => {
    const response = checkout(
      mockRequest({}, bodyWithZeroProducts),
      mockResponse()
    );

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ message: "Products are required" });
  });

  test("Should return a expected body when the request is success", () => {
    const response = checkout(
      mockRequest({}, bodyCorrect),
      mockResponse()
    );

    const { total_amount, total_amount_with_discount, total_discount, products } = (response.json as any);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(total_amount).not.toBeNull();
    expect(total_amount_with_discount).not.toBeNull();
    expect(total_discount).not.toBeNull();
    expect(products).not.toBeNull();
  });
});

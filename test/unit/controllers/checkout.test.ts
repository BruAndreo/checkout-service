import checkout from '../../../src/controllers/checkout';
import mockRequest from '../mocks/request';
import mockResponse from '../mocks/response';
import { emptyBody, bodyWithZeroProducts } from '../mocks/bodys';

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
});

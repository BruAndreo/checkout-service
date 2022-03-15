import checkout from '../../../src/controllers/checkout';
import mockRequest from '../mocks/request';
import mockResponse from '../mocks/response';
import { emptyBody, bodyWithZeroProducts, bodyCorrect } from '../mocks/bodys';

jest.mock('loglevel', () => ({
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
}));

jest.mock('../../../src/infra/discount', () => jest.fn(() => 0));

describe("Checkout Controller", () => {

  test('Should return error when products are not passed', async () => {
    const response = await checkout(
      mockRequest({}, emptyBody),
      mockResponse()
    );

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ message: "Products are required" });
  });

  test('Should return error when products are empty', async () => {
    const response = await checkout(
      mockRequest({}, bodyWithZeroProducts),
      mockResponse()
    );

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({ message: "Products are required" });
  });

  test("Should return a expected body when the request is success", async () => {
    const response = await checkout(
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

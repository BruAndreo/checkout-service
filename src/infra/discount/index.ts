import { ChannelCredentials } from "@grpc/grpc-js";

import { DiscountClient } from "../../../proto/discount_grpc_pb"
import { GetDiscountRequest } from "../../../proto/discount_pb";

export function getDiscountService(productId: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const client = new DiscountClient('localhost:50051', ChannelCredentials.createInsecure());

    client.getDiscount((new GetDiscountRequest()).setProductid(productId), (err, discount) => {
      if (err) {
        console.log("Erro: ", err);
        reject(err);
      }

      const percentenge = discount.toObject().percentage.toPrecision(1);

      client.close();
      resolve(Number(percentenge));
    });
  });
}

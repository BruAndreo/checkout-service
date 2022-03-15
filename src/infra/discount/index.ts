import { ChannelCredentials } from "@grpc/grpc-js";
import log from "loglevel";

import { DiscountClient } from "../../../proto/discount_grpc_pb"
import { GetDiscountRequest } from "../../../proto/discount_pb";

export function getDiscountService(productId: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const client = new DiscountClient('localhost:50051', ChannelCredentials.createInsecure());

    client.getDiscount((new GetDiscountRequest()).setProductid(productId), (err, discount) => {
      if (err) {
        log.error(err);
        return reject(err);
      }

      const percentenge = discount.toObject().percentage.toPrecision(1);
      log.debug("Discount service works");

      client.close();
      return resolve(Number(percentenge));
    });
  });
}

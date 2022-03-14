// package: discount
// file: discount.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as discount_pb from "./discount_pb";

interface IDiscountService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getDiscount: IDiscountService_IGetDiscount;
}

interface IDiscountService_IGetDiscount extends grpc.MethodDefinition<discount_pb.GetDiscountRequest, discount_pb.GetDiscountResponse> {
    path: "/discount.Discount/GetDiscount";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<discount_pb.GetDiscountRequest>;
    requestDeserialize: grpc.deserialize<discount_pb.GetDiscountRequest>;
    responseSerialize: grpc.serialize<discount_pb.GetDiscountResponse>;
    responseDeserialize: grpc.deserialize<discount_pb.GetDiscountResponse>;
}

export const DiscountService: IDiscountService;

export interface IDiscountServer extends grpc.UntypedServiceImplementation {
    getDiscount: grpc.handleUnaryCall<discount_pb.GetDiscountRequest, discount_pb.GetDiscountResponse>;
}

export interface IDiscountClient {
    getDiscount(request: discount_pb.GetDiscountRequest, callback: (error: grpc.ServiceError | null, response: discount_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
    getDiscount(request: discount_pb.GetDiscountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: discount_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
    getDiscount(request: discount_pb.GetDiscountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: discount_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
}

export class DiscountClient extends grpc.Client implements IDiscountClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getDiscount(request: discount_pb.GetDiscountRequest, callback: (error: grpc.ServiceError | null, response: discount_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
    public getDiscount(request: discount_pb.GetDiscountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: discount_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
    public getDiscount(request: discount_pb.GetDiscountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: discount_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
}

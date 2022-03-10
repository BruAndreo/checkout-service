import { Request } from 'express';

export default (headers: any = {}, body: any = {}) => {
  return {
    headers: { ...headers },
    body: { ...body }
  } as any as Request;
};

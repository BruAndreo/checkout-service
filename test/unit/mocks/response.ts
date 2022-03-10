import { Response } from 'express';


export default () => {
  const res = {} as any as Response;

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};

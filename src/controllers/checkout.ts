import { Request, Response } from "express";

export default function checkout(req: Request, res: Response): Response {
  return res.json({ message: "checkout" });
}

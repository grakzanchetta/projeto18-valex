import { NextFunction, Request, Response } from "express";

export default async function errorHandlerMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  {
    if (error.type === "unauthorized")
      return res.status(401).send(error.message);
    if (error.type === "conflict") return res.status(409).send(error.message);
    if (error.type === "not_found") return res.status(404).send(error.message);
  }
  console.log(error);
  res.sendStatus(500);
}

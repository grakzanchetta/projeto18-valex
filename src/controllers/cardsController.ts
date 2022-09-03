import { Request, Response } from "express";
import * as companiesServices from "../services/companiesAuthenticationServices";
import * as cardsServices from "../services/cardCreationServices";

async function createCard(req: Request, res: Response) {
  if (!req.headers["x-api-key"]) return res.sendStatus(418);
  const apiKey = req.headers["x-api-key"].toString();
  const { employeeId, type } = req.body;

  companiesServices.validateApiKey(apiKey);
  cardsServices.createCard(employeeId, type);

  res.sendStatus(201);
}

export { createCard };

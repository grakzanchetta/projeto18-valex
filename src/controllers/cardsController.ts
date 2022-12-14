import { Request, Response } from "express";
import * as companiesServices from "../services/companiesAuthenticationServices";
import * as cardCreationServices from "../services/cardCreationServices";
import * as cardManagementServices from "../services/cardManagementServices";

async function createCard(req: Request, res: Response) {
  if (!req.headers["x-api-key"]) return res.sendStatus(418);
  const apiKey = req.headers["x-api-key"].toString();
  const { employeeId, type } = req.body;

  await companiesServices.validateApiKey(apiKey);
  const cardData = await cardCreationServices.createCard(Number(employeeId), type);
  res.status(201).send(cardData);
}

async function activateCard(req: Request, res: Response) {
  const cardId = Number(req.params.id);
  const cardData = req.body;

  await cardManagementServices.activateCard(
    cardId,
    cardData.securityCode,
    cardData.password
  );
  res.sendStatus(201);
}

async function blockCard(req: Request, res: Response) {
  const cardId = Number(req.params.id);
  const cardData = req.body;

  await cardManagementServices.blockCard(cardId, cardData.password);
  res.sendStatus(201);
}

async function unblockCard(req: Request, res: Response) {
  const cardId = Number(req.params.id);
  const cardData = req.body;

  await cardManagementServices.unblockCard(cardId, cardData.password);
  res.sendStatus(201);
}

export { createCard, activateCard, blockCard, unblockCard };

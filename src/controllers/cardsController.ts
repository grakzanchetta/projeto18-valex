import { Request, Response } from "express";
import * as companiesServices from "../services/companiesAuthenticationServices";
import * as cardCreationServices from "../services/cardCreationServices";
import * as cardManagementServices from "../services/cardManagementServices";

async function createCard(req: Request, res: Response) {
  if (!req.headers["x-api-key"]) return res.sendStatus(418);
  const apiKey = req.headers["x-api-key"].toString();
  const { employeeId, type } = req.body;

  await companiesServices.validateApiKey(apiKey);
  await cardCreationServices.createCard(Number(employeeId), type);

  res.sendStatus(201);
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

async function findCardByIdAndDecrypted(req: Request, res: Response) {
  const cardsId = Number(req.params.id);
  const searchedCard = await cardManagementServices.findcardByIdAndDecrypted(
    cardsId
  );

  res.status(200).send(searchedCard);
}

export { createCard, findCardByIdAndDecrypted, activateCard };

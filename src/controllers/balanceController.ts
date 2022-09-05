import { Request, Response } from "express";
import * as companiesServices from "../services/companiesAuthenticationServices";
import * as cardManagementServices from "../services/cardManagementServices";
import * as cardBalanceServices from "../services/cardBalanceServices";

export async function createRecharge(req: Request, res: Response) {
  if (!req.headers["x-api-key"]) return res.sendStatus(418);
  const apiKey = req.headers["x-api-key"].toString();
  const cardId = req.body.cardId;
  const rechargeInfo = req.body;

  await companiesServices.validateApiKey(apiKey);
  const cardData = await cardManagementServices.findcardByIdAndDecrypted(
    cardId
  );
  await cardManagementServices.isActive(cardData.isBlocked);
  await cardManagementServices.verifyExpirationDate(cardData.expirationDate);

  await cardBalanceServices.insertRecharge(rechargeInfo);
  res.sendStatus(201);
}

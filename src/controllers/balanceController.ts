import { Request, Response } from "express";
import * as companiesServices from "../services/companiesAuthenticationServices";
import * as cardManagementServices from "../services/cardManagementServices";
import * as cardBalanceServices from "../services/cardBalanceServices";

async function createRecharge(req: Request, res: Response) {
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

async function getBalanceCard(req: Request, res: Response) {
  const cardId = Number(req.params.id);

  const searchedCard = await cardManagementServices.findCard(cardId);
  const searchedRecharges = await cardBalanceServices.getRecharges(cardId);
  const cardBalance = await cardBalanceServices.balanceCard(cardId);

  const cardSummary = {
    balance: cardBalance,
    //transactions: searchedPayments,
    recharges: searchedRecharges,
  };
  res.status(200).send(cardSummary);
}

export { getBalanceCard, createRecharge };

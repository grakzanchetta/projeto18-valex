import * as rechargeRepository from "../repositories/rechargeRepository";
import * as purchaseRepository from "../repositories/paymentRepository";
import * as businessRepository from "../repositories/businessRepository";
import * as cardRepository from "../repositories/cardRepository";
import dayjs from "dayjs";

async function insertRecharge(
  rechargeData: rechargeRepository.RechargeInsertData
) {
  await rechargeRepository.insert(rechargeData);
}

async function insertPurchase(
  purchaseData: purchaseRepository.PaymentInsertData
) {
  await purchaseRepository.insert(purchaseData);
}

async function verifyExistingBusiness(businessId: number) {
  const business = await businessRepository.findById(businessId);
  if (!business) {
    throw { type: "unauthorized", message: "business doesn't exist!" };
  }
}

async function verifyCardBusinessType(businessId: number, cardId: number) {
  const business = await businessRepository.findById(businessId);
  const card = await cardRepository.findById(cardId);

  if (business.type !== card.type) {
    throw { type: "unauthorized", message: "wrong card type " };
  }
}

async function getRecharges(id: number) {
  const searchedRecharges = await rechargeRepository.findByCardId(id);

  const recharges = searchedRecharges.map((recharge) => ({
    ...recharge,
    timestamp: dayjs(recharge.timestamp).format("DD/MM/YYYY"),
  }));

  return recharges;
}

export async function getPurchases(id: number) {
  const searchedPurchases = await purchaseRepository.findByCardId(id);

  const purchases = searchedPurchases.map((purchase) => ({
    ...purchase,
    timestamp: dayjs(purchase.timestamp).format("DD/MM/YYYY"),
  }));

  return purchases;
}

async function balanceCard(id: number) {
  const foundRecharges = await getRecharges(id);
  let rechargesSum = 0;
  for (let i = 0; i < foundRecharges.length; i++) {
    rechargesSum += foundRecharges[i].amount;
  }
  const foundPurchases = await getPurchases(id);
  let purchasesSum = 0;
  for (let i = 0; i < foundPurchases.length; i++) {
    purchasesSum += foundPurchases[i].amount;
  }

  const balance = rechargesSum - purchasesSum;
  return balance;
}

async function verifyCredit(credit: Number, amount: Number) {
  if (credit < amount) {
    throw { type: "unauthorized", message: "insufficient funds" };
  }
}

export {
  insertRecharge,
  getRecharges,
  balanceCard,
  insertPurchase,
  verifyExistingBusiness,
  verifyCardBusinessType,
  verifyCredit,
};

import * as rechargeRepository from "../repositories/rechargeRepository";
import * as cardRepository from "../repositories/cardRepository";
import dayjs from "dayjs";
import { timeStamp } from "console";

async function insertRecharge(
  rechargeData: rechargeRepository.RechargeInsertData
) {
  await rechargeRepository.insert(rechargeData);
}

async function getRecharges(id: number) {
  const searchedRecharges = await rechargeRepository.findByCardId(id);

  const recharges = searchedRecharges.map((recharge) => ({
    ...recharge,
    timestamp: dayjs(recharge.timestamp).format("DD/MM/YYYY"),
  }));

  return recharges;
}

async function balanceCard(id: number) {
  const foundRecharges = await getRecharges(id);
  let rechargesSum = 0;
  for (let i = 0; i < foundRecharges.length; i++) {
    rechargesSum += foundRecharges[i].amount;
  }
  console.log(rechargesSum);
  return rechargesSum;
}

export { insertRecharge, getRecharges, balanceCard };

import * as rechargeRepository from "../repositories/rechargeRepository";

export async function insertRecharge(
  rechargeData: rechargeRepository.RechargeInsertData
) {
  await rechargeRepository.insert(rechargeData);
}

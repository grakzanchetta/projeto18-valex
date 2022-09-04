import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import * as cardRepository from "../repositories/cardRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import * as employeesServices from "./employeeManagementServices";

const cryptr = new Cryptr("dummyPassword");

async function activateCard(cardId: number, cvc: string, password: any) {
  const cardData = await findcardByIdAndDecrypted(cardId);
  await verifyExpirationDate(cardData.expirationDate);
  await verifyOlderActivation(cardData.password);
  await verifyCVC(cardId, cvc);
  const hashedPassword = bcrypt.hashSync(password, 10);

  await cardRepository.update(cardId, { password: hashedPassword });
  console.log(cardData);
}

async function findcardByIdAndDecrypted(cardId: number) {
  const card = await cardRepository.findById(cardId);
  if (!card)
    throw {
      type: "not_found",
      message: `"card with an id ${cardId} doesn't exist! Try another id.`,
    };
  card.securityCode = cryptr.decrypt(card.securityCode);
  return card;
}

async function verifyExpirationDate(expirationDate: string) {
  const isExpired = dayjs(expirationDate).isBefore(
    dayjs(Date.now()).format("MM-YY")
  );
  if (isExpired) {
    throw {
      type: "unauthorized",
      message: `card expired. It cannot be activated`,
    };
  }
}

async function verifyOlderActivation(password: any) {
  if (password) {
    throw {
      type: "unauthorized",
      message: "card already active",
    };
  }
}

async function verifyCVC(cardId: number, cvc: string) {
  const card = await findcardByIdAndDecrypted(cardId);
  if (card.securityCode !== cvc) {
    throw {
      type: "unauthorized",
      message: "wrong cvc",
    };
  }
}

export { findcardByIdAndDecrypted, activateCard };

import Cryptr from "cryptr";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import * as cardRepository from "../repositories/cardRepository";

const cryptr = new Cryptr("dummyPassword");

async function activateCard(cardId: number, cvc: string, password: any) {
  const cardData = await findcardByIdAndDecrypted(cardId);
  await verifyExpirationDate(cardData.expirationDate);
  await verifyOlderActivation(cardData.password);
  await verifyCVC(cardId, cvc);
  const hashedPassword = bcrypt.hashSync(password, 10);

  await cardRepository.update(cardId, { password: hashedPassword });
  await cardRepository.update(cardId, { isBlocked: false });
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

async function blockCard(cardId: number, password: string) {
  const cardData = await findcardByIdAndDecrypted(cardId);
  await verifyExpirationDate(cardData.expirationDate);
  if (cardData.isBlocked === true) {
    throw {
      type: "unauthorized",
      message: `card with an id ${cardId} already blocked.`,
    };
  }
  await validatePassword(password, String(cardData.password));
  await cardRepository.update(cardId, { isBlocked: true });
}

async function unblockCard(cardId: number, password: string) {
  const cardData = await findcardByIdAndDecrypted(cardId);
  await verifyExpirationDate(cardData.expirationDate);
  if (cardData.isBlocked === false) {
    throw {
      type: "unauthorized",
      message: `card with an id ${cardId} isn't blocked.`,
    };
  }
  await validatePassword(password, String(cardData.password));
  await cardRepository.update(cardId, { isBlocked: false });
}

async function isActive(active: boolean) {
  if (active === true) {
    throw {
      type: "unauthorized",
      message: `card is either blocked or inactive`,
    };
  }
}

async function verifyExpirationDate(expirationDate: string) {
  const isExpired = dayjs(expirationDate).isBefore(
    dayjs(Date.now()).format("MM-YY")
  );
  if (isExpired) {
    throw {
      type: "unauthorized",
      message: `card expired. It cannot be activated, blocked, unblocked or recharged`,
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

async function validatePassword(
  password: string,
  searchedCardPassword: string
) {
  const isPassword = bcrypt.compareSync(password, searchedCardPassword);
  if (!isPassword) {
    throw {
      type: "unauthorized",
      message: "wrong password",
    };
  }
}

export {
  findcardByIdAndDecrypted,
  activateCard,
  blockCard,
  unblockCard,
  isActive,
  verifyExpirationDate,
};

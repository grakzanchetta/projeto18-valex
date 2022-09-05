import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
import dayjs from "dayjs";
import * as cardRepository from "../repositories/cardRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import * as employeesServices from "./employeeManagementServices";

const cryptr = new Cryptr("dummyPassword");

async function createCard(
  employeeId: number,
  type: cardRepository.TransactionTypes
) {
  await employeesServices.findEmployeeById(employeeId);
  await validateCardType(employeeId, type);
  const cardData = await createCardData(employeeId, type);
  await cardRepository.insert(cardData);
  const cardCVC = decryptCardCVC(cardData.securityCode);
  const message = `Your Security Code is ${cardCVC}. Do not lose it... seriously. We don't have any means to retrieve that information.`;

  return { cardData, message };
}

async function validateCardType(
  employeeId: number,
  type: cardRepository.TransactionTypes
) {
  const cardType = await cardRepository.findByTypeAndEmployeeId(
    type,
    employeeId
  );

  if (cardType) {
    throw {
      type: "conflict",
      message: `employee with an id ${employeeId} already has a card of type ${type}`,
    };
  }
}

function createCardNumber() {
  return faker.finance.creditCardNumber("mastercard");
}

async function createCardUserName(employeeId: number) {
  const employee = await employeeRepository.findById(employeeId);
  if (!employee) {
    throw {
      type: "not_found",
      message: `"employee with an id ${employeeId} doesn't exist! Try another id.`,
    };
  }
  const employeeName = employee.fullName;
  let arrName = employeeName.split(" ");
  let employeeFormattedName = [];
  employeeFormattedName.push(arrName[0]);

  for (let i = 1; i < arrName.length - 1; i++) {
    if (arrName[i].length > 3) {
      employeeFormattedName.push(arrName[i][0]);
    }
  }
  employeeFormattedName.push(arrName[arrName.length - 1]);
  const employeeCardName = employeeFormattedName.join(" ").toUpperCase();

  return employeeCardName;
}

function createCardExpirationDate() {
  return dayjs(Date.now()).add(5, "y").format("MM-YY");
}

function encryptCardCVC() {
  const cardCVV = faker.finance.creditCardCVV();
  const encryptedString = cryptr.encrypt(cardCVV);
  return encryptedString;
}

function decryptCardCVC(encryptedString: string) {
  const decryptedString = cryptr.decrypt(encryptedString);
  return decryptedString;
}

async function createCardData(
  employeeId: number,
  type: cardRepository.TransactionTypes
) {
  const cardNumber = createCardNumber();
  const cardUser = await createCardUserName(employeeId);
  const cardCVC = encryptCardCVC();
  const cardExpirationDate = createCardExpirationDate();

  const cardData = {
    employeeId,
    number: cardNumber,
    cardholderName: cardUser,
    securityCode: cardCVC,
    expirationDate: cardExpirationDate,
    isVirtual: false,
    isBlocked: true,
    type: type,
  };
  return cardData;
}

export { validateCardType, createCard };

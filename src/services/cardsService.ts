import * as cards from "../repositories/cardRepository";

// tipo exportado do repositório dado
async function validateCardType(
  type: cards.TransactionTypes,
  employeeId: number
) {
  const cardType = await cards.findByTypeAndEmployeeId(type, employeeId);
  if (cardType) {
    throw {
      type: "conflict",
      message: `employee with an id ${employeeId} already has a card of type ${type}`,
    };
  }
}

export { validateCardType };

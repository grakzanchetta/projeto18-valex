import Joi from "joi";

const cardRechargeSchema = Joi.object({
  cardId: Joi.number().positive().required(),
  amount: Joi.number().positive().required(),
});

export { cardRechargeSchema };

import Joi from "joi";
const cardPaymentSchema = Joi.object({
  cardId: Joi.number().positive().required(),
  password: Joi.string()
    .pattern(/^[0-9]{4}$/)
    .required(),
  businessId: Joi.number().integer().required(),
  amount: Joi.number().integer().positive().required(),
});

export { cardPaymentSchema };

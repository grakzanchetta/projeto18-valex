import Joi from "joi";

const cardCreationSchema = Joi.object({
  employeeId: Joi.number().integer().positive().required(),
  type: Joi.string()
    .valid("groceries", "restaurant", "transport", "education", "health")
    .required(),
});

const cardActivationSchema = Joi.object({
  securityCode: Joi.string()
    .pattern(/^[0-9]{3}$/)
    .required(),
  password: Joi.string()
    .pattern(/^[0-9]{4}$/)
    .required(),
});

const cardManageSchema = Joi.object({
  password: Joi.string()
    .pattern(/^[0-9]{4}$/)
    .required(),
});

export { cardCreationSchema, cardActivationSchema, cardManageSchema };

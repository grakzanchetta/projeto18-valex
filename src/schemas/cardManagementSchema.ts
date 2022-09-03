import Joi from "joi";

const cardCreationSchema = Joi.object({
  employeeId: Joi.number().integer().required(),
  type: Joi.string()
    .valid("groceries", "restaurant", "transport", "education", "health")
    .required(),
});

export { cardCreationSchema };

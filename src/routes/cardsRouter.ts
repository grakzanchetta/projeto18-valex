import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator";
import { cardCreationSchema } from "../schemas/cardManagementSchema";
import * as cardsController from "../controllers/cardsController";

const cardsRouter = Router();

cardsRouter.post(
  "/cards",
  validateSchema(cardCreationSchema),
  cardsController.createCard
);

export default cardsRouter;

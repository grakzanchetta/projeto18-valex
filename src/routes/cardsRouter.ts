import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator";
import {
  cardCreationSchema,
  cardActivationSchema,
  cardManageSchema,
} from "../schemas/cardManagementSchema";
import * as cardsController from "../controllers/cardsController";
import * as balanceController from "../controllers/balanceController";

const cardsRouter = Router();

cardsRouter.post(
  "/cards",
  validateSchema(cardCreationSchema),
  cardsController.createCard
);

cardsRouter.get("/cards/:id", balanceController.getBalanceCard);
cardsRouter.get("/decrypt/:id", cardsController.findCardByIdAndDecrypted); //fiz essa rota apenas para ver os CVCs

cardsRouter.put(
  "/cards/:id",
  validateSchema(cardActivationSchema),
  cardsController.activateCard
);

cardsRouter.put(
  "/block/:id",
  validateSchema(cardManageSchema),
  cardsController.blockCard
);

cardsRouter.put(
  "/unblock/:id",
  validateSchema(cardManageSchema),
  cardsController.unblockCard
);

export default cardsRouter;

import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator";
import { cardRechargeSchema } from "../schemas/cardRechargeSchema";
import { cardPaymentSchema } from "../schemas/cardPaymentSchema";
import * as balanceController from "../controllers/balanceController";

const balanceRouter = Router();

balanceRouter.post(
  "/recharge",
  validateSchema(cardRechargeSchema),
  balanceController.createRecharge
);

balanceRouter.post(
  "/purchase",
  validateSchema(cardPaymentSchema),
  balanceController.createPurchase
);

export default balanceRouter;

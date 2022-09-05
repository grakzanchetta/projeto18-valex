import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator";
import { cardRechargeSchema } from "../schemas/cardRechargeSchema";
import * as balanceController from "../controllers/balanceController";

const balanceRouter = Router();

balanceRouter.post(
  "/recharge",
  validateSchema(cardRechargeSchema),
  balanceController.createRecharge
);

export default balanceRouter;

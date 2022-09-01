import { Router } from "express";
import * as controller from "../controllers/purchasesController"

const purchasesRouter = Router();

purchasesRouter.get('/purchases', controller.getPurchase);
purchasesRouter.post('/purchases', controller.postPurchase);

export default purchasesRouter;
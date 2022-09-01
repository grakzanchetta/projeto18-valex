import { Router } from "express";
import * as controller from "../controllers/rechargesController"

const rechargesRouter = Router();

rechargesRouter.get('/recharges', controller.getRecharge);
rechargesRouter.post('/recharges', controller.postRecharge);

export default rechargesRouter;
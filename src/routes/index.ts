import { Router } from "express";
import balanceRouter from "./balanceRouter";
import cardsRouter from "./cardsRouter";

const router = Router();

router.use(cardsRouter);
router.use(balanceRouter);

export default router;

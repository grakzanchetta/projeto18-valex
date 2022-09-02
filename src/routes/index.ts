import { Router } from "express";
import cardsRouter from "./cardsRouter";


const router = Router();

router.use(cardsRouter);


export default router;
import { Router } from "express";
import * as controller from "../controllers/cardsController"

const cardsRouter = Router();

cardsRouter.get('/cards', controller.getCard);
cardsRouter.post('/cards', controller.postCard);

export default cardsRouter;
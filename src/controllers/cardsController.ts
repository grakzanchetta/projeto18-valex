import { Request, Response } from "express";
import * as cardsService from "../services/cardsService"

export async function postCard(req: Request, res: Response){
    res.status(200).send('rota post card')
}

export async function getCard(req: Request, res: Response){

   
    const result = await cardsService.getCard();
    console.log(result)
    res.status(200).send(result)

}
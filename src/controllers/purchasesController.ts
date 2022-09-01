import { Request, Response } from "express";

export async function postPurchase(req: Request, res: Response){
    res.status(200).send('rota post purchase')
}

export async function getPurchase(req: Request, res: Response){
    res.status(200).send('rota get purchase')

}
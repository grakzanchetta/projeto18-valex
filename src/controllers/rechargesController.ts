import { Request, Response } from "express";

export async function postRecharge(req: Request, res: Response){
    res.status(200).send('rota post recharge')
}

export async function getRecharge(req: Request, res: Response){
    res.status(200).send('rota get recharge')

}
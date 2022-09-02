import { Request, Response } from "express";
import * as companiesServices from "../services/companiesService";
import * as employeesServices from "../services/employeesService";
import * as cardsServices from "../services/cardsService";

async function createCard(req: Request, res: Response) {
  if (!req.headers["x-api-key"]) return;
  const apiKey = req.headers["x-api-key"].toString();
  const { employeeId, type } = req.body;

  companiesServices.validateApiKey(apiKey);
  employeesServices.findEmployeeById(employeeId);
  cardsServices.validateCardType(employeeId, type);

  res.sendStatus(200);
}
export { createCard };

import * as companies from "../repositories/companyRepository";

async function validateApiKey(apiKey: string) {
  const company = await companies.findByApiKey(apiKey);
  if (!company) {
    throw { type: "unauthorized", message: "invalid api key" };
  }
}

export { validateApiKey };

import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import router from "./routes/index";
import dotenv from "dotenv";
import errorHandlerMiddleware from "./middlewares/errorHandler";

dotenv.config();
const app = express();

app.use(cors());
app.use(json());

app.use(router);
app.use(errorHandlerMiddleware);
const PORT: number = Number(process.env.PORT) || 5009;

app.listen(PORT, () =>
  console.log(`Server rolling up n' down like a rollercoaster on port: ${PORT}`)
);

import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index";

const app = express();
dotenv.config();

app.use(cors());
app.use(json());
app.use(router)

const PORT: number = Number(process.env.PORT) || 5009;

app.listen(PORT, () => console.log(`Server rolling up n' down like a rollercoaster on port: ${PORT}`))
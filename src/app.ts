import { toNodeHandler } from "better-auth/node";
import express, { Application } from "express";
import { auth } from "./lib/auth";
import cors from "cors";

const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL,
    credentials: true
}))

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.get("/", (req, res)=> {
    res.send("Welcome To FoodHub!");
})

export default app;

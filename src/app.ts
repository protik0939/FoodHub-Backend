import { toNodeHandler } from "better-auth/node";
import express, { Application } from "express";
import { auth } from "./lib/auth";
import cors from "cors";
import { mealRouter } from "./modules/meal/meal.route";
import { categoryRouter } from "./modules/category/category.route";

const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL,
    credentials: true
}))

app.use(express.json());

app.use("/meals", mealRouter);
app.use("/categories", categoryRouter);

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.get("/", (req, res)=> {
    res.send("Welcome To FoodHub!");
})

export default app;

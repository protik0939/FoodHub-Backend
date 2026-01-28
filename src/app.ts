import { toNodeHandler } from "better-auth/node";
import express, { Application } from "express";
import { auth } from "./lib/auth";
import cors from "cors";
import { mealRouter } from "./modules/meal/meal.route";
import { categoryRouter } from "./modules/category/category.route";
import { providerRouter } from "./modules/profile/providerProfile/provider.route";
import { adminRouter } from "./modules/profile/adminProfile/admin.route";
import { customerRouter } from "./modules/profile/customerProfile/customer.route";
import { orderRouter } from "./modules/order/order.route";
import { reviewRouter } from "./modules/review/review.route";

const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL,
    credentials: true
}))

app.use(express.json());

app.use("/meals", mealRouter);
app.use("/categories", categoryRouter);
app.use("/profile/providers", providerRouter);
app.use("/profile/admins", adminRouter);
app.use("/profile/customers", customerRouter);
app.use("/orders", orderRouter);
app.use("/reviews", reviewRouter);


app.all('/api/auth/{*any}', toNodeHandler(auth));

app.get("/", (req, res)=> {
    res.send("Welcome To FoodHub!");
})

export default app;

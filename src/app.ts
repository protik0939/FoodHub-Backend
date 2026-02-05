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
import { roleSelectionRouter } from "./modules/roleSelection/role.route";
import { adminRoute } from "./modules/admin/admin.route";

const app: Application = express();

const allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL, // Production frontend URL
].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed =
        allowedOrigins.includes(origin)

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);

app.use(express.json());

app.use("/meals", mealRouter);
app.use("/categories", categoryRouter);
app.use("/profile/providers", providerRouter);
app.use("/profile/admins", adminRouter);
app.use("/profile/customers", customerRouter);
app.use("/orders", orderRouter);
app.use("/reviews", reviewRouter);
app.use("/select-role", roleSelectionRouter);
app.use("/admin", adminRoute);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.get("/", (req, res) => {
  res.send("Welcome To FoodHub!");
});

export default app;

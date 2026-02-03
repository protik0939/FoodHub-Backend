import express, { Router } from 'express';
import { MealController } from './meal.controller';
import auth, { UserRole } from '../../middlewares/auth';


const router = express.Router();

router.post("/", auth(UserRole.ADMIN, UserRole.PROVIDER), MealController.createMeal);
router.get("/", MealController.getAllMeals);
router.get("/provider/:providerId", auth(UserRole.PROVIDER, UserRole.ADMIN), MealController.getMealsByProviderId);
router.get("/:id", MealController.getMealById);
router.put("/:id", auth(UserRole.ADMIN, UserRole.PROVIDER), MealController.updateMeal);
router.delete("/:id", auth(UserRole.ADMIN, UserRole.PROVIDER), MealController.deleteMeal);

export const mealRouter: Router = router;
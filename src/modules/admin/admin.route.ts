import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();

router.get("/dashboard/stats", adminController.getDashboardStats);
router.get("/customers", adminController.getAllCustomers);
router.get("/providers", adminController.getAllProviders);
router.patch("/users/:userId/status", adminController.updateAccountStatus);
router.get("/orders", adminController.getAllOrders);
router.patch("/orders/:orderId/status", adminController.updateOrderStatus);
router.delete("/orders/:orderId", adminController.deleteOrder);
router.get("/meals", adminController.getAllMeals);
router.delete("/meals/:mealId", adminController.deleteMeal);
router.get("/categories", adminController.getAllCategories);
router.post("/categories", adminController.createCategory);
router.patch("/categories/:categoryId", adminController.updateCategory);
router.delete("/categories/:categoryId", adminController.deleteCategory);

export const adminRoute = router;

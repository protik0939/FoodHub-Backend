import express, { Router } from 'express';
import { orderController } from './order.controller';
import auth, { UserRole } from '../../middlewares/auth';


const router = express.Router();
router.post("/", auth(UserRole.CUSTOMER), orderController.createOrder)
router.get("/provider/:providerId", auth(UserRole.PROVIDER, UserRole.ADMIN), orderController.getOrdersByProviderId)
router.get("/customer/:userId", auth(UserRole.CUSTOMER, UserRole.ADMIN), orderController.getOrdersByUserId)
router.patch("/:orderId", auth(UserRole.PROVIDER, UserRole.ADMIN), orderController.updateOrderStatus)

export const orderRouter: Router = router;
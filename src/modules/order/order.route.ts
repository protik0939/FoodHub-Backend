import express, { Router } from 'express';
import { orderController } from './order.controller';
import auth, { UserRole } from '../../middlewares/auth';


const router = express.Router();
router.post("/", auth(UserRole.CUSTOMER), orderController.createOrder)

export const orderRouter: Router = router;
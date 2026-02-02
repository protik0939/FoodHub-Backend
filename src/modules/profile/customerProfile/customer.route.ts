import express, { Router } from 'express';
import { customerController } from './customer.controller';
import auth, { UserRole } from '../../../middlewares/auth';


const router = express.Router();
router.post("/", auth(UserRole.CUSTOMER), customerController.createCustomer)
router.get("/:id", auth(UserRole.CUSTOMER), customerController.getCustomer)
router.put("/:id", auth(UserRole.CUSTOMER), customerController.updateCustomer)
router.put("/:id/image", auth(UserRole.CUSTOMER), customerController.updateCustomerImage)

export const customerRouter: Router = router;
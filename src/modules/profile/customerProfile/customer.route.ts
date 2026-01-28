import express, { Router } from 'express';
import { customerController } from './customer.controller';
import auth, { UserRole } from '../../../middlewares/auth';


const router = express.Router();
router.post("/", auth(UserRole.CUSTOMER), customerController.createCustomer)

export const customerRouter: Router = router;
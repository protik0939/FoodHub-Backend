import express, { Router } from 'express';
import { customerController } from './customer.controller';


const router = express.Router();
router.post("/", customerController.createCustomer)

export const customerRouter: Router = router;
import express, { Router } from 'express';
import { adminController } from './admin.controller';


const router = express.Router();
router.post("/", adminController.createAdmin)

export const adminRouter: Router = router;
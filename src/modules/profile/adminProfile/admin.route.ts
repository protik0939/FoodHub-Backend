import express, { Router } from 'express';
import { adminController } from './admin.controller';
import auth, { UserRole } from '../../../middlewares/auth';


const router = express.Router();
router.post("/", auth(UserRole.ADMIN), adminController.createAdmin)

export const adminRouter: Router = router;
import express, { Router } from 'express';
import { adminController } from './admin.controller';
import auth, { UserRole } from '../../../middlewares/auth';


const router = express.Router();
router.post("/", auth(UserRole.ADMIN), adminController.createAdmin)
router.get("/:id", auth(UserRole.ADMIN), adminController.getAdmin)
router.put("/:id", auth(UserRole.ADMIN), adminController.updateAdmin)
router.put("/:id/image", auth(UserRole.ADMIN), adminController.updateAdminImage)

export const adminRouter: Router = router;
import express, { Router } from 'express';
import { providerController } from './provider.controller';
import auth, { UserRole } from '../../../middlewares/auth';

const router = express.Router();
router.post("/",auth(UserRole.PROVIDER), providerController.createProvider)
router.get("/:id", auth(UserRole.PROVIDER), providerController.getProvider)
router.put("/:id", auth(UserRole.PROVIDER), providerController.updateProvider)
router.put("/:id/image", auth(UserRole.PROVIDER), providerController.updateProviderImage)

export const providerRouter: Router = router;
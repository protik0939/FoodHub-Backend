import express, { Router } from 'express';
import { providerController } from './provider.controller';
import auth, { UserRole } from '../../../middlewares/auth';

const router = express.Router();
router.post("/",auth(UserRole.PROVIDER), providerController.createProvider)

export const providerRouter: Router = router;
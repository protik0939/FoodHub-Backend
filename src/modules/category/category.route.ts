import express ,{ Router } from 'express';
import { categoryController } from './category.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post("/", auth(UserRole.ADMIN, UserRole.PROVIDER), categoryController.createCategory);

export const categoryRouter: Router = router;
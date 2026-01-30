import express, { Router } from 'express';
import { roleSelectionController } from "./role.controller";

const router = express.Router();

router.patch("/", roleSelectionController.updateRole);

export const roleSelectionRouter: Router = router;

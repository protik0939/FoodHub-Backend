import express, { Router } from 'express';
import { reviewController } from './review.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();
router.post("/", auth(UserRole.CUSTOMER, UserRole.ADMIN), reviewController.createReview)
router.get("/meal/:mealId", reviewController.getReviewsByMealId)
router.get("/provider/:providerId", auth(UserRole.PROVIDER, UserRole.ADMIN), reviewController.getReviewsByProviderId)
router.get("/all", auth(UserRole.ADMIN), reviewController.getAllReviews)
router.get("/stats/:mealId", reviewController.getReviewStats)

export const reviewRouter: Router = router;
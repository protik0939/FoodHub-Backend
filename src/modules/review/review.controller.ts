import { Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async(req: Request, res: Response) => {
    try{
        const result = await reviewService.createReview(req.body);
        res.status(201).json(result);
    } catch(e) {
        res.status(400).json({
            error: "Something Went Wrong",
            details: e
        })
    }
}

const getReviewsByMealId = async(req: Request, res: Response) => {
    try{
        const mealId = Array.isArray(req.params.mealId) 
            ? req.params.mealId[0] 
            : req.params.mealId;
        if (mealId) {
            const result = await reviewService.getReviewsByMealId(mealId);
            res.status(200).json(result);
        }
    } catch(e) {
        res.status(400).json({
            error: "Something Went Wrong",
            details: e
        })
    }
}

const getReviewsByProviderId = async(req: Request, res: Response) => {
    try{
        const providerId = Array.isArray(req.params.providerId) 
            ? req.params.providerId[0] 
            : req.params.providerId;
        if (providerId) {
            const result = await reviewService.getReviewsByProviderId(providerId);
            res.status(200).json(result);
        }
    } catch(e) {
        res.status(400).json({
            error: "Something Went Wrong",
            details: e
        })
    }
}

const getAllReviews = async(req: Request, res: Response) => {
    try{
        const result = await reviewService.getAllReviews();
        res.status(200).json(result);
    } catch(e) {
        res.status(400).json({
            error: "Something Went Wrong",
            details: e
        })
    }
}

const getReviewStats = async(req: Request, res: Response) => {
    try{
        const mealId = Array.isArray(req.params.mealId) 
            ? req.params.mealId[0] 
            : req.params.mealId;
        if (mealId) {
            const result = await reviewService.getReviewStats(mealId);
            res.status(200).json(result);
        }
    } catch(e) {
        res.status(400).json({
            error: "Something Went Wrong",
            details: e
        })
    }
}

export const reviewController = {
    createReview,
    getReviewsByMealId,
    getReviewsByProviderId,
    getAllReviews,
    getReviewStats
}
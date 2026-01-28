import { Request, Response } from "express";
import { orderService } from "../order/order.service";
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

export const reviewController = {
    createReview
}
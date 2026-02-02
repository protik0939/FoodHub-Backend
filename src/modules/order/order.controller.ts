import { Request, Response } from "express";
import { orderService } from "./order.service";


const createOrder = async(req: Request, res: Response) => {
    try{
        const result = await orderService.createOrder(req.body);
        res.status(201).json(result);
    } catch(e) {
        res.status(400).json({
            error: "Something Went Wrong",
            details: e
        })
    }
}

const getOrdersByProviderId = async(req: Request, res: Response) => {
    try{
        const providerId = Array.isArray(req.params.providerId) 
            ? req.params.providerId[0] 
            : req.params.providerId;
        if (providerId) {
            const result = await orderService.getOrdersByProviderId(providerId);
            res.status(200).json(result);
        }
    } catch(e) {
        res.status(400).json({
            error: "Something Went Wrong",
            details: e
        })
    }
}

const getOrdersByUserId = async(req: Request, res: Response) => {
    try{
        const userId = Array.isArray(req.params.userId) 
            ? req.params.userId[0] 
            : req.params.userId;
        if (userId) {
            const result = await orderService.getOrdersByUserId(userId);
            res.status(200).json(result);
        }
    } catch(e) {
        res.status(400).json({
            error: "Something Went Wrong",
            details: e
        })
    }
}

export const orderController = {
    createOrder,
    getOrdersByProviderId,
    getOrdersByUserId,
}
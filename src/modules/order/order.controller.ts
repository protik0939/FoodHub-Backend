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

export const orderController = {
    createOrder
}
import { Request, Response } from "express";
import { customerService } from "./customer.service";


const createCustomer = async(req: Request, res: Response) => {
    try{
        const result = await customerService.createCustomer(req.body);
        res.status(201).json(result);
    } catch(e) {
        res.status(400).json({
            error: "Something Went Wrong",
            details: e
        })
    }
}

export const customerController = {
    createCustomer
}
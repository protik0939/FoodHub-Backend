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

const getCustomer = async(req: Request, res: Response) => {
    try{
        const result = await customerService.getCustomer(req.params.id as string);
        res.status(200).json(result);
    }
    catch (err){
        res.status(400).json({
            error: "Something Went Wrong",
            details: err,
        }) 
    }
}

const updateCustomer = async(req: Request, res: Response) => {
    try{
        const result = await customerService.updateCustomer(req.params.id as string, req.body);
        res.status(200).json(result);
    }
    catch (err){
        res.status(400).json({
            error: "Something Went Wrong",
            details: err,
        }) 
    }
}

const updateCustomerImage = async(req: Request, res: Response) => {
    try{
        const result = await customerService.updateCustomerImage(req.params.id as string, req.body.image);
        res.status(200).json(result);
    }
    catch (err){
        res.status(400).json({
            error: "Something Went Wrong",
            details: err,
        }) 
    }
}

export const customerController = {
    createCustomer,
    getCustomer,
    updateCustomer,
    updateCustomerImage,
}
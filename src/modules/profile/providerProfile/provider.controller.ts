
import { Request, Response } from "express";
import { providerService } from "./provider.service";


const createProvider = async(req: Request, res: Response) => {
    try{
        const result = await providerService.createProvider(req.body);
        res.status(201).json(result);
    }
    catch (err){
        res.status(400).json({
            error: "Something Went Wrong",
            details: err,
        }) 
    }
}

export const providerController = {
    createProvider,
}
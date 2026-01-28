import { Request, Response } from "express";
import { adminService } from "./admin.service";


const createAdmin = async(req: Request, res: Response) => {
    try{
        const result = await adminService.createAdmin(req.body);
        res.status(201).json(result);
    } catch(e) {
        res.status(400).json({
            error: "Something Went Wrong",
            details: e
        })
    }
}

export const adminController = {
    createAdmin
}
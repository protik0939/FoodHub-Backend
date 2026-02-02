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

const getAdmin = async(req: Request, res: Response) => {
    try{
        const result = await adminService.getAdmin(req.params.id as string);
        res.status(200).json(result);
    }
    catch (err){
        res.status(400).json({
            error: "Something Went Wrong",
            details: err,
        }) 
    }
}

const updateAdmin = async(req: Request, res: Response) => {
    try{
        const result = await adminService.updateAdmin(req.params.id as string, req.body);
        res.status(200).json(result);
    }
    catch (err){
        res.status(400).json({
            error: "Something Went Wrong",
            details: err,
        }) 
    }
}

const updateAdminImage = async(req: Request, res: Response) => {
    try{
        const result = await adminService.updateAdminImage(req.params.id as string, req.body.image);
        res.status(200).json(result);
    }
    catch (err){
        res.status(400).json({
            error: "Something Went Wrong",
            details: err,
        }) 
    }
}

export const adminController = {
    createAdmin,
    getAdmin,
    updateAdmin,
    updateAdminImage,
}
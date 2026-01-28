import { Request, Response } from "express";
import { categoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e,
    });
  }
};

export const categoryController = {
    createCategory,
}
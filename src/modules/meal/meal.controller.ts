import { Request, Response } from "express";
import { mealService } from "./meal.service";

const createMeal = async (req: Request, res: Response) => {
  try {
    const result = await mealService.createMeal(req.body);
    res.status(201).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "Something Went Wrong",
      details: e,
    });
  }
};

const getAllMeals = async (req: Request, res: Response) => {
  try {
    const result = await mealService.getAllMeals();
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e,
    });
  }
};

const getMealsByProviderId = async (req: Request, res: Response) => {
  try {
    const providerId = Array.isArray(req.params.providerId) 
      ? req.params.providerId[0] 
      : req.params.providerId;
    if (providerId) {
      const result = await mealService.getMealsByProviderId(providerId);
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e,
    });
  }
};

const updateMeal = async (req: Request, res: Response) => {
  try {
    const mealId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    if (!mealId) {
      res.status(400).json({ error: "Meal ID is required" });
      return;
    }
    const result = await mealService.updateMeal(mealId, req.body);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "Something Went Wrong",
      details: e,
    });
  }
};

const deleteMeal = async (req: Request, res: Response) => {
  try {
    const mealId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    if (!mealId) {
      res.status(400).json({ error: "Meal ID is required" });
      return;
    }
    const result = await mealService.deleteMeal(mealId);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "Something Went Wrong",
      details: e,
    });
  }
};

const getMealById = async (req: Request, res: Response) => {
  try {
    const mealId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    if (!mealId) {
      res.status(400).json({ error: "Meal ID is required" });
      return;
    }
    const result = await mealService.getMealById(mealId);
    if (!result) {
      res.status(404).json({ error: "Meal not found" });
      return;
    }
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e,
    });
  }
};

export const MealController = {
  createMeal,
  getAllMeals,
  getMealsByProviderId,
  getMealById,
  updateMeal,
  deleteMeal,
};

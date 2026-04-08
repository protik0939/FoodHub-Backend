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
    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    const categoryId = typeof req.query.categoryId === "string" ? req.query.categoryId : undefined;
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    const hasPagination = Number.isFinite(page) && page > 0 && Number.isFinite(limit) && limit > 0;

    const options = {
      ...(search ? { search } : {}),
      ...(categoryId ? { categoryId } : {}),
      ...(hasPagination ? { page, limit } : {}),
    };

    const result = await mealService.getAllMeals(options);

    if (hasPagination) {
      res.status(200).json(result);
      return;
    }

    res.status(200).json(result.data);
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

const getMealByCategoryId = async (req: Request, res: Response) => {
  try {
    const categoryId = Array.isArray(req.params.categoryId)
      ? req.params.categoryId[0]
      : req.params.categoryId;
    if (!categoryId) {
      res.status(400).json({ error: "Category ID is required" });
      return;
    }
    const result = await mealService.getMealByCategoryId(categoryId);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e,
    });
  }
};

const getSearchSuggestions = async (req: Request, res: Response) => {
  try {
    const query = typeof req.query.q === "string" ? req.query.q : "";
    const result = await mealService.getSearchSuggestions(query);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e,
    });
  }
};

const getTrendingMeals = async (_req: Request, res: Response) => {
  try {
    const result = await mealService.getTrendingMeals();
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e,
    });
  }
};

const getPersonalizedRecommendations = async (req: Request, res: Response) => {
  try {
    const userId = Array.isArray(req.params.userId)
      ? req.params.userId[0]
      : req.params.userId;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const result = await mealService.getPersonalizedRecommendations(userId);
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
  getMealByCategoryId,
  getSearchSuggestions,
  getTrendingMeals,
  getPersonalizedRecommendations,
  updateMeal,
  deleteMeal,
};

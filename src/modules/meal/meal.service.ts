import { Meal } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMeal = async (
  data: Omit<Meal, "id" | "createdAt" | "updatedAt">,
) => {
  const result = await prisma.meal.create({
    data,
  });
  return result;
};

export const mealService = {
  createMeal,
};

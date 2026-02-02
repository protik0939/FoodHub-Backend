import { Meal } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMeal = async (
  data: Omit<Meal, "createdAt" | "updatedAt">,
) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: {
      userId: data.providerId,
    },
  });

  if (!providerProfile) {
    throw new Error("No Provider Profile found!");
  }

  const { id, ...mealData } = data;
  
  const result = await prisma.meal.create({
    data: {
      ...mealData,
      providerId: providerProfile.id,
    },
    include: {
      category: true,
      provider: true,
    },
  });
  return result;
};

const getAllMeals = async () => {
  const result = await prisma.meal.findMany({
    include: {
      category: true,
      provider: {
        select: {
          providerName: true,
          providerEmail: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getMealsByProviderId = async (providerId: string) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: {
      userId: providerId,
    },
  });

  if(!providerProfile){
    return "No Provider Profile found!";
  }

  const result = await prisma.meal.findMany({
    where: {
      providerId: providerProfile.id,
    },
    include: {
      category: true,
      orders: {
        select: {
          id: true,
          status: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const updateMeal = async (mealId: string, data: Partial<Meal>) => {
  const { id, createdAt, updatedAt, ...updateData } = data;
  
  const result = await prisma.meal.update({
    where: {
      id: mealId,
    },
    data: updateData,
    include: {
      category: true,
      provider: true,
    },
  });
  return result;
};

const deleteMeal = async (mealId: string) => {
  const result = await prisma.meal.delete({
    where: {
      id: mealId,
    },
  });
  return result;
};

export const mealService = {
  createMeal,
  getAllMeals,
  getMealsByProviderId,
  updateMeal,
  deleteMeal,
};

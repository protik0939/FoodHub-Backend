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
          user: {
            select: {
              name: true,
              image: true,
              id: true,
            }
          }
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

const getMealById = async (mealId: string) => {
  const result = await prisma.meal.findUnique({
    where: {
      id: mealId,
    },
    include: {
      category: true,
      provider: {
        select: {
          providerName: true,
          providerEmail: true,
        },
      },
    },
  });
  return result;
};

const getMealByCategoryId = async (categoryId: string) => {
  const result = await prisma.meal.findMany({
    where: {
      categoryId: categoryId,
    },
    include: {
      category: true,
      provider: {
        select: {
          providerName: true,
          providerEmail: true,
          user: {
            select: {
              name: true,
              image: true,
              id: true,
            }
          }
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getSearchSuggestions = async (query: string) => {
  if (!query.trim()) {
    return [];
  }

  const meals = await prisma.meal.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { category: { name: { contains: query, mode: "insensitive" } } },
        { provider: { providerName: { contains: query, mode: "insensitive" } } },
      ],
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      provider: {
        select: {
          providerName: true,
        },
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  const normalizedQuery = query.toLowerCase();

  return meals.map((meal) => {
    const nameScore = meal.name.toLowerCase().includes(normalizedQuery) ? 0.55 : 0;
    const categoryScore = meal.category.name.toLowerCase().includes(normalizedQuery)
      ? 0.25
      : 0;
    const providerScore = meal.provider.providerName?.toLowerCase().includes(normalizedQuery)
      ? 0.2
      : 0;

    return {
      id: meal.id,
      label: meal.name,
      category: meal.category.name,
      provider: meal.provider.providerName,
      confidence: Number((nameScore + categoryScore + providerScore).toFixed(2)),
    };
  });
};

const getTrendingMeals = async () => {
  const popularity = await prisma.order.groupBy({
    by: ["mealId"],
    _count: {
      mealId: true,
    },
    orderBy: {
      _count: {
        mealId: "desc",
      },
    },
    take: 12,
  });

  if (!popularity.length) {
    return [];
  }

  const mealIds = popularity.map((item) => item.mealId);
  const meals = await prisma.meal.findMany({
    where: {
      id: {
        in: mealIds,
      },
    },
    include: {
      category: true,
      provider: {
        select: {
          providerName: true,
          providerEmail: true,
          user: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
        },
      },
    },
  });

  const popularityMap = new Map(popularity.map((item) => [item.mealId, item._count.mealId]));

  return meals
    .map((meal) => ({
      ...meal,
      trendScore: popularityMap.get(meal.id) || 0,
    }))
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, 8);
};

const getPersonalizedRecommendations = async (userId: string) => {
  const userOrders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      meal: {
        select: {
          id: true,
          categoryId: true,
          price: true,
        },
      },
    },
    take: 50,
    orderBy: {
      id: "desc",
    },
  });

  if (!userOrders.length) {
    return getTrendingMeals();
  }

  const preferredCategoryCounts = new Map<string, number>();
  const previouslyOrderedMealIds = new Set<string>();
  let totalSpent = 0;

  userOrders.forEach((order) => {
    preferredCategoryCounts.set(
      order.meal.categoryId,
      (preferredCategoryCounts.get(order.meal.categoryId) || 0) + 1,
    );
    previouslyOrderedMealIds.add(order.meal.id);
    totalSpent += order.quantity * order.meal.price;
  });

  const averageTicket = totalSpent / userOrders.length;
  const categoryIds = Array.from(preferredCategoryCounts.keys());

  const candidates = await prisma.meal.findMany({
    where: {
      OR: [
        { categoryId: { in: categoryIds } },
        { id: { notIn: Array.from(previouslyOrderedMealIds) } },
      ],
    },
    include: {
      category: true,
      provider: {
        select: {
          providerName: true,
          providerEmail: true,
          user: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
        },
      },
      _count: {
        select: {
          orders: true,
        },
      },
    },
    take: 40,
    orderBy: {
      createdAt: "desc",
    },
  });

  return candidates
    .map((meal) => {
      const categoryWeight = (preferredCategoryCounts.get(meal.categoryId) || 0) * 1.2;
      const popularityWeight = meal._count.orders * 0.4;
      const priceWeight = Math.max(0, 20 - Math.abs(meal.price - averageTicket));

      return {
        ...meal,
        recommendationScore: Number(
          (categoryWeight + popularityWeight + priceWeight).toFixed(2),
        ),
      };
    })
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, 8);
};

export const mealService = {
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

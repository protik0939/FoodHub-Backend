import { prisma } from "../../lib/prisma";
import { UserStatus, OrderStatus } from "../../../generated/prisma/client";
import {
  calculateSkip,
  formatPaginatedResponse,
  PaginationParams,
} from "../../utils/pagination";


const getAllCustomers = async (params: PaginationParams) => {
  const { page = 1, limit = 10, search, sortBy = "createdAt", sortOrder = "desc" } = params;
  const skip = calculateSkip(page, limit);

  const where = {
    role: "CUSTOMER",
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { email: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [customers, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        role: true,
        accountStatus: true,
        createdAt: true,
        updatedAt: true,
        userProfile: {
          select: {
            firstName: true,
            lastName: true,
            contactNo: true,
            address: true,
          },
        },
        _count: {
          select: {
            orders: true,
          },
        },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return formatPaginatedResponse(customers, total, page, limit);
};


const getAllProviders = async (params: PaginationParams) => {
  const { page = 1, limit = 10, search, sortBy = "createdAt", sortOrder = "desc" } = params;
  const skip = calculateSkip(page, limit);

  const where = {
    role: "PROVIDER",
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { email: { contains: search, mode: "insensitive" as const } },
        {
          providerProfile: {
            providerName: { contains: search, mode: "insensitive" as const },
          },
        },
      ],
    }),
  };

  const [providers, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        role: true,
        accountStatus: true,
        createdAt: true,
        updatedAt: true,
        providerProfile: {
          select: {
            id: true,
            providerName: true,
            providerEmail: true,
            providerContact: true,
            providerAddress: true,
            ownerName: true,
            ownerEmail: true,
            _count: {
              select: {
                meals: true,
              },
            },
          },
        },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return formatPaginatedResponse(providers, total, page, limit);
};


const updateAccountStatus = async (userId: string, status: UserStatus) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== "CUSTOMER" && user.role !== "PROVIDER") {
    throw new Error("Cannot update status for this user type");
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { accountStatus: status },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      accountStatus: true,
    },
  });

  return updated;
};


const getAllOrders = async (params: PaginationParams) => {
  const { page = 1, limit = 10, search, sortBy = "id", sortOrder = "desc" } = params;
  const skip = calculateSkip(page, limit);

  const where = search
    ? {
        OR: [
          { user: { name: { contains: search, mode: "insensitive" as const } } },
          { user: { email: { contains: search, mode: "insensitive" as const } } },
          { meal: { name: { contains: search, mode: "insensitive" as const } } },
        ],
      }
    : {};

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        status: true,
        quantity: true,
        paymentMethod: true,
        userId: true,
        mealId: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            userProfile: {
              select: {
                contactNo: true,
                address: true,
              },
            },
          },
        },
        meal: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
            provider: {
              select: {
                providerName: true,
              },
            },
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    }),
    prisma.order.count({ where }),
  ]);

  return formatPaginatedResponse(orders, total, page, limit);
};

const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: { status },
    select: {
      id: true,
      status: true,
      quantity: true,
      paymentMethod: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      meal: {
        select: {
          name: true,
          price: true,
        },
      },
    },
  });

  return updated;
};

const deleteOrder = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  await prisma.order.delete({
    where: { id: orderId },
  });

  return { message: "Order deleted successfully" };
};


const getAllMeals = async (params: PaginationParams) => {
  const { page = 1, limit = 10, search, sortBy = "createdAt", sortOrder = "desc" } = params;
  const skip = calculateSkip(page, limit);

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } },
          { category: { name: { contains: search, mode: "insensitive" as const } } },
          { provider: { providerName: { contains: search, mode: "insensitive" as const } } },
        ],
      }
    : {};

  const [meals, total] = await Promise.all([
    prisma.meal.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        quantity: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        provider: {
          select: {
            id: true,
            providerName: true,
            providerEmail: true,
          },
        },
        _count: {
          select: {
            orders: true,
          },
        },
      },
    }),
    prisma.meal.count({ where }),
  ]);

  return formatPaginatedResponse(meals, total, page, limit);
};

const deleteMeal = async (mealId: string) => {
  const meal = await prisma.meal.findUnique({
    where: { id: mealId },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  await prisma.meal.delete({
    where: { id: mealId },
  });

  return { message: "Meal deleted successfully" };
};


const getAllCategories = async (params: PaginationParams) => {
  const { page = 1, limit = 10, search, sortBy = "name", sortOrder = "asc" } = params;
  const skip = calculateSkip(page, limit);

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        name: true,
        description: true,
        _count: {
          select: {
            meals: true,
          },
        },
      },
    }),
    prisma.category.count({ where }),
  ]);

  return formatPaginatedResponse(categories, total, page, limit);
};

const createCategory = async (data: { name: string; description?: string }) => {
  const category = await prisma.category.create({
    data,
  });

  return category;
};

const updateCategory = async (
  categoryId: string,
  data: { name?: string; description?: string }
) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const updated = await prisma.category.update({
    where: { id: categoryId },
    data,
  });

  return updated;
};

const deleteCategory = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  await prisma.category.delete({
    where: { id: categoryId },
  });

  return { message: "Category deleted successfully" };
};


const getDashboardStats = async () => {
  const [
    totalCustomers,
    totalProviders,
    totalOrders,
    totalMeals,
    totalCategories,
    recentOrders,
    ordersByStatus,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.user.count({ where: { role: "PROVIDER" } }),
    prisma.order.count(),
    prisma.meal.count(),
    prisma.category.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { id: "desc" },
      select: {
        id: true,
        status: true,
        quantity: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        meal: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    }),
    prisma.order.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    }),
  ]);

  return {
    stats: {
      totalCustomers,
      totalProviders,
      totalOrders,
      totalMeals,
      totalCategories,
    },
    recentOrders,
    ordersByStatus: ordersByStatus.map((item) => ({
      status: item.status,
      count: item._count.status,
    })),
  };
};

export const adminService = {
  getAllCustomers,
  getAllProviders,
  updateAccountStatus,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getAllMeals,
  deleteMeal,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getDashboardStats,
};

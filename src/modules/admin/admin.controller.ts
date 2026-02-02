import { Request, Response } from "express";
import { adminService } from "./admin.service";
import { getPaginationParams } from "../../utils/pagination";
import { UserStatus, OrderStatus } from "../../../generated/prisma/client";

const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const params = getPaginationParams(req.query);
    const result = await adminService.getAllCustomers(params);
    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).json({
      error: "Failed to fetch customers",
      details: e.message,
    });
  }
};

const getAllProviders = async (req: Request, res: Response) => {
  try {
    const params = getPaginationParams(req.query);
    const result = await adminService.getAllProviders(params);
    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).json({
      error: "Failed to fetch providers",
      details: e.message,
    });
  }
};

const updateAccountStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({
        error: "Invalid user ID",
      });
    }

    if (!status || !Object.values(UserStatus).includes(status)) {
      return res.status(400).json({
        error: "Invalid status. Must be ACTIVE or SUSPENDED",
      });
    }

    const result = await adminService.updateAccountStatus(userId, status as UserStatus);
    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).json({
      error: "Failed to update account status",
      details: e.message,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const params = getPaginationParams(req.query);
    const result = await adminService.getAllOrders(params);
    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).json({
      error: "Failed to fetch orders",
      details: e.message,
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId || typeof orderId !== 'string') {
      return res.status(400).json({
        error: "Invalid order ID",
      });
    }

    if (!status || !Object.values(OrderStatus).includes(status)) {
      return res.status(400).json({
        error: "Invalid status. Must be PREPARING, READY, DELIVERED, or CANCELLED",
      });
    }

    const result = await adminService.updateOrderStatus(orderId, status as OrderStatus);
    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).json({
      error: "Failed to update order status",
      details: e.message,
    });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    if (!orderId || typeof orderId !== 'string') {
      return res.status(400).json({
        error: "Invalid order ID",
      });
    }

    const result = await adminService.deleteOrder(orderId);
    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).json({
      error: "Failed to delete order",
      details: e.message,
    });
  }
};


const getAllMeals = async (req: Request, res: Response) => {
  try {
    const params = getPaginationParams(req.query);
    const result = await adminService.getAllMeals(params);
    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).json({
      error: "Failed to fetch meals",
      details: e.message,
    });
  }
};

const deleteMeal = async (req: Request, res: Response) => {
  try {
    const { mealId } = req.params;

    if (!mealId || typeof mealId !== 'string') {
      return res.status(400).json({
        error: "Invalid meal ID",
      });
    }

    const result = await adminService.deleteMeal(mealId);
    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).json({
      error: "Failed to delete meal",
      details: e.message,
    });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const params = getPaginationParams(req.query);
    const result = await adminService.getAllCategories(params);
    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).json({
      error: "Failed to fetch categories",
      details: e.message,
    });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await adminService.createCategory(req.body);
    res.status(201).json(result);
  } catch (e: any) {
    res.status(400).json({
      error: "Failed to create category",
      details: e.message,
    });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId || typeof categoryId !== 'string') {
      return res.status(400).json({
        error: "Invalid category ID",
      });
    }

    const result = await adminService.updateCategory(categoryId, req.body);
    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).json({
      error: "Failed to update category",
      details: e.message,
    });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId || typeof categoryId !== 'string') {
      return res.status(400).json({
        error: "Invalid category ID",
      });
    }

    const result = await adminService.deleteCategory(categoryId);
    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).json({
      error: "Failed to delete category",
      details: e.message,
    });
  }
};

const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getDashboardStats();
    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).json({
      error: "Failed to fetch dashboard stats",
      details: e.message,
    });
  }
};

export const adminController = {
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

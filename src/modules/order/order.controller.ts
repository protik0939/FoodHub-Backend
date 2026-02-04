import { Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderService.createOrder(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e,
    });
  }
};

const getOrdersByProviderId = async (req: Request, res: Response) => {
  try {
    const providerId = Array.isArray(req.params.providerId)
      ? req.params.providerId[0]
      : req.params.providerId;
    if (providerId) {
      const result = await orderService.getOrdersByProviderId(providerId);
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e,
    });
  }
};

const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const userId = Array.isArray(req.params.userId)
      ? req.params.userId[0]
      : req.params.userId;
    if (userId) {
      const result = await orderService.getOrdersByUserId(userId);
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e,
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId = Array.isArray(req.params.orderId)
      ? req.params.orderId[0]
      : req.params.orderId;
    const { status } = req.body;
    if (orderId && status) {
      const result = await orderService.updateOrderStatus(orderId, status);
      res.status(200).json(result);
    } else {
      res.status(400).json({
        error: "Missing orderId or status",
      });
    }
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e,
    });
  }
};

const cancelOrder = async (req: Request, res: Response) => {
  try {
    const orderId = Array.isArray(req.params.orderId)
      ? req.params.orderId[0]
      : req.params.orderId;
    const userId = (req as any).user?.id;

    if (!orderId || !userId) {
      res.status(400).json({
        error: "Missing orderId or userId",
      });
      return;
    }

    const result = await orderService.cancelOrder(orderId, userId);
    res.status(200).json(result);
  } catch (e: any) {
    res.status(400).json({
      error: e.message || "Something Went Wrong",
      details: e,
    });
  }
};

export const orderController = {
  createOrder,
  getOrdersByProviderId,
  getOrdersByUserId,
  updateOrderStatus,
  cancelOrder,
};

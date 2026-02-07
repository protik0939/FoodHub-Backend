import { Request, Response } from "express";
import { roleSelectService } from "./role.service";

const updateRole = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.body;
    if (!userId || !role) {
      return res.status(400).json({ error: "userId and role are required" });
    }
    const result = await roleSelectService.updateRole(userId, role);
    
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to update role",
      details: e,
    });
  }
};

export const roleSelectionController = {
  updateRole,
};

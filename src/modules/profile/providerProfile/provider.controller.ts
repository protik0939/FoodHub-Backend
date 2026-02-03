import { Request, Response } from "express";
import { providerService } from "./provider.service";

const createProvider = async (req: Request, res: Response) => {
  try {
    const result = await providerService.createProvider(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: err,
    });
  }
};

const getProvider = async (req: Request, res: Response) => {
  try {
    const result = await providerService.getProvider(req.params.id as string);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: err,
    });
  }
};

const updateProvider = async (req: Request, res: Response) => {
  try {
    const result = await providerService.updateProvider(
      req.params.id as string,
      req.body,
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: err,
    });
  }
};

const updateProviderImage = async (req: Request, res: Response) => {
  console.log("Controller Hitssssss");
  try {
    const result = await providerService.updateProviderImage(
      req.params.id as string,
      req.body.image,
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: err,
    });
  }
};

const getAllProvider = async (req: Request, res: Response) => {
  try {
    const result = await providerService.getAllProviders();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: err,
    });
  }
};

export const providerController = {
  createProvider,
  getProvider,
  updateProvider,
  updateProviderImage,
  getAllProvider
};

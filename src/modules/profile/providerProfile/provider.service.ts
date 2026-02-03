import { ProviderProfile } from "../../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";

const createProvider = async (data: ProviderProfile) => {
  const result = await prisma.providerProfile.create({
    data,
  });
  return result;
};

const getProvider = async (id: string) => {
  const result = await prisma.providerProfile.findUnique({
    where: { userId: id },
  });
  return result;
};

const updateProvider = async (id: string, data: Partial<ProviderProfile>) => {
  const result = await prisma.providerProfile.update({
    where: { userId: id },
    data,
  });
  return result;
};
const updateProviderImage = async (id: string, image: string) => {
  console.log("Servide Hitsss!");
  const provider = await prisma.user.findUnique({
    where: { id },
  });
  if (!provider) {
    throw new Error("Provider not found");
  }
  const result = await prisma.user.update({
    where: { id: provider.id },
    data: { image },
  });
  return result;
};

const getAllProviders = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: "PROVIDER",
    },
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
  });
  return result;
};

export const providerService = {
  createProvider,
  getProvider,
  updateProvider,
  updateProviderImage,
  getAllProviders,
};

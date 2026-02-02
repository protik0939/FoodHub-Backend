import { AdminProfile } from "../../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";

const createAdmin = async (data: AdminProfile) => {
  const result = await prisma.adminProfile.create({
    data,
  });
  return result;
};

const getAdmin = async (id: string) => {
  const result = await prisma.adminProfile.findUnique({
    where: { userId: id },
  });
  return result;
};

const updateAdmin = async (id: string, data: Partial<AdminProfile>) => {
  const result = await prisma.adminProfile.update({
    where: { userId: id },
    data,
  });
  return result;
};
const updateAdminImage = async (id: string, image: string) => {
  const admin = await prisma.user.findUnique({
    where: { id },
  });
  if (!admin) {
    throw new Error("Admin not found");
  }
  const result = await prisma.user.update({
    where: { id: admin.id },
    data: { image },
  });
  return result;
};

export const adminService = {
  createAdmin,
  getAdmin,
  updateAdmin,
  updateAdminImage,
};

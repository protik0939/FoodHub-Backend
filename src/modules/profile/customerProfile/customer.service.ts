import { UserProfile } from "../../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";

const createCustomer = async (data: UserProfile) => {
  const result = await prisma.userProfile.create({
    data,
  });
  return result;
};

const getCustomer = async (id: string) => {
  const result = await prisma.userProfile.findUnique({
    where: { userId: id },
  });
  return result;
};

const updateCustomer = async (id: string, data: Partial<UserProfile>) => {
  const result = await prisma.userProfile.update({
    where: { userId: id },
    data,
  });
  return result;
};

const updateCustomerImage = async (id: string, image: string) => {
  const customer = await prisma.user.findUnique({
    where: { id },
  });
  if (!customer) {
    throw new Error("Customer not found");
  }
  const result = await prisma.user.update({
    where: { id: customer.id },
    data: { image },
  });
  return result;
};

export const customerService = {
  createCustomer,
  getCustomer,
  updateCustomer,
  updateCustomerImage,
};

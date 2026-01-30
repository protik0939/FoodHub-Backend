import { prisma } from "../../lib/prisma";

const updateRole = async (userId: string, role: "Customer" | "Provider") => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });
  return result;
};

export const roleSelectService = {
  updateRole,
};
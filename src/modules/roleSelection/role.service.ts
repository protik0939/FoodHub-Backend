import { prisma } from "../../lib/prisma";

const updateRole = async (userId: string, role: "CUSTOMER" | "PROVIDER") => {

  const result = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  if (role === "PROVIDER") {
    const existingProviderProfile = await prisma.providerProfile.findUnique({
      where: { userId },
    });

    if (!existingProviderProfile) {
      await prisma.providerProfile.create({
        data: {
          userId,
          providerName: null,
          providerEmail: null,
          providerContact: null,
          providerAddress: null,
          ownerName: null,
          ownerEmail: null,
        },
      });
    }
  } else if (role === "CUSTOMER") {

    const existingUserProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!existingUserProfile) {
      await prisma.userProfile.create({
        data: {
          userId,
          firstName: null,
          lastName: null,
          dateOfBirth: null,
          address: null,
          contactNo: null,
        },
      });
    }
  }

  return result;
};

export const roleSelectService = {
  updateRole,
};
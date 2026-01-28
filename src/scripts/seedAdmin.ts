import { prisma } from "../lib/prisma";

async function seedAdmin() {
  console.log("===== Creating Admin =====");
  try {
    const adminData = {
      name: process.env.ADMIN_NAME as string,
      email: process.env.ADMIN_EMAIL as string,
      role: "ADMIN",
      password: process.env.ADMIN_PASS as string,
    };

    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      throw new Error("Admin Already Exist");
    }

    const signUpAdmin = await fetch(
      `${process.env.BETTER_AUTH_URL}/api/auth/sign-up/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: process.env.APP_URL as string,
        },
        body: JSON.stringify(adminData),
      },
    );

    if (signUpAdmin.ok) {
      console.log("===== Admin created =====");
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });

      console.log("===== Email verification status updated! =====");
    }
    console.log("===== SUCCESS =====");
  } catch (error) {
    console.error(error);
  }
}

seedAdmin();

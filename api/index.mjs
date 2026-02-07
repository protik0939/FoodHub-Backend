// src/app.ts
import { toNodeHandler } from "better-auth/node";
import express9 from "express";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id            String    @id\n  name          String\n  email         String\n  emailVerified Boolean   @default(false)\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n\n  role            String           @default("NONE")\n  accountStatus   UserStatus       @default(ACTIVE)\n  userProfile     UserProfile?\n  providerProfile ProviderProfile?\n  adminProfile    AdminProfile?\n  orders          Order[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel UserProfile {\n  id          String    @id @default(uuid())\n  firstName   String?   @db.VarChar(255)\n  lastName    String?   @db.VarChar(255)\n  dateOfBirth DateTime?\n  address     String?   @db.Text\n  contactNo   String?   @db.VarChar(50)\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map("userProfile")\n}\n\nmodel ProviderProfile {\n  id              String  @id @default(uuid())\n  providerName    String? @db.VarChar(255)\n  providerEmail   String? @db.VarChar(255)\n  providerContact String? @db.VarChar(50)\n  providerAddress String? @db.Text\n\n  ownerName  String? @db.VarChar(255)\n  ownerEmail String? @db.VarChar(255)\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  meals Meal[]\n\n  @@map("providerProfile")\n}\n\nmodel AdminProfile {\n  id      String  @id @default(uuid())\n  name    String? @db.VarChar(255)\n  contact String? @db.VarChar(50)\n\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map("adminProfile")\n}\n\nmodel Category {\n  id          String  @id @default(uuid())\n  name        String  @db.VarChar(255)\n  description String? @db.Text\n\n  meals Meal[]\n\n  @@map("categories")\n}\n\nmodel Meal {\n  id          String   @id @default(uuid())\n  name        String   @db.VarChar(255)\n  description String   @db.Text\n  price       Float\n  quantity    String   @db.VarChar(255)\n  imageUrl    String   @db.VarChar(255)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  categoryId String\n  providerId String\n\n  category Category        @relation(fields: [categoryId], references: [id])\n  provider ProviderProfile @relation(fields: [providerId], references: [id])\n\n  orders Order[]\n\n  @@map("meals")\n}\n\nmodel Order {\n  id            String         @id @default(uuid())\n  status        OrderStatus    @default(PREPARING)\n  quantity      Int            @default(1)\n  paymentMethod paymentMethods @default(CASHONDELIVERY)\n  userId        String\n  user          User           @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  mealId String\n\n  meal    Meal     @relation(fields: [mealId], references: [id])\n  reviews Review[]\n\n  @@map("orders")\n}\n\nmodel Review {\n  id          String   @id @default(uuid())\n  reviewPoint Float\n  comment     String?  @db.Text\n  imageUrl    String?  @db.VarChar(255)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  orderId String\n  order   Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)\n\n  @@map("review")\n}\n\nenum OrderStatus {\n  PREPARING\n  READY\n  DELIVERED\n  CANCELLED\n}\n\nenum UserRole {\n  CUSTOMER\n  PROVIDER\n  ADMIN\n  NONE\n}\n\nenum UserStatus {\n  ACTIVE\n  SUSPENDED\n}\n\nenum paymentMethods {\n  CASHONDELIVERY\n  OTHERS\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"role","kind":"scalar","type":"String"},{"name":"accountStatus","kind":"enum","type":"UserStatus"},{"name":"userProfile","kind":"object","type":"UserProfile","relationName":"UserToUserProfile"},{"name":"providerProfile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"adminProfile","kind":"object","type":"AdminProfile","relationName":"AdminProfileToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"UserProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"firstName","kind":"scalar","type":"String"},{"name":"lastName","kind":"scalar","type":"String"},{"name":"dateOfBirth","kind":"scalar","type":"DateTime"},{"name":"address","kind":"scalar","type":"String"},{"name":"contactNo","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"UserToUserProfile"}],"dbName":"userProfile"},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"providerName","kind":"scalar","type":"String"},{"name":"providerEmail","kind":"scalar","type":"String"},{"name":"providerContact","kind":"scalar","type":"String"},{"name":"providerAddress","kind":"scalar","type":"String"},{"name":"ownerName","kind":"scalar","type":"String"},{"name":"ownerEmail","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProviderProfile"}],"dbName":"providerProfile"},"AdminProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"contact","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AdminProfileToUser"}],"dbName":"adminProfile"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":"categories"},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"quantity","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"MealToProviderProfile"},{"name":"orders","kind":"object","type":"Order","relationName":"MealToOrder"}],"dbName":"meals"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"paymentMethod","kind":"enum","type":"paymentMethods"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrder"},{"name":"reviews","kind":"object","type":"Review","relationName":"OrderToReview"}],"dbName":"orders"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"reviewPoint","kind":"scalar","type":"Float"},{"name":"comment","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToReview"}],"dbName":"review"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var OrderStatus = {
  PREPARING: "PREPARING",
  READY: "READY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED"
};
var UserStatus = {
  ACTIVE: "ACTIVE",
  SUSPENDED: "SUSPENDED"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS
  }
});
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [process.env.APP_URL, process.env.PROD_APP_URL],
  baseURL: process.env.BETTER_AUTH_URL,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
      // 5 minutes
    }
  },
  secret: process.env.BETTER_AUTH_SECRET,
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true,
    generateSessionToken: void 0,
    defaultCookieAttributes: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      path: "/"
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "NONE",
        required: true
      },
      accountStatus: {
        type: "string",
        defaultValue: "ACTIVE",
        required: true
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.NEXT_PUBLIC_PROD_APP_URL}`;
        const info = await transporter.sendMail({
          from: '"Food Hub" <protik0939@gmail.com>',
          to: user.email,
          subject: "Verify your email address | Food Hub",
          text: `Verify your email address by clicking the link: ${verificationUrl}`,
          html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Email Verification</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table width="100%" max-width="600px" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <tr>
              <td style="background:#ff6b00; padding:24px; text-align:center; color:#ffffff;">
                <h1 style="margin:0; font-size:24px;">Food Hub</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px; color:#333333;">
                <h2 style="margin-top:0;">Verify your email address</h2>
                <p style="font-size:15px; line-height:1.6;">
                  Hi <strong>${user.name || "there"}</strong>,
                </p>
                <p style="font-size:15px; line-height:1.6;">
                  Thanks for signing up for <strong>Food Hub</strong>!  
                  Please confirm your email address by clicking the button below.
                </p>

                <div style="text-align:center; margin:32px 0;">
                  <a href="${verificationUrl}"
                    style="
                      background:#ff6b00;
                      color:#ffffff;
                      text-decoration:none;
                      padding:14px 28px;
                      border-radius:6px;
                      font-size:16px;
                      display:inline-block;
                    ">
                    Verify Email
                  </a>
                </div>

                <p style="font-size:14px; color:#666;">
                  If the button doesn\u2019t work, copy and paste this link into your browser:
                </p>

                <p style="font-size:13px; word-break:break-all; color:#555;">
                  ${verificationUrl}
                </p>

                <p style="font-size:14px; color:#666;">
                  This link will expire soon for security reasons.
                </p>

                <p style="font-size:14px; margin-top:24px;">
                  \u2014 The Food Hub Team
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f4f6f8; padding:16px; text-align:center; font-size:12px; color:#888;">
                \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} Food Hub. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `
        });
        console.log("Message Sent Successfully: ", info.messageId);
      } catch (error) {
        console.error("Something Went Wrong: ", error);
        throw error;
      }
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      prompt: "select_account consent",
      accessType: "offline"
    }
  }
});

// src/app.ts
import cors from "cors";

// src/modules/meal/meal.route.ts
import express from "express";

// src/modules/meal/meal.service.ts
var createMeal = async (data) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: {
      userId: data.providerId
    }
  });
  if (!providerProfile) {
    throw new Error("No Provider Profile found!");
  }
  const { id, ...mealData } = data;
  const result = await prisma.meal.create({
    data: {
      ...mealData,
      providerId: providerProfile.id
    },
    include: {
      category: true,
      provider: true
    }
  });
  return result;
};
var getAllMeals = async () => {
  const result = await prisma.meal.findMany({
    include: {
      category: true,
      provider: {
        select: {
          providerName: true,
          providerEmail: true,
          user: {
            select: {
              name: true,
              image: true,
              id: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var getMealsByProviderId = async (providerId) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: {
      userId: providerId
    }
  });
  if (!providerProfile) {
    return "No Provider Profile found!";
  }
  const result = await prisma.meal.findMany({
    where: {
      providerId: providerProfile.id
    },
    include: {
      category: true,
      orders: {
        select: {
          id: true,
          status: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var updateMeal = async (mealId, data) => {
  const { id, createdAt, updatedAt, ...updateData } = data;
  const result = await prisma.meal.update({
    where: {
      id: mealId
    },
    data: updateData,
    include: {
      category: true,
      provider: true
    }
  });
  return result;
};
var deleteMeal = async (mealId) => {
  const result = await prisma.meal.delete({
    where: {
      id: mealId
    }
  });
  return result;
};
var getMealById = async (mealId) => {
  const result = await prisma.meal.findUnique({
    where: {
      id: mealId
    },
    include: {
      category: true,
      provider: {
        select: {
          providerName: true,
          providerEmail: true
        }
      }
    }
  });
  return result;
};
var getMealByCategoryId = async (categoryId) => {
  const result = await prisma.meal.findMany({
    where: {
      categoryId
    },
    include: {
      category: true,
      provider: {
        select: {
          providerName: true,
          providerEmail: true,
          user: {
            select: {
              name: true,
              image: true,
              id: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var mealService = {
  createMeal,
  getAllMeals,
  getMealsByProviderId,
  getMealById,
  getMealByCategoryId,
  updateMeal,
  deleteMeal
};

// src/modules/meal/meal.controller.ts
var createMeal2 = async (req, res) => {
  try {
    const result = await mealService.createMeal(req.body);
    res.status(201).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var getAllMeals2 = async (req, res) => {
  try {
    const result = await mealService.getAllMeals();
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var getMealsByProviderId2 = async (req, res) => {
  try {
    const providerId = Array.isArray(req.params.providerId) ? req.params.providerId[0] : req.params.providerId;
    if (providerId) {
      const result = await mealService.getMealsByProviderId(providerId);
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var updateMeal2 = async (req, res) => {
  try {
    const mealId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!mealId) {
      res.status(400).json({ error: "Meal ID is required" });
      return;
    }
    const result = await mealService.updateMeal(mealId, req.body);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var deleteMeal2 = async (req, res) => {
  try {
    const mealId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!mealId) {
      res.status(400).json({ error: "Meal ID is required" });
      return;
    }
    const result = await mealService.deleteMeal(mealId);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var getMealById2 = async (req, res) => {
  try {
    const mealId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!mealId) {
      res.status(400).json({ error: "Meal ID is required" });
      return;
    }
    const result = await mealService.getMealById(mealId);
    if (!result) {
      res.status(404).json({ error: "Meal not found" });
      return;
    }
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var getMealByCategoryId2 = async (req, res) => {
  try {
    const categoryId = Array.isArray(req.params.categoryId) ? req.params.categoryId[0] : req.params.categoryId;
    if (!categoryId) {
      res.status(400).json({ error: "Category ID is required" });
      return;
    }
    const result = await mealService.getMealByCategoryId(categoryId);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var MealController = {
  createMeal: createMeal2,
  getAllMeals: getAllMeals2,
  getMealsByProviderId: getMealsByProviderId2,
  getMealById: getMealById2,
  getMealByCategoryId: getMealByCategoryId2,
  updateMeal: updateMeal2,
  deleteMeal: deleteMeal2
};

// src/middlewares/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      console.log("Session:", session);
      console.log("Cookie header:", req.headers.cookie);
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!"
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email verification required. Please verfiy your email!"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified,
        accountStatus: session.user.accountStatus
      };
      console.log("Ei holo Role: ", req.user.role);
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have permission to access this resources!"
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
var auth_default = auth2;

// src/modules/meal/meal.route.ts
var router = express.Router();
router.post("/", auth_default("ADMIN" /* ADMIN */, "PROVIDER" /* PROVIDER */), MealController.createMeal);
router.get("/", MealController.getAllMeals);
router.get("/provider/:providerId", MealController.getMealsByProviderId);
router.get("/category/:categoryId", MealController.getMealByCategoryId);
router.get("/:id", MealController.getMealById);
router.put("/:id", auth_default("ADMIN" /* ADMIN */, "PROVIDER" /* PROVIDER */), MealController.updateMeal);
router.delete("/:id", auth_default("ADMIN" /* ADMIN */, "PROVIDER" /* PROVIDER */), MealController.deleteMeal);
var mealRouter = router;

// src/modules/category/category.route.ts
import express2 from "express";

// src/modules/category/category.service.ts
var createCategory = async (data) => {
  const result = await prisma.category.create({
    data
  });
  return result;
};
var getAllCategories = async (searchTerm) => {
  const result = await prisma.category.findMany({
    where: searchTerm ? {
      name: {
        contains: searchTerm,
        mode: "insensitive"
      }
    } : {},
    select: {
      id: true,
      name: true,
      description: true
    }
  });
  return result;
};
var categoryService = {
  createCategory,
  getAllCategories
};

// src/modules/category/category.controller.ts
var createCategory2 = async (req, res) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var getAllCategories2 = async (req, res) => {
  try {
    const searchTerm = req.query.search;
    const result = await categoryService.getAllCategories(searchTerm);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var categoryController = {
  createCategory: createCategory2,
  getAllCategories: getAllCategories2
};

// src/modules/category/category.route.ts
var router2 = express2.Router();
router2.post("/", auth_default("ADMIN" /* ADMIN */, "PROVIDER" /* PROVIDER */), categoryController.createCategory);
router2.get("/", categoryController.getAllCategories);
var categoryRouter = router2;

// src/modules/profile/providerProfile/provider.route.ts
import express3 from "express";

// src/modules/profile/providerProfile/provider.service.ts
var createProvider = async (data) => {
  const result = await prisma.providerProfile.create({
    data
  });
  return result;
};
var getProvider = async (id) => {
  const result = await prisma.providerProfile.findUnique({
    where: { userId: id }
  });
  return result;
};
var updateProvider = async (id, data) => {
  const result = await prisma.providerProfile.update({
    where: { userId: id },
    data
  });
  return result;
};
var updateProviderImage = async (id, image) => {
  console.log("Servide Hitsss!");
  const provider = await prisma.user.findUnique({
    where: { id }
  });
  if (!provider) {
    throw new Error("Provider not found");
  }
  const result = await prisma.user.update({
    where: { id: provider.id },
    data: { image }
  });
  return result;
};
var getAllProviders = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: "PROVIDER"
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
              meals: true
            }
          }
        }
      }
    }
  });
  return result;
};
var providerService = {
  createProvider,
  getProvider,
  updateProvider,
  updateProviderImage,
  getAllProviders
};

// src/modules/profile/providerProfile/provider.controller.ts
var createProvider2 = async (req, res) => {
  try {
    const result = await providerService.createProvider(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: err
    });
  }
};
var getProvider2 = async (req, res) => {
  try {
    const result = await providerService.getProvider(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: err
    });
  }
};
var updateProvider2 = async (req, res) => {
  try {
    const result = await providerService.updateProvider(
      req.params.id,
      req.body
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: err
    });
  }
};
var updateProviderImage2 = async (req, res) => {
  console.log("Controller Hitssssss");
  try {
    const result = await providerService.updateProviderImage(
      req.params.id,
      req.body.image
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: err
    });
  }
};
var getAllProvider = async (req, res) => {
  try {
    const result = await providerService.getAllProviders();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: err
    });
  }
};
var providerController = {
  createProvider: createProvider2,
  getProvider: getProvider2,
  updateProvider: updateProvider2,
  updateProviderImage: updateProviderImage2,
  getAllProvider
};

// src/modules/profile/providerProfile/provider.route.ts
var router3 = express3.Router();
router3.get("/all", providerController.getAllProvider);
router3.post("/", auth_default("PROVIDER" /* PROVIDER */), providerController.createProvider);
router3.get("/:id", auth_default("PROVIDER" /* PROVIDER */), providerController.getProvider);
router3.put("/:id", auth_default("PROVIDER" /* PROVIDER */), providerController.updateProvider);
router3.put("/:id/image", auth_default("PROVIDER" /* PROVIDER */), providerController.updateProviderImage);
var providerRouter = router3;

// src/modules/profile/adminProfile/admin.route.ts
import express4 from "express";

// src/modules/profile/adminProfile/admin.service.ts
var createAdmin = async (data) => {
  const result = await prisma.adminProfile.create({
    data
  });
  return result;
};
var getAdmin = async (id) => {
  const result = await prisma.adminProfile.findUnique({
    where: { userId: id }
  });
  return result;
};
var updateAdmin = async (id, data) => {
  const result = await prisma.adminProfile.update({
    where: { userId: id },
    data
  });
  return result;
};
var updateAdminImage = async (id, image) => {
  const admin = await prisma.user.findUnique({
    where: { id }
  });
  if (!admin) {
    throw new Error("Admin not found");
  }
  const result = await prisma.user.update({
    where: { id: admin.id },
    data: { image }
  });
  return result;
};
var adminService = {
  createAdmin,
  getAdmin,
  updateAdmin,
  updateAdminImage
};

// src/modules/profile/adminProfile/admin.controller.ts
var createAdmin2 = async (req, res) => {
  try {
    const result = await adminService.createAdmin(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var getAdmin2 = async (req, res) => {
  try {
    const result = await adminService.getAdmin(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: err
    });
  }
};
var updateAdmin2 = async (req, res) => {
  try {
    const result = await adminService.updateAdmin(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: err
    });
  }
};
var updateAdminImage2 = async (req, res) => {
  try {
    const result = await adminService.updateAdminImage(req.params.id, req.body.image);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: err
    });
  }
};
var adminController = {
  createAdmin: createAdmin2,
  getAdmin: getAdmin2,
  updateAdmin: updateAdmin2,
  updateAdminImage: updateAdminImage2
};

// src/modules/profile/adminProfile/admin.route.ts
var router4 = express4.Router();
router4.post("/", auth_default("ADMIN" /* ADMIN */), adminController.createAdmin);
router4.get("/:id", auth_default("ADMIN" /* ADMIN */), adminController.getAdmin);
router4.put("/:id", auth_default("ADMIN" /* ADMIN */), adminController.updateAdmin);
router4.put("/:id/image", auth_default("ADMIN" /* ADMIN */), adminController.updateAdminImage);
var adminRouter = router4;

// src/modules/profile/customerProfile/customer.route.ts
import express5 from "express";

// src/modules/profile/customerProfile/customer.service.ts
var createCustomer = async (data) => {
  const result = await prisma.userProfile.create({
    data
  });
  return result;
};
var getCustomer = async (id) => {
  const result = await prisma.userProfile.findUnique({
    where: { userId: id }
  });
  return result;
};
var updateCustomer = async (id, data) => {
  const result = await prisma.userProfile.update({
    where: { userId: id },
    data
  });
  return result;
};
var updateCustomerImage = async (id, image) => {
  const customer = await prisma.user.findUnique({
    where: { id }
  });
  if (!customer) {
    throw new Error("Customer not found");
  }
  const result = await prisma.user.update({
    where: { id: customer.id },
    data: { image }
  });
  return result;
};
var customerService = {
  createCustomer,
  getCustomer,
  updateCustomer,
  updateCustomerImage
};

// src/modules/profile/customerProfile/customer.controller.ts
var createCustomer2 = async (req, res) => {
  try {
    const result = await customerService.createCustomer(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var getCustomer2 = async (req, res) => {
  try {
    const result = await customerService.getCustomer(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: err
    });
  }
};
var updateCustomer2 = async (req, res) => {
  try {
    const result = await customerService.updateCustomer(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: err
    });
  }
};
var updateCustomerImage2 = async (req, res) => {
  try {
    const result = await customerService.updateCustomerImage(req.params.id, req.body.image);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: err
    });
  }
};
var customerController = {
  createCustomer: createCustomer2,
  getCustomer: getCustomer2,
  updateCustomer: updateCustomer2,
  updateCustomerImage: updateCustomerImage2
};

// src/modules/profile/customerProfile/customer.route.ts
var router5 = express5.Router();
router5.post("/", auth_default("CUSTOMER" /* CUSTOMER */), customerController.createCustomer);
router5.get("/:id", auth_default("CUSTOMER" /* CUSTOMER */), customerController.getCustomer);
router5.put("/:id", auth_default("CUSTOMER" /* CUSTOMER */), customerController.updateCustomer);
router5.put("/:id/image", auth_default("CUSTOMER" /* CUSTOMER */), customerController.updateCustomerImage);
var customerRouter = router5;

// src/modules/order/order.route.ts
import express6 from "express";

// src/modules/order/order.service.ts
var createOrder = async (data) => {
  console.log("ei function hit korse!!!");
  console.log(data);
  const result = await prisma.order.create({
    data
  });
  return result;
};
var getOrdersByProviderId = async (providerId) => {
  const result = await prisma.order.findMany({
    where: {
      meal: {
        provider: {
          userId: providerId
        }
      }
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          userProfile: {
            select: {
              contactNo: true,
              address: true
            }
          }
        }
      },
      meal: {
        select: {
          name: true,
          price: true,
          imageUrl: true
        }
      }
    },
    orderBy: {
      id: "desc"
    }
  });
  return result;
};
var getOrdersByUserId = async (userId) => {
  const result = await prisma.order.findMany({
    where: {
      userId
    },
    include: {
      meal: {
        select: {
          name: true,
          price: true,
          imageUrl: true,
          provider: {
            select: {
              user: {
                select: {
                  name: true,
                  image: true
                }
              }
            }
          }
        }
      },
      reviews: true
    },
    orderBy: {
      id: "desc"
    }
  });
  return result;
};
var updateOrderStatus = async (orderId, status) => {
  const result = await prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      status
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          userProfile: {
            select: {
              contactNo: true,
              address: true
            }
          }
        }
      },
      meal: {
        select: {
          name: true,
          price: true,
          imageUrl: true
        }
      }
    }
  });
  return result;
};
var cancelOrder = async (orderId, userId) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId
    }
  });
  if (!order) {
    throw new Error("Order not found");
  }
  if (order.userId !== userId) {
    throw new Error("Unauthorized to cancel this order");
  }
  if (order.status !== OrderStatus.PREPARING) {
    throw new Error("Order can only be cancelled when in PREPARING status");
  }
  const result = await prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      status: OrderStatus.CANCELLED
    },
    include: {
      meal: {
        select: {
          name: true,
          price: true,
          imageUrl: true,
          provider: {
            select: {
              user: {
                select: {
                  name: true,
                  image: true
                }
              }
            }
          }
        }
      },
      reviews: true
    }
  });
  return result;
};
var orderService = {
  createOrder,
  getOrdersByProviderId,
  getOrdersByUserId,
  updateOrderStatus,
  cancelOrder
};

// src/modules/order/order.controller.ts
var createOrder2 = async (req, res) => {
  try {
    const result = await orderService.createOrder(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var getOrdersByProviderId2 = async (req, res) => {
  try {
    const providerId = Array.isArray(req.params.providerId) ? req.params.providerId[0] : req.params.providerId;
    if (providerId) {
      const result = await orderService.getOrdersByProviderId(providerId);
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var getOrdersByUserId2 = async (req, res) => {
  try {
    const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
    if (userId) {
      const result = await orderService.getOrdersByUserId(userId);
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var updateOrderStatus2 = async (req, res) => {
  try {
    const orderId = Array.isArray(req.params.orderId) ? req.params.orderId[0] : req.params.orderId;
    const { status } = req.body;
    if (orderId && status) {
      const result = await orderService.updateOrderStatus(orderId, status);
      res.status(200).json(result);
    } else {
      res.status(400).json({
        error: "Missing orderId or status"
      });
    }
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var cancelOrder2 = async (req, res) => {
  try {
    const orderId = Array.isArray(req.params.orderId) ? req.params.orderId[0] : req.params.orderId;
    const userId = req.user?.id;
    if (!orderId || !userId) {
      res.status(400).json({
        error: "Missing orderId or userId"
      });
      return;
    }
    const result = await orderService.cancelOrder(orderId, userId);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: e.message || "Something Went Wrong",
      details: e
    });
  }
};
var orderController = {
  createOrder: createOrder2,
  getOrdersByProviderId: getOrdersByProviderId2,
  getOrdersByUserId: getOrdersByUserId2,
  updateOrderStatus: updateOrderStatus2,
  cancelOrder: cancelOrder2
};

// src/modules/order/order.route.ts
var router6 = express6.Router();
router6.post("/", auth_default("CUSTOMER" /* CUSTOMER */), orderController.createOrder);
router6.get("/provider/:providerId", auth_default("PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */), orderController.getOrdersByProviderId);
router6.get("/customer/:userId", auth_default("CUSTOMER" /* CUSTOMER */, "ADMIN" /* ADMIN */), orderController.getOrdersByUserId);
router6.patch("/:orderId", auth_default("PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */), orderController.updateOrderStatus);
router6.patch("/:orderId/cancel", auth_default("CUSTOMER" /* CUSTOMER */), orderController.cancelOrder);
var orderRouter = router6;

// src/modules/review/review.route.ts
import express7 from "express";

// src/modules/review/review.service.ts
var createReview = async (data) => {
  const order = await prisma.order.findUnique({
    where: { id: data.orderId },
    include: { reviews: true }
  });
  if (!order) {
    throw new Error("Order not found");
  }
  if (order.status !== "DELIVERED") {
    throw new Error("Error!");
  }
  if (order.reviews.length > 0) {
    throw new Error("Error!");
  }
  const result = await prisma.review.create({
    data,
    include: {
      order: {
        include: {
          meal: {
            include: {
              category: true,
              provider: true
            }
          },
          user: {
            select: {
              name: true,
              email: true,
              image: true
            }
          }
        }
      }
    }
  });
  return result;
};
var getReviewsByMealId = async (mealId) => {
  const reviews = await prisma.review.findMany({
    where: {
      order: {
        mealId
      }
    },
    include: {
      order: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
              image: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return reviews;
};
var getReviewsByProviderId = async (providerId) => {
  const reviews = await prisma.review.findMany({
    where: {
      order: {
        meal: {
          provider: {
            userId: providerId
          }
        }
      }
    },
    include: {
      order: {
        include: {
          meal: {
            select: {
              name: true,
              imageUrl: true
            }
          },
          user: {
            select: {
              name: true,
              email: true,
              image: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return reviews;
};
var getAllReviews = async () => {
  const reviews = await prisma.review.findMany({
    include: {
      order: {
        include: {
          meal: {
            include: {
              category: true,
              provider: true
            }
          },
          user: {
            select: {
              name: true,
              email: true,
              image: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return reviews;
};
var getReviewStats = async (mealId) => {
  const reviews = await prisma.review.findMany({
    where: {
      order: {
        mealId
      }
    }
  });
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 ? reviews.reduce((sum, review) => sum + review.reviewPoint, 0) / totalReviews : 0;
  return {
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10
  };
};
var reviewService = {
  createReview,
  getReviewsByMealId,
  getReviewsByProviderId,
  getAllReviews,
  getReviewStats
};

// src/modules/review/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    const result = await reviewService.createReview(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var getReviewsByMealId2 = async (req, res) => {
  try {
    const mealId = Array.isArray(req.params.mealId) ? req.params.mealId[0] : req.params.mealId;
    if (mealId) {
      const result = await reviewService.getReviewsByMealId(mealId);
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var getReviewsByProviderId2 = async (req, res) => {
  try {
    const providerId = Array.isArray(req.params.providerId) ? req.params.providerId[0] : req.params.providerId;
    if (providerId) {
      const result = await reviewService.getReviewsByProviderId(providerId);
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var getAllReviews2 = async (req, res) => {
  try {
    const result = await reviewService.getAllReviews();
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var getReviewStats2 = async (req, res) => {
  try {
    const mealId = Array.isArray(req.params.mealId) ? req.params.mealId[0] : req.params.mealId;
    if (mealId) {
      const result = await reviewService.getReviewStats(mealId);
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(400).json({
      error: "Something Went Wrong",
      details: e
    });
  }
};
var reviewController = {
  createReview: createReview2,
  getReviewsByMealId: getReviewsByMealId2,
  getReviewsByProviderId: getReviewsByProviderId2,
  getAllReviews: getAllReviews2,
  getReviewStats: getReviewStats2
};

// src/modules/review/review.route.ts
var router7 = express7.Router();
router7.post("/", auth_default("CUSTOMER" /* CUSTOMER */, "ADMIN" /* ADMIN */), reviewController.createReview);
router7.get("/meal/:mealId", reviewController.getReviewsByMealId);
router7.get("/provider/:providerId", auth_default("PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */), reviewController.getReviewsByProviderId);
router7.get("/all", auth_default("ADMIN" /* ADMIN */), reviewController.getAllReviews);
router7.get("/stats/:mealId", reviewController.getReviewStats);
var reviewRouter = router7;

// src/modules/roleSelection/role.route.ts
import express8 from "express";

// src/modules/roleSelection/role.service.ts
var updateRole = async (userId, role) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: { role }
  });
  if (role === "PROVIDER") {
    const existingProviderProfile = await prisma.providerProfile.findUnique({
      where: { userId }
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
          ownerEmail: null
        }
      });
    }
  } else if (role === "CUSTOMER") {
    const existingUserProfile = await prisma.userProfile.findUnique({
      where: { userId }
    });
    if (!existingUserProfile) {
      await prisma.userProfile.create({
        data: {
          userId,
          firstName: null,
          lastName: null,
          dateOfBirth: null,
          address: null,
          contactNo: null
        }
      });
    }
  }
  return result;
};
var roleSelectService = {
  updateRole
};

// src/modules/roleSelection/role.controller.ts
var updateRole2 = async (req, res) => {
  try {
    const { userId, role } = req.body;
    if (!userId || !role) {
      return res.status(400).json({ error: "userId and role are required" });
    }
    const result = await roleSelectService.updateRole(userId, role);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to update role",
      details: e
    });
  }
};
var roleSelectionController = {
  updateRole: updateRole2
};

// src/modules/roleSelection/role.route.ts
var router8 = express8.Router();
router8.patch("/", roleSelectionController.updateRole);
var roleSelectionRouter = router8;

// src/modules/admin/admin.route.ts
import { Router as Router9 } from "express";

// src/utils/pagination.ts
var getPaginationParams = (query) => {
  const page = Number.parseInt(query.page) || 1;
  const limit = Number.parseInt(query.limit) || 10;
  const search = query.search;
  const sortBy = query.sortBy;
  const sortOrder = query.sortOrder || "desc";
  const params = { page, limit, sortOrder };
  if (search !== void 0) params.search = search;
  if (sortBy !== void 0) params.sortBy = sortBy;
  return params;
};
var calculateSkip = (page, limit) => {
  return (page - 1) * limit;
};
var formatPaginatedResponse = (data, total, page, limit) => {
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

// src/modules/admin/admin.service.ts
var getAllCustomers = async (params) => {
  const { page = 1, limit = 10, search, sortBy = "createdAt", sortOrder = "desc" } = params;
  const skip = calculateSkip(page, limit);
  const where = {
    role: "CUSTOMER",
    ...search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } }
      ]
    }
  };
  const [customers, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
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
        userProfile: {
          select: {
            firstName: true,
            lastName: true,
            contactNo: true,
            address: true
          }
        },
        _count: {
          select: {
            orders: true
          }
        }
      }
    }),
    prisma.user.count({ where })
  ]);
  return formatPaginatedResponse(customers, total, page, limit);
};
var getAllProviders2 = async (params) => {
  const { page = 1, limit = 10, search, sortBy = "createdAt", sortOrder = "desc" } = params;
  const skip = calculateSkip(page, limit);
  const where = {
    role: "PROVIDER",
    ...search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        {
          providerProfile: {
            providerName: { contains: search, mode: "insensitive" }
          }
        }
      ]
    }
  };
  const [providers, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
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
                meals: true
              }
            }
          }
        }
      }
    }),
    prisma.user.count({ where })
  ]);
  return formatPaginatedResponse(providers, total, page, limit);
};
var updateAccountStatus = async (userId, status) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  if (!user) {
    throw new Error("User not found");
  }
  if (user.role !== "CUSTOMER" && user.role !== "PROVIDER") {
    throw new Error("Cannot update status for this user type");
  }
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { accountStatus: status },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      accountStatus: true
    }
  });
  return updated;
};
var getAllOrders = async (params) => {
  const { page = 1, limit = 10, search, sortBy = "id", sortOrder = "desc" } = params;
  const skip = calculateSkip(page, limit);
  const where = search ? {
    OR: [
      { user: { name: { contains: search, mode: "insensitive" } } },
      { user: { email: { contains: search, mode: "insensitive" } } },
      { meal: { name: { contains: search, mode: "insensitive" } } }
    ]
  } : {};
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        status: true,
        quantity: true,
        paymentMethod: true,
        userId: true,
        mealId: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            userProfile: {
              select: {
                contactNo: true,
                address: true
              }
            }
          }
        },
        meal: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
            provider: {
              select: {
                providerName: true
              }
            }
          }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      }
    }),
    prisma.order.count({ where })
  ]);
  return formatPaginatedResponse(orders, total, page, limit);
};
var updateOrderStatus3 = async (orderId, status) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId }
  });
  if (!order) {
    throw new Error("Order not found");
  }
  const updated = await prisma.order.update({
    where: { id: orderId },
    data: { status },
    select: {
      id: true,
      status: true,
      quantity: true,
      paymentMethod: true,
      user: {
        select: {
          name: true,
          email: true
        }
      },
      meal: {
        select: {
          name: true,
          price: true
        }
      }
    }
  });
  return updated;
};
var deleteOrder = async (orderId) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId }
  });
  if (!order) {
    throw new Error("Order not found");
  }
  await prisma.order.delete({
    where: { id: orderId }
  });
  return { message: "Order deleted successfully" };
};
var getAllMeals3 = async (params) => {
  const { page = 1, limit = 10, search, sortBy = "createdAt", sortOrder = "desc" } = params;
  const skip = calculateSkip(page, limit);
  const where = search ? {
    OR: [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { category: { name: { contains: search, mode: "insensitive" } } },
      { provider: { providerName: { contains: search, mode: "insensitive" } } }
    ]
  } : {};
  const [meals, total] = await Promise.all([
    prisma.meal.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        quantity: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true
          }
        },
        provider: {
          select: {
            id: true,
            providerName: true,
            providerEmail: true
          }
        },
        _count: {
          select: {
            orders: true
          }
        }
      }
    }),
    prisma.meal.count({ where })
  ]);
  return formatPaginatedResponse(meals, total, page, limit);
};
var deleteMeal3 = async (mealId) => {
  const meal = await prisma.meal.findUnique({
    where: { id: mealId }
  });
  if (!meal) {
    throw new Error("Meal not found");
  }
  await prisma.meal.delete({
    where: { id: mealId }
  });
  return { message: "Meal deleted successfully" };
};
var getAllCategories3 = async (params) => {
  const { page = 1, limit = 10, search, sortBy = "name", sortOrder = "asc" } = params;
  const skip = calculateSkip(page, limit);
  const where = search ? {
    OR: [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } }
    ]
  } : {};
  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        name: true,
        description: true,
        _count: {
          select: {
            meals: true
          }
        }
      }
    }),
    prisma.category.count({ where })
  ]);
  return formatPaginatedResponse(categories, total, page, limit);
};
var createCategory3 = async (data) => {
  const category = await prisma.category.create({
    data
  });
  return category;
};
var updateCategory = async (categoryId, data) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  });
  if (!category) {
    throw new Error("Category not found");
  }
  const updated = await prisma.category.update({
    where: { id: categoryId },
    data
  });
  return updated;
};
var deleteCategory = async (categoryId) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  });
  if (!category) {
    throw new Error("Category not found");
  }
  await prisma.category.delete({
    where: { id: categoryId }
  });
  return { message: "Category deleted successfully" };
};
var getDashboardStats = async () => {
  const [
    totalCustomers,
    totalProviders,
    totalOrders,
    totalMeals,
    totalCategories,
    recentOrders,
    ordersByStatus
  ] = await Promise.all([
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.user.count({ where: { role: "PROVIDER" } }),
    prisma.order.count(),
    prisma.meal.count(),
    prisma.category.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { id: "desc" },
      select: {
        id: true,
        status: true,
        quantity: true,
        user: {
          select: {
            name: true,
            email: true
          }
        },
        meal: {
          select: {
            name: true,
            price: true
          }
        }
      }
    }),
    prisma.order.groupBy({
      by: ["status"],
      _count: {
        status: true
      }
    })
  ]);
  return {
    stats: {
      totalCustomers,
      totalProviders,
      totalOrders,
      totalMeals,
      totalCategories
    },
    recentOrders,
    ordersByStatus: ordersByStatus.map((item) => ({
      status: item.status,
      count: item._count.status
    }))
  };
};
var adminService2 = {
  getAllCustomers,
  getAllProviders: getAllProviders2,
  updateAccountStatus,
  getAllOrders,
  updateOrderStatus: updateOrderStatus3,
  deleteOrder,
  getAllMeals: getAllMeals3,
  deleteMeal: deleteMeal3,
  getAllCategories: getAllCategories3,
  createCategory: createCategory3,
  updateCategory,
  deleteCategory,
  getDashboardStats
};

// src/modules/admin/admin.controller.ts
var getAllCustomers2 = async (req, res) => {
  try {
    const params = getPaginationParams(req.query);
    const result = await adminService2.getAllCustomers(params);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to fetch customers",
      details: e.message
    });
  }
};
var getAllProviders3 = async (req, res) => {
  try {
    const params = getPaginationParams(req.query);
    const result = await adminService2.getAllProviders(params);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to fetch providers",
      details: e.message
    });
  }
};
var updateAccountStatus2 = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        error: "Invalid user ID"
      });
    }
    if (!status || !Object.values(UserStatus).includes(status)) {
      return res.status(400).json({
        error: "Invalid status. Must be ACTIVE or SUSPENDED"
      });
    }
    const result = await adminService2.updateAccountStatus(userId, status);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to update account status",
      details: e.message
    });
  }
};
var getAllOrders2 = async (req, res) => {
  try {
    const params = getPaginationParams(req.query);
    const result = await adminService2.getAllOrders(params);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to fetch orders",
      details: e.message
    });
  }
};
var updateOrderStatus4 = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({
        error: "Invalid order ID"
      });
    }
    if (!status || !Object.values(OrderStatus).includes(status)) {
      return res.status(400).json({
        error: "Invalid status. Must be PREPARING, READY, DELIVERED, or CANCELLED"
      });
    }
    const result = await adminService2.updateOrderStatus(orderId, status);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to update order status",
      details: e.message
    });
  }
};
var deleteOrder2 = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({
        error: "Invalid order ID"
      });
    }
    const result = await adminService2.deleteOrder(orderId);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to delete order",
      details: e.message
    });
  }
};
var getAllMeals4 = async (req, res) => {
  try {
    const params = getPaginationParams(req.query);
    const result = await adminService2.getAllMeals(params);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to fetch meals",
      details: e.message
    });
  }
};
var deleteMeal4 = async (req, res) => {
  try {
    const { mealId } = req.params;
    if (!mealId || typeof mealId !== "string") {
      return res.status(400).json({
        error: "Invalid meal ID"
      });
    }
    const result = await adminService2.deleteMeal(mealId);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to delete meal",
      details: e.message
    });
  }
};
var getAllCategories4 = async (req, res) => {
  try {
    const params = getPaginationParams(req.query);
    const result = await adminService2.getAllCategories(params);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to fetch categories",
      details: e.message
    });
  }
};
var createCategory4 = async (req, res) => {
  try {
    const result = await adminService2.createCategory(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to create category",
      details: e.message
    });
  }
};
var updateCategory2 = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId || typeof categoryId !== "string") {
      return res.status(400).json({
        error: "Invalid category ID"
      });
    }
    const result = await adminService2.updateCategory(categoryId, req.body);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to update category",
      details: e.message
    });
  }
};
var deleteCategory2 = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId || typeof categoryId !== "string") {
      return res.status(400).json({
        error: "Invalid category ID"
      });
    }
    const result = await adminService2.deleteCategory(categoryId);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to delete category",
      details: e.message
    });
  }
};
var getDashboardStats2 = async (req, res) => {
  try {
    const result = await adminService2.getDashboardStats();
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to fetch dashboard stats",
      details: e.message
    });
  }
};
var adminController2 = {
  getAllCustomers: getAllCustomers2,
  getAllProviders: getAllProviders3,
  updateAccountStatus: updateAccountStatus2,
  getAllOrders: getAllOrders2,
  updateOrderStatus: updateOrderStatus4,
  deleteOrder: deleteOrder2,
  getAllMeals: getAllMeals4,
  deleteMeal: deleteMeal4,
  getAllCategories: getAllCategories4,
  createCategory: createCategory4,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2,
  getDashboardStats: getDashboardStats2
};

// src/modules/admin/admin.route.ts
var router9 = Router9();
router9.get("/dashboard/stats", adminController2.getDashboardStats);
router9.get("/customers", adminController2.getAllCustomers);
router9.get("/providers", adminController2.getAllProviders);
router9.patch("/users/:userId/status", adminController2.updateAccountStatus);
router9.get("/orders", adminController2.getAllOrders);
router9.patch("/orders/:orderId/status", adminController2.updateOrderStatus);
router9.delete("/orders/:orderId", adminController2.deleteOrder);
router9.get("/meals", adminController2.getAllMeals);
router9.delete("/meals/:mealId", adminController2.deleteMeal);
router9.get("/categories", adminController2.getAllCategories);
router9.post("/categories", adminController2.createCategory);
router9.patch("/categories/:categoryId", adminController2.updateCategory);
router9.delete("/categories/:categoryId", adminController2.deleteCategory);
var adminRoute = router9;

// src/app.ts
var app = express9();
var allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL
  // Production frontend URL
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.use(express9.json());
app.use("/meals", mealRouter);
app.use("/categories", categoryRouter);
app.use("/profile/providers", providerRouter);
app.use("/profile/admins", adminRouter);
app.use("/profile/customers", customerRouter);
app.use("/orders", orderRouter);
app.use("/reviews", reviewRouter);
app.use("/select-role", roleSelectionRouter);
app.use("/admin", adminRoute);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.get("/", (req, res) => {
  res.send("Welcome To FoodHub!");
});
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};

# 🍔 FoodHub — Backend API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**A robust REST API powering the FoodHub meal-ordering platform — built with Express, Prisma ORM, PostgreSQL (Neon), and Better Auth.**

[Live API](https://food-hub-backend-teal.vercel.app) · [Frontend Repo](../foodhub-frontend/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [Deployment](#-deployment)

---

## 🌟 Overview

FoodHub Backend is the server-side API for the FoodHub food delivery platform. It handles user authentication, meal management, order processing, reviews, and role-based access control for three user types: **Customers**, **Meal Providers**, and **Admins**.

---

## ✨ Features

- 🔐 **Authentication** — Email/password & Google OAuth via [Better Auth](https://www.better-auth.com/), with email verification
- 🧑‍🤝‍🧑 **Role-Based Access Control** — Three roles: `CUSTOMER`, `PROVIDER`, `ADMIN`
- 🍽️ **Meal Management** — Providers can create, update, and delete meals with categories
- 📦 **Order System** — Customers can place, track, and manage orders
- ⭐ **Reviews** — Customers can leave reviews with ratings and images on delivered orders
- 🛡️ **Admin Panel** — Manage users, meals, categories, orders, and reviews
- 📧 **Email Notifications** — Transactional emails via Nodemailer (Gmail SMTP)
- 🤖 **AI Integration** — OpenRouter API integration for AI-powered features
- 🌐 **CORS** — Configured for both local development and Vercel preview deployments
- 🚀 **Vercel Serverless** — Production-ready serverless deployment via `vercel.json`

---

## 🛠 Tech Stack

| Layer        | Technology                         |
|--------------|------------------------------------|
| Runtime      | Node.js 20+                        |
| Language     | TypeScript 5                       |
| Framework    | Express.js 5                       |
| ORM          | Prisma 7 (with `prisma-client`)    |
| Database     | PostgreSQL (Neon serverless)       |
| Auth         | Better Auth 1.4 (Google OAuth)     |
| Email        | Nodemailer (Gmail SMTP)            |
| Hashing      | bcrypt                             |
| Bundler      | tsup (ESM output)                  |
| Dev Runner   | tsx (watch mode)                   |
| Deployment   | Vercel (serverless functions)      |

---

## 📁 Project Structure

```
FoodHub-Backend/
├── api/                    # Compiled serverless output (Vercel entry)
├── generated/
│   └── prisma/             # Auto-generated Prisma client
├── prisma/
│   ├── schema.prisma       # Database models & enums
│   └── migrations/         # SQL migration history
├── src/
│   ├── app.ts              # Express app setup, CORS, route mounting
│   ├── server.ts           # Server entry point (connects DB & listens)
│   ├── index.ts            # Serverless export entry
│   ├── lib/
│   │   ├── auth.ts         # Better Auth configuration (Google OAuth)
│   │   └── prisma.ts       # Prisma client singleton
│   ├── middlewares/
│   │   └── auth.ts         # Authentication & role-guard middleware
│   ├── modules/
│   │   ├── admin/          # Admin management (users, suspension)
│   │   ├── category/       # Meal categories CRUD
│   │   ├── meal/           # Meals CRUD (provider-scoped)
│   │   ├── order/          # Order creation & status management
│   │   ├── profile/
│   │   │   ├── adminProfile/     # Admin profile routes
│   │   │   ├── customerProfile/  # Customer profile routes
│   │   │   └── providerProfile/  # Provider profile routes
│   │   ├── review/         # Reviews CRUD (linked to orders)
│   │   └── roleSelection/  # Role assignment after registration
│   ├── scripts/
│   │   └── seedAdmin.ts    # Admin seeder script
│   └── utils/              # Shared utility functions
├── .env                    # Environment variables (not committed)
├── .gitignore
├── package.json
├── prisma.config.ts
├── tsconfig.json
└── vercel.json             # Vercel serverless deployment config
```

---

## 🗄️ Database Schema

The database is powered by **PostgreSQL** (Neon) with **Prisma ORM**.

### Core Models

| Model            | Description                                              |
|------------------|----------------------------------------------------------|
| `User`           | Auth user — stores role (`CUSTOMER`, `PROVIDER`, `ADMIN`, `NONE`) and account status |
| `Session`        | Session tokens managed by Better Auth                    |
| `Account`        | OAuth provider accounts (Google, etc.)                   |
| `Verification`   | Email verification tokens                                |
| `UserProfile`    | Extended profile for customers (name, DOB, address)      |
| `ProviderProfile`| Provider business details (name, address, contact)       |
| `AdminProfile`   | Admin details (name, contact)                            |
| `Category`       | Meal categories (e.g. Burger, Pizza)                     |
| `Meal`           | Menu items — linked to a category and a provider         |
| `Order`          | Customer orders — linked to a user, meal, and status     |
| `Review`         | Order reviews — rating + comment + optional image        |

### Enums

```prisma
enum OrderStatus   { PREPARING | READY | DELIVERED | CANCELLED }
enum UserRole      { CUSTOMER | PROVIDER | ADMIN | NONE }
enum UserStatus    { ACTIVE | SUSPENDED }
enum paymentMethods { CASHONDELIVERY | OTHERS }
```

---

## 🔌 API Endpoints

All routes are prefixed by the base URL: `https://food-hub-backend-teal.vercel.app`

| Method | Endpoint                        | Description                          | Auth Required |
|--------|---------------------------------|--------------------------------------|---------------|
| GET    | `/`                             | Health check                         | No            |
| ALL    | `/api/auth/*`                   | Better Auth endpoints (signin, etc.) | No            |
| GET    | `/meals`                        | List all meals                       | No            |
| POST   | `/meals`                        | Create a meal                        | PROVIDER      |
| PATCH  | `/meals/:id`                    | Update a meal                        | PROVIDER      |
| DELETE | `/meals/:id`                    | Delete a meal                        | PROVIDER      |
| GET    | `/categories`                   | List all categories                  | No            |
| POST   | `/categories`                   | Create a category                    | ADMIN         |
| DELETE | `/categories/:id`               | Delete a category                    | ADMIN         |
| POST   | `/select-role`                  | Assign role after registration       | User          |
| GET    | `/orders`                       | Get orders                           | User          |
| POST   | `/orders`                       | Place an order                       | CUSTOMER      |
| PATCH  | `/orders/:id`                   | Update order status                  | PROVIDER      |
| GET    | `/reviews`                      | Get reviews                          | No            |
| POST   | `/reviews`                      | Create a review                      | CUSTOMER      |
| GET    | `/profile/customers/:id`        | Get customer profile                 | User          |
| PATCH  | `/profile/customers/:id`        | Update customer profile              | CUSTOMER      |
| GET    | `/profile/providers/:id`        | Get provider profile                 | User          |
| PATCH  | `/profile/providers/:id`        | Update provider profile              | PROVIDER      |
| GET    | `/admin/users`                  | List all users                       | ADMIN         |
| PATCH  | `/admin/users/:id/suspend`      | Suspend/activate a user              | ADMIN         |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20 or higher
- **npm** v9+
- A **PostgreSQL** database (recommended: [Neon](https://neon.tech))
- Google Cloud OAuth credentials (for Google sign-in)

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd FoodHub-Backend

# 2. Install dependencies
npm install

# 3. Set up your environment variables
cp .env.example .env
# Edit .env with your values (see Environment Variables section)

# 4. Push the Prisma schema to your database
npx prisma db push

# 5. (Optional) Run the admin seeder
npm run seed:admin

# 6. Start the development server
npm run dev
```

The API will be running at **http://localhost:5000**.

---

## 🔑 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# App
PORT=5000
NODE_ENV=localhost

# Frontend URLs (for CORS)
APP_URL=http://localhost:3000
PROD_APP_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require

# Auth
BETTER_AUTH_SECRET=your_secret_key_here

# Gmail SMTP (for email notifications)
APP_USER=your_gmail@gmail.com
APP_PASS=your_gmail_app_password

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Admin Seed
ADMIN_EMAIL=admin@foodhub.com
ADMIN_NAME=Mr Admin
ADMIN_PASS=admin_password

# AI (OpenRouter)
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-4o-mini
```

> ⚠️ **Never commit your `.env` file.** It is listed in `.gitignore`.

---

## 📜 Scripts

| Script          | Command                  | Description                                      |
|-----------------|--------------------------|--------------------------------------------------|
| `dev`           | `npm run dev`            | Start dev server with hot reload (tsx watch)     |
| `build`         | `npm run build`          | Generate Prisma client & bundle for Vercel (tsup)|
| `seed:admin`    | `npm run seed:admin`     | Seed the default admin user                      |
| `postinstall`   | _(automatic)_            | Runs `prisma generate` after `npm install`       |

---

## ☁️ Deployment

The backend is deployed on **Vercel** as a serverless function.

### How it works

1. `npm run build` runs `prisma generate` then bundles `src/index.ts` → `api/index.mjs` using **tsup** (ESM, Node 20 target).
2. `vercel.json` routes all traffic (`/*`) to `api/index.mjs`.

```json
{
  "version": 2,
  "builds": [{ "src": "api/index.mjs", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "/api/index.mjs" }]
}
```

### Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Make sure all environment variables are configured in your **Vercel project settings** before deploying.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

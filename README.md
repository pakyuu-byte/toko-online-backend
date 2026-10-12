# Toko Online Backend - Modul 4

Backend REST API untuk Toko Online, dibangun dengan Express + Prisma + PostgreSQL. Fokus Modul 4: Database Sync & Auth JWT.

## 🚀 Tech Stack
- Node.js + Express
- Prisma ORM v6.19.3
- PostgreSQL
- bcrypt (hash password)
- jsonwebtoken (JWT)

## ✅ Progress Modul 4 (12 Okt 2026)

### 1. Prisma Setup & Migration
```bash
generator client { provider = "prisma-client-js" }
datasource db {
  provider = "postgresql"
  url = env("DATABASE_URL")
}
model User { id Int @id @default(autoincrement()) email String @unique password String name String? role String @default("USER") createdAt DateTime @default(now()) }
model Product { id Int @id @default(autoincrement()) name String description String? price Float stock Int @default(0) createdAt DateTime @default(now()) }
model Order { id Int @id @default(autoincrement()) userId Int total Float status String @default("PENDING") createdAt DateTime @default(now()) }

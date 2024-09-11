-- CreateTable
CREATE TABLE "guitars" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "picture" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "StringsNumber" INTEGER NOT NULL,

    CONSTRAINT "guitars_pkey" PRIMARY KEY ("id")
);

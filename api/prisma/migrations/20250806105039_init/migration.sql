-- CreateTable
CREATE TABLE "public"."contents" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "optionACaption" TEXT NOT NULL,
    "optionAHashtags" TEXT[],
    "optionBCaption" TEXT NOT NULL,
    "optionBHashtags" TEXT[],
    "selectedOption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contents_pkey" PRIMARY KEY ("id")
);

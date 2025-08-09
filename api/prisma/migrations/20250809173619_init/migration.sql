-- AlterTable
ALTER TABLE "public"."contents" ADD COLUMN     "templateAId" TEXT,
ADD COLUMN     "templateBId" TEXT;

-- CreateTable
CREATE TABLE "public"."prompt_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "systemPrompt" TEXT NOT NULL,
    "alpha" INTEGER NOT NULL DEFAULT 1,
    "beta" INTEGER NOT NULL DEFAULT 1,
    "appearances" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prompt_templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "prompt_templates_name_key" ON "public"."prompt_templates"("name");

-- CreateIndex
CREATE INDEX "contents_templateAId_idx" ON "public"."contents"("templateAId");

-- CreateIndex
CREATE INDEX "contents_templateBId_idx" ON "public"."contents"("templateBId");

-- AddForeignKey
ALTER TABLE "public"."contents" ADD CONSTRAINT "contents_templateAId_fkey" FOREIGN KEY ("templateAId") REFERENCES "public"."prompt_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contents" ADD CONSTRAINT "contents_templateBId_fkey" FOREIGN KEY ("templateBId") REFERENCES "public"."prompt_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

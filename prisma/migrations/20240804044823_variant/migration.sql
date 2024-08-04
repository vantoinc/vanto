-- CreateTable
CREATE TABLE "variant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "variant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "catalog_sku_idx" ON "catalog"("sku");

-- CreateIndex
CREATE INDEX "catalog_name_idx" ON "catalog"("name");

-- AddForeignKey
ALTER TABLE "variant" ADD CONSTRAINT "variant_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "catalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

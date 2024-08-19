-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "totalSupply" INTEGER NOT NULL,
    "decimal" INTEGER NOT NULL,
    "logoUrl" TEXT,
    "xUrl" TEXT,
    "categoryId" INTEGER NOT NULL,
    "networkId" INTEGER NOT NULL,
    "deployerId" TEXT NOT NULL,
    "contract" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dex" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,

    CONSTRAINT "Dex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProjectCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "address" TEXT NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Liquidity" (
    "id" SERIAL NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "dexId" INTEGER NOT NULL,
    "quoteAmount" INTEGER NOT NULL,
    "baseAmount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Liquidity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Network" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "chainId" INTEGER NOT NULL,
    "explorerUrl" TEXT,

    CONSTRAINT "Network_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProjectCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_deployerId_fkey" FOREIGN KEY ("deployerId") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liquidity" ADD CONSTRAINT "Liquidity_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liquidity" ADD CONSTRAINT "Liquidity_dexId_fkey" FOREIGN KEY ("dexId") REFERENCES "Dex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

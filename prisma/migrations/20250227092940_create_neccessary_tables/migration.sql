-- CreateTable
CREATE TABLE "households" (
    "id" BIGSERIAL NOT NULL,
    "mahal_id" BIGINT NOT NULL,
    "house_number" TEXT NOT NULL,
    "house_name" TEXT NOT NULL,
    "full_address" TEXT NOT NULL,
    "family_category" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "updated_by" TEXT,
    "updated_on" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "households_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "household_payments" (
    "id" BIGSERIAL NOT NULL,
    "household_id" BIGINT NOT NULL,
    "payment_type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "premium_amount" INTEGER NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "paid_date" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "updated_by" TEXT,
    "updated_on" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "household_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "email" TEXT,
    "mobile" TEXT,
    "password" TEXT,
    "name" TEXT NOT NULL,
    "gender" TEXT,
    "roles" TEXT[],
    "household_id" BIGINT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "updated_by" TEXT,
    "updated_on" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donations" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "target_amount" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "updated_by" TEXT,
    "updated_on" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_donations" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT,
    "donation_id" BIGINT NOT NULL,
    "amount" INTEGER NOT NULL,
    "referral" TEXT,
    "donated_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "updated_by" TEXT,
    "updated_on" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_donations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_mobile_key" ON "users"("email", "mobile");

-- AddForeignKey
ALTER TABLE "household_payments" ADD CONSTRAINT "household_payments_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "households"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_household_id_fkey" FOREIGN KEY ("household_id") REFERENCES "households"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_donations" ADD CONSTRAINT "user_donations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_donations" ADD CONSTRAINT "user_donations_donation_id_fkey" FOREIGN KEY ("donation_id") REFERENCES "donations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

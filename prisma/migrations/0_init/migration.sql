-- CreateEnum
CREATE TYPE "a_status" AS ENUM ('OPEN', 'CLOSE');

-- CreateEnum
CREATE TYPE "admintypes" AS ENUM ('Verified Admin', 'Support Admin');

-- CreateEnum
CREATE TYPE "b_type" AS ENUM ('KING', 'QUEEN');

-- CreateEnum
CREATE TYPE "n_type" AS ENUM ('Reminder', 'Cancellation', 'Reservation', 'Review');

-- CreateEnum
CREATE TYPE "genders" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "pm_status" AS ENUM ('Waiting', 'Ongoing', 'Success', 'Fail');

-- CreateEnum
CREATE TYPE "problemstatus" AS ENUM ('Pending', 'Solved');

-- CreateEnum
CREATE TYPE "cn_status" AS ENUM ('Not_checkin', 'Checkin', 'Cancel');

-- CreateEnum
CREATE TYPE "users_type" AS ENUM ('Admins', 'Travelers', 'Hosts');

-- CreateTable
CREATE TABLE "accommodation" (
    "accommodation_id" VARCHAR(36) NOT NULL,
    "host_id" VARCHAR(36) NOT NULL,
    "qr_code" TEXT,
    "name_a" VARCHAR(64) NOT NULL,
    "description_a" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "banner" TEXT,
    "address_a" TEXT NOT NULL,
    "city" VARCHAR(64) NOT NULL,
    "province" VARCHAR(64) NOT NULL,
    "distinct_a" VARCHAR(64) NOT NULL,
    "postal_code" CHAR(5) NOT NULL,
    "ggmap_link" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "accommodation_status" "a_status" NOT NULL DEFAULT 'CLOSE',

    CONSTRAINT "accommodation_pkey" PRIMARY KEY ("accommodation_id")
);

-- CreateTable
CREATE TABLE "admin" (
    "admin_id" VARCHAR(36) NOT NULL,
    "admin_type" "admintypes" NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "chatroom" (
    "chatroom_id" VARCHAR(36) NOT NULL,
    "host_id" VARCHAR(36) NOT NULL,
    "traveler_id" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chatroom_pkey" PRIMARY KEY ("chatroom_id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "feedback_id" VARCHAR(36) NOT NULL,
    "traveler_id" VARCHAR(36) NOT NULL,
    "accommodation_id" VARCHAR(36) NOT NULL,
    "reservation_id" VARCHAR(36) NOT NULL,
    "picture" TEXT,
    "timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT,
    "score" DOUBLE PRECISION,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("feedback_id")
);

-- CreateTable
CREATE TABLE "host" (
    "host_id" VARCHAR(36) NOT NULL,
    "admin_id" VARCHAR(36),
    "bank_account" VARCHAR(255),

    CONSTRAINT "host_pkey" PRIMARY KEY ("host_id")
);

-- CreateTable
CREATE TABLE "messages" (
    "message_id" VARCHAR(36) NOT NULL,
    "chatroom_id" VARCHAR(36) NOT NULL,
    "sender_id" VARCHAR(36) NOT NULL,
    "timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("message_id","chatroom_id")
);

-- CreateTable
CREATE TABLE "notification" (
    "notification_id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "reservation_id" VARCHAR(36) NOT NULL,
    "timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notification_type" "n_type" NOT NULL,
    "is_display" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "payment" (
    "payment_id" VARCHAR(36) NOT NULL,
    "timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "host_bank_account" VARCHAR(36) NOT NULL,
    "payment_status" "pm_status" NOT NULL DEFAULT 'Waiting',
    "qrcode_payment" TEXT,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "problem" (
    "problem_id" VARCHAR(36) NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "text" TEXT,
    "topic" TEXT NOT NULL,
    "timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "problem_status" "problemstatus" NOT NULL,

    CONSTRAINT "problem_pkey" PRIMARY KEY ("problem_id")
);

-- CreateTable
CREATE TABLE "reserve" (
    "reservation_id" VARCHAR(36) NOT NULL,
    "room_id" VARCHAR(36) NOT NULL,
    "traveler_id" VARCHAR(36) NOT NULL,
    "payment_id" VARCHAR(36) NOT NULL,
    "timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "check_in_status" "cn_status" NOT NULL DEFAULT 'Not_checkin',

    CONSTRAINT "reserve_pkey" PRIMARY KEY ("reservation_id")
);

-- CreateTable
CREATE TABLE "room" (
    "room_id" VARCHAR(36) NOT NULL,
    "accommodation_id" VARCHAR(36) NOT NULL,
    "room_name" VARCHAR(64) NOT NULL,
    "price" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "is_reserve" BOOLEAN NOT NULL,
    "room_no" TEXT NOT NULL,
    "smoking" BOOLEAN NOT NULL,
    "noise" BOOLEAN NOT NULL,
    "pet" BOOLEAN NOT NULL,
    "washing_machine" BOOLEAN NOT NULL,
    "bed_type" "b_type" NOT NULL,
    "restroom" BOOLEAN NOT NULL,
    "wifi_available" BOOLEAN NOT NULL,
    "max_adult" INTEGER NOT NULL,
    "max_children" INTEGER NOT NULL,
    "banner" TEXT,

    CONSTRAINT "room_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "traveler" (
    "traveler_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "traveler_pkey" PRIMARY KEY ("traveler_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" VARCHAR(36) NOT NULL,
    "citizen_id" CHAR(13),
    "first_name" VARCHAR(64),
    "last_name" VARCHAR(64),
    "email" TEXT NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "birth_date" DATE,
    "age" INTEGER,
    "user_type" "users_type" NOT NULL,
    "phone_no" CHAR(10),
    "gender" "genders",
    "banner" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_citizen_id_key" ON "users"("citizen_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "accommodation" ADD CONSTRAINT "accommodation_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "host"("host_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatroom" ADD CONSTRAINT "chatroom_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "host"("host_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatroom" ADD CONSTRAINT "chatroom_traveler_id_fkey" FOREIGN KEY ("traveler_id") REFERENCES "traveler"("traveler_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "accommodation"("accommodation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_traveler_id_fkey" FOREIGN KEY ("traveler_id") REFERENCES "traveler"("traveler_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reserve"("reservation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "host" ADD CONSTRAINT "host_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("admin_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "host" ADD CONSTRAINT "host_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reserve"("reservation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "problem" ADD CONSTRAINT "problem_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserve" ADD CONSTRAINT "reserve_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("room_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserve" ADD CONSTRAINT "reserve_traveler_id_fkey" FOREIGN KEY ("traveler_id") REFERENCES "traveler"("traveler_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserve" ADD CONSTRAINT "reserve_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("payment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "accommodation"("accommodation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "traveler" ADD CONSTRAINT "traveler_traveler_id_fkey" FOREIGN KEY ("traveler_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;


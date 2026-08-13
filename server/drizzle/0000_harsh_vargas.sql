-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."CompanyRole" AS ENUM('OWNER', 'ADMIN', 'MEMBER');--> statement-breakpoint
CREATE TYPE "public"."EmployeeStatus" AS ENUM('ACTIVE', 'INACTIVE');--> statement-breakpoint
CREATE TYPE "public"."PayFrequency" AS ENUM('MONTHLY', 'BIWEEKLY', 'WEEKLY');--> statement-breakpoint
CREATE TYPE "public"."PayoutMethod" AS ENUM('BANK', 'CRYPTO');--> statement-breakpoint
CREATE TYPE "public"."PayoutStatus" AS ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."PayrollStatus" AS ENUM('DRAFT', 'CALCULATED', 'APPROVED', 'PROCESSING', 'COMPLETED', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."TransactionStatus" AS ENUM('PENDING', 'COMPLETED', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."TransactionType" AS ENUM('PAYROLL_PAYOUT', 'REFUND');--> statement-breakpoint
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"currency" varchar(10) DEFAULT 'USD' NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"status" "EmployeeStatus" DEFAULT 'ACTIVE' NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "compensations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid NOT NULL,
	"amount" numeric(18, 2) NOT NULL,
	"currency" varchar(10) NOT NULL,
	"frequency" "PayFrequency" DEFAULT 'MONTHLY' NOT NULL,
	"effective_from" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payroll_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid NOT NULL,
	"period_start" date NOT NULL,
	"period_end" date NOT NULL,
	"status" "PayrollStatus" DEFAULT 'DRAFT' NOT NULL,
	"total_gross" numeric(18, 2) DEFAULT '0' NOT NULL,
	"total_deductions" numeric(18, 2) DEFAULT '0' NOT NULL,
	"total_net" numeric(18, 2) DEFAULT '0' NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payroll_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payroll_run_id" uuid NOT NULL,
	"employee_id" uuid NOT NULL,
	"gross_amount" numeric(18, 2) NOT NULL,
	"deductions" numeric(18, 2) DEFAULT '0' NOT NULL,
	"net_amount" numeric(18, 2) NOT NULL,
	"currency" varchar(10) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payouts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payroll_item_id" uuid NOT NULL,
	"amount" numeric(18, 2) NOT NULL,
	"currency" varchar(10) NOT NULL,
	"method" "PayoutMethod" NOT NULL,
	"provider" varchar(100),
	"provider_reference" varchar(255),
	"status" "PayoutStatus" DEFAULT 'PENDING' NOT NULL,
	"processed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payout_id" uuid,
	"type" "TransactionType" NOT NULL,
	"amount" numeric(18, 2) NOT NULL,
	"currency" varchar(10) NOT NULL,
	"status" "TransactionStatus" DEFAULT 'PENDING' NOT NULL,
	"provider" varchar(100),
	"provider_reference" varchar(255),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"company_id" uuid NOT NULL,
	"role" "CompanyRole" DEFAULT 'MEMBER' NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "compensations" ADD CONSTRAINT "compensations_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "payroll_runs" ADD CONSTRAINT "payroll_runs_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "payroll_items" ADD CONSTRAINT "payroll_items_payroll_run_id_fkey" FOREIGN KEY ("payroll_run_id") REFERENCES "public"."payroll_runs"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "payroll_items" ADD CONSTRAINT "payroll_items_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "payouts" ADD CONSTRAINT "payouts_payroll_item_id_fkey" FOREIGN KEY ("payroll_item_id") REFERENCES "public"."payroll_items"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_payout_id_fkey" FOREIGN KEY ("payout_id") REFERENCES "public"."payouts"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "companies_slug_idx" ON "companies" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "companies_slug_key" ON "companies" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE INDEX "employees_company_id_idx" ON "employees" USING btree ("company_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "employees_email_idx" ON "employees" USING btree ("email" text_ops);--> statement-breakpoint
CREATE INDEX "compensations_effective_from_idx" ON "compensations" USING btree ("effective_from" date_ops);--> statement-breakpoint
CREATE INDEX "compensations_employee_id_idx" ON "compensations" USING btree ("employee_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payroll_runs_company_id_idx" ON "payroll_runs" USING btree ("company_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payroll_runs_period_start_period_end_idx" ON "payroll_runs" USING btree ("period_start" date_ops,"period_end" date_ops);--> statement-breakpoint
CREATE INDEX "payroll_runs_status_idx" ON "payroll_runs" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "payroll_items_employee_id_idx" ON "payroll_items" USING btree ("employee_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "payroll_items_payroll_run_id_employee_id_key" ON "payroll_items" USING btree ("payroll_run_id" uuid_ops,"employee_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payroll_items_payroll_run_id_idx" ON "payroll_items" USING btree ("payroll_run_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payouts_payroll_item_id_idx" ON "payouts" USING btree ("payroll_item_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payouts_provider_reference_idx" ON "payouts" USING btree ("provider_reference" text_ops);--> statement-breakpoint
CREATE INDEX "payouts_status_idx" ON "payouts" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "transactions_payout_id_idx" ON "transactions" USING btree ("payout_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "transactions_provider_reference_idx" ON "transactions" USING btree ("provider_reference" text_ops);--> statement-breakpoint
CREATE INDEX "transactions_status_idx" ON "transactions" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_key" ON "users" USING btree ("email" text_ops);--> statement-breakpoint
CREATE INDEX "memberships_company_id_idx" ON "memberships" USING btree ("company_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "memberships_user_id_company_id_key" ON "memberships" USING btree ("user_id" uuid_ops,"company_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "memberships_user_id_idx" ON "memberships" USING btree ("user_id" uuid_ops);
*/
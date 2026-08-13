import { pgTable, varchar, timestamp, text, integer, index, uniqueIndex, uuid, foreignKey, numeric, date, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const companyRole = pgEnum("CompanyRole", ['OWNER', 'ADMIN', 'MEMBER'])
export const employeeStatus = pgEnum("EmployeeStatus", ['ACTIVE', 'INACTIVE'])
export const payFrequency = pgEnum("PayFrequency", ['MONTHLY', 'BIWEEKLY', 'WEEKLY'])
export const payoutMethod = pgEnum("PayoutMethod", ['BANK', 'CRYPTO'])
export const payoutStatus = pgEnum("PayoutStatus", ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'])
export const payrollStatus = pgEnum("PayrollStatus", ['DRAFT', 'CALCULATED', 'APPROVED', 'PROCESSING', 'COMPLETED', 'FAILED'])
export const transactionStatus = pgEnum("TransactionStatus", ['PENDING', 'COMPLETED', 'FAILED'])
export const transactionType = pgEnum("TransactionType", ['PAYROLL_PAYOUT', 'REFUND'])


export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar({ length: 36 }).primaryKey().notNull(),
	checksum: varchar({ length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text(),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const companies = pgTable("companies", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	slug: varchar({ length: 255 }).notNull(),
	currency: varchar({ length: 10 }).default('USD').notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	index("companies_slug_idx").using("btree", table.slug.asc().nullsLast().op("text_ops")),
	uniqueIndex("companies_slug_key").using("btree", table.slug.asc().nullsLast().op("text_ops")),
]);

export const employees = pgTable("employees", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	companyId: uuid("company_id").notNull(),
	firstName: varchar("first_name", { length: 100 }).notNull(),
	lastName: varchar("last_name", { length: 100 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	status: employeeStatus().default('ACTIVE').notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	index("employees_company_id_idx").using("btree", table.companyId.asc().nullsLast().op("uuid_ops")),
	index("employees_email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.companyId],
			foreignColumns: [companies.id],
			name: "employees_company_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const compensations = pgTable("compensations", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	employeeId: uuid("employee_id").notNull(),
	amount: numeric({ precision: 18, scale:  2 }).notNull(),
	currency: varchar({ length: 10 }).notNull(),
	frequency: payFrequency().default('MONTHLY').notNull(),
	effectiveFrom: date("effective_from").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	index("compensations_effective_from_idx").using("btree", table.effectiveFrom.asc().nullsLast().op("date_ops")),
	index("compensations_employee_id_idx").using("btree", table.employeeId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "compensations_employee_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const payrollRuns = pgTable("payroll_runs", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	companyId: uuid("company_id").notNull(),
	periodStart: date("period_start").notNull(),
	periodEnd: date("period_end").notNull(),
	status: payrollStatus().default('DRAFT').notNull(),
	totalGross: numeric("total_gross", { precision: 18, scale:  2 }).default('0').notNull(),
	totalDeductions: numeric("total_deductions", { precision: 18, scale:  2 }).default('0').notNull(),
	totalNet: numeric("total_net", { precision: 18, scale:  2 }).default('0').notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	index("payroll_runs_company_id_idx").using("btree", table.companyId.asc().nullsLast().op("uuid_ops")),
	index("payroll_runs_period_start_period_end_idx").using("btree", table.periodStart.asc().nullsLast().op("date_ops"), table.periodEnd.asc().nullsLast().op("date_ops")),
	index("payroll_runs_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	foreignKey({
			columns: [table.companyId],
			foreignColumns: [companies.id],
			name: "payroll_runs_company_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const payrollItems = pgTable("payroll_items", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	payrollRunId: uuid("payroll_run_id").notNull(),
	employeeId: uuid("employee_id").notNull(),
	grossAmount: numeric("gross_amount", { precision: 18, scale:  2 }).notNull(),
	deductions: numeric({ precision: 18, scale:  2 }).default('0').notNull(),
	netAmount: numeric("net_amount", { precision: 18, scale:  2 }).notNull(),
	currency: varchar({ length: 10 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	index("payroll_items_employee_id_idx").using("btree", table.employeeId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("payroll_items_payroll_run_id_employee_id_key").using("btree", table.payrollRunId.asc().nullsLast().op("uuid_ops"), table.employeeId.asc().nullsLast().op("uuid_ops")),
	index("payroll_items_payroll_run_id_idx").using("btree", table.payrollRunId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.payrollRunId],
			foreignColumns: [payrollRuns.id],
			name: "payroll_items_payroll_run_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "payroll_items_employee_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const payouts = pgTable("payouts", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	payrollItemId: uuid("payroll_item_id").notNull(),
	amount: numeric({ precision: 18, scale:  2 }).notNull(),
	currency: varchar({ length: 10 }).notNull(),
	method: payoutMethod().notNull(),
	provider: varchar({ length: 100 }),
	providerReference: varchar("provider_reference", { length: 255 }),
	status: payoutStatus().default('PENDING').notNull(),
	processedAt: timestamp("processed_at", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	index("payouts_payroll_item_id_idx").using("btree", table.payrollItemId.asc().nullsLast().op("uuid_ops")),
	index("payouts_provider_reference_idx").using("btree", table.providerReference.asc().nullsLast().op("text_ops")),
	index("payouts_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	foreignKey({
			columns: [table.payrollItemId],
			foreignColumns: [payrollItems.id],
			name: "payouts_payroll_item_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const transactions = pgTable("transactions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	payoutId: uuid("payout_id"),
	type: transactionType().notNull(),
	amount: numeric({ precision: 18, scale:  2 }).notNull(),
	currency: varchar({ length: 10 }).notNull(),
	status: transactionStatus().default('PENDING').notNull(),
	provider: varchar({ length: 100 }),
	providerReference: varchar("provider_reference", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	index("transactions_payout_id_idx").using("btree", table.payoutId.asc().nullsLast().op("uuid_ops")),
	index("transactions_provider_reference_idx").using("btree", table.providerReference.asc().nullsLast().op("text_ops")),
	index("transactions_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	foreignKey({
			columns: [table.payoutId],
			foreignColumns: [payouts.id],
			name: "transactions_payout_id_fkey"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	email: varchar({ length: 255 }).notNull(),
	passwordHash: text("password_hash").notNull(),
	firstName: varchar("first_name", { length: 100 }).notNull(),
	lastName: varchar("last_name", { length: 100 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	index("users_email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
	uniqueIndex("users_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
]);

export const memberships = pgTable("memberships", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	companyId: uuid("company_id").notNull(),
	role: companyRole().default('MEMBER').notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	index("memberships_company_id_idx").using("btree", table.companyId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("memberships_user_id_company_id_key").using("btree", table.userId.asc().nullsLast().op("uuid_ops"), table.companyId.asc().nullsLast().op("uuid_ops")),
	index("memberships_user_id_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "memberships_user_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.companyId],
			foreignColumns: [companies.id],
			name: "memberships_company_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

import { relations } from "drizzle-orm/relations";
import { companies, employees, compensations, payrollRuns, payrollItems, payouts, transactions, users, memberships } from "./schema";

export const employeesRelations = relations(employees, ({one, many}) => ({
	company: one(companies, {
		fields: [employees.companyId],
		references: [companies.id]
	}),
	compensations: many(compensations),
	payrollItems: many(payrollItems),
}));

export const companiesRelations = relations(companies, ({many}) => ({
	employees: many(employees),
	payrollRuns: many(payrollRuns),
	memberships: many(memberships),
}));

export const compensationsRelations = relations(compensations, ({one}) => ({
	employee: one(employees, {
		fields: [compensations.employeeId],
		references: [employees.id]
	}),
}));

export const payrollRunsRelations = relations(payrollRuns, ({one, many}) => ({
	company: one(companies, {
		fields: [payrollRuns.companyId],
		references: [companies.id]
	}),
	payrollItems: many(payrollItems),
}));

export const payrollItemsRelations = relations(payrollItems, ({one, many}) => ({
	payrollRun: one(payrollRuns, {
		fields: [payrollItems.payrollRunId],
		references: [payrollRuns.id]
	}),
	employee: one(employees, {
		fields: [payrollItems.employeeId],
		references: [employees.id]
	}),
	payouts: many(payouts),
}));

export const payoutsRelations = relations(payouts, ({one, many}) => ({
	payrollItem: one(payrollItems, {
		fields: [payouts.payrollItemId],
		references: [payrollItems.id]
	}),
	transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({one}) => ({
	payout: one(payouts, {
		fields: [transactions.payoutId],
		references: [payouts.id]
	}),
}));

export const membershipsRelations = relations(memberships, ({one}) => ({
	user: one(users, {
		fields: [memberships.userId],
		references: [users.id]
	}),
	company: one(companies, {
		fields: [memberships.companyId],
		references: [companies.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	memberships: many(memberships),
}));
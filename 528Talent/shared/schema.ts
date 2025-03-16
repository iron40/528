import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const candidates = pgTable("candidates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  experience: integer("experience").notNull(),
  skills: text("skills").array().notNull(),
  location: text("location").notNull(),
  summary: text("summary").notNull(),
  contact: text("contact").notNull(),
  status: text("status").notNull().default('active'),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
  updatedAt: text("updated_at").notNull().default(new Date().toISOString()),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  industry: text("industry").notNull(),
  location: text("location").notNull(),
  size: text("size").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default('active'),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
  updatedAt: text("updated_at").notNull().default(new Date().toISOString()),
});

export const candidateInteractions = pgTable("candidate_interactions", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull(),
  candidateId: integer("candidate_id").notNull(),
  status: text("status").notNull(), // interested, contacted, interviewing, offered, hired, rejected
  notes: text("notes"),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
  updatedAt: text("updated_at").notNull().default(new Date().toISOString()),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  plan: text("plan").notNull(),
  active: boolean("active").notNull().default(true),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  message: text("message").notNull(),
});

// Insertion schemas
export const insertCandidateSchema = createInsertSchema(candidates).pick({
  name: true,
  title: true,
  experience: true,
  skills: true,
  location: true,
  summary: true,
  contact: true,
  status: true,
});

export const insertCompanySchema = createInsertSchema(companies).pick({
  name: true,
  industry: true,
  location: true,
  size: true,
  description: true,
});

export const insertInteractionSchema = createInsertSchema(candidateInteractions).pick({
  companyId: true,
  candidateId: true,
  status: true,
  notes: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  email: true,
  plan: true,
});

export const insertContactSchema = createInsertSchema(contacts);

// Types
export type Candidate = typeof candidates.$inferSelect;
export type InsertCandidate = z.infer<typeof insertCandidateSchema>;

export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;

export type CandidateInteraction = typeof candidateInteractions.$inferSelect;
export type InsertCandidateInteraction = z.infer<typeof insertInteractionSchema>;

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
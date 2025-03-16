import {
  type Candidate,
  type InsertCandidate,
  type Subscription,
  type InsertSubscription,
  type Contact,
  type InsertContact,
  candidates,
  subscriptions,
  contacts,
  type Company,
  type InsertCompany,
  type CandidateInteraction,
  type InsertCandidateInteraction,
  companies,
  candidateInteractions,
} from "@shared/schema";
import { db } from "./db";
import { eq, ilike, and, gte, lte, or, sql } from "drizzle-orm";

export interface IStorage {
  getCandidates(filters?: {
    search?: string;
    skills?: string[];
    experienceMin?: number;
    experienceMax?: number;
    location?: string;
    status?: string;
  }): Promise<Candidate[]>;
  getCandidate(id: number): Promise<Candidate | undefined>;
  createCandidate(candidate: InsertCandidate): Promise<Candidate>;
  updateCandidate(id: number, updates: Partial<InsertCandidate & { updatedAt: string }>): Promise<Candidate | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  getSubscription(email: string): Promise<Subscription | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  // Company methods
  getCompanies(filters?: {
    search?: string;
    industry?: string;
    status?: string;
  }): Promise<Company[]>;
  getCompany(id: number): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;
  updateCompany(id: number, updates: Partial<InsertCompany & { updatedAt: string }>): Promise<Company | undefined>;

  // Interaction methods
  getCompanyInteractions(companyId: number): Promise<CandidateInteraction[]>;
  createInteraction(interaction: InsertCandidateInteraction): Promise<CandidateInteraction>;
  updateInteraction(id: number, updates: Partial<InsertCandidateInteraction & { updatedAt: string }>): Promise<CandidateInteraction | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getCandidates(filters?: {
    search?: string;
    skills?: string[];
    experienceMin?: number;
    experienceMax?: number;
    location?: string;
    status?: string;
  }): Promise<Candidate[]> {
    let query = db.select().from(candidates);

    if (filters) {
      const conditions = [];

      if (filters.search) {
        conditions.push(
          or(
            ilike(candidates.name, `%${filters.search}%`),
            ilike(candidates.title, `%${filters.search}%`),
            ilike(candidates.summary, `%${filters.search}%`)
          )
        );
      }

      if (filters.skills?.length) {
        filters.skills.forEach(skill => {
          conditions.push(
            sql`${skill} = ANY(${candidates.skills})`
          );
        });
      }

      if (filters.experienceMin !== undefined) {
        conditions.push(gte(candidates.experience, filters.experienceMin));
      }

      if (filters.experienceMax !== undefined) {
        conditions.push(lte(candidates.experience, filters.experienceMax));
      }

      if (filters.location) {
        conditions.push(ilike(candidates.location, `%${filters.location}%`));
      }

      if (filters.status) {
        conditions.push(eq(candidates.status, filters.status));
      } else {
        // By default, only show active candidates
        conditions.push(eq(candidates.status, 'active'));
      }

      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }

    return await query;
  }

  async getCandidate(id: number): Promise<Candidate | undefined> {
    const [candidate] = await db
      .select()
      .from(candidates)
      .where(eq(candidates.id, id));
    return candidate;
  }

  async createCandidate(candidate: InsertCandidate): Promise<Candidate> {
    const [newCandidate] = await db
      .insert(candidates)
      .values({
        ...candidate,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returning();
    return newCandidate;
  }

  async updateCandidate(
    id: number,
    updates: Partial<InsertCandidate & { updatedAt: string }>
  ): Promise<Candidate | undefined> {
    const [updated] = await db
      .update(candidates)
      .set(updates)
      .where(eq(candidates.id, id))
      .returning();
    return updated;
  }

  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const [newSubscription] = await db
      .insert(subscriptions)
      .values({ ...subscription, active: true })
      .returning();
    return newSubscription;
  }

  async getSubscription(email: string): Promise<Subscription | undefined> {
    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.email, email));
    return subscription;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db
      .insert(contacts)
      .values(contact)
      .returning();
    return newContact;
  }

  async getCompanies(filters?: {
    search?: string;
    industry?: string;
    status?: string;
  }): Promise<Company[]> {
    let query = db.select().from(companies);

    if (filters) {
      const conditions = [];

      if (filters.search) {
        conditions.push(
          or(
            ilike(companies.name, `%${filters.search}%`),
            ilike(companies.description, `%${filters.search}%`)
          )
        );
      }

      if (filters.industry) {
        conditions.push(eq(companies.industry, filters.industry));
      }

      if (filters.status) {
        conditions.push(eq(companies.status, filters.status));
      } else {
        conditions.push(eq(companies.status, 'active'));
      }

      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }

    return await query;
  }

  async getCompany(id: number): Promise<Company | undefined> {
    const [company] = await db
      .select()
      .from(companies)
      .where(eq(companies.id, id));
    return company;
  }

  async createCompany(company: InsertCompany): Promise<Company> {
    const [newCompany] = await db
      .insert(companies)
      .values({
        ...company,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returning();
    return newCompany;
  }

  async updateCompany(
    id: number,
    updates: Partial<InsertCompany & { updatedAt: string }>
  ): Promise<Company | undefined> {
    const [updated] = await db
      .update(companies)
      .set(updates)
      .where(eq(companies.id, id))
      .returning();
    return updated;
  }

  async getCompanyInteractions(companyId: number): Promise<CandidateInteraction[]> {
    return await db
      .select()
      .from(candidateInteractions)
      .where(eq(candidateInteractions.companyId, companyId));
  }

  async createInteraction(interaction: InsertCandidateInteraction): Promise<CandidateInteraction> {
    const [newInteraction] = await db
      .insert(candidateInteractions)
      .values({
        ...interaction,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .returning();
    return newInteraction;
  }

  async updateInteraction(
    id: number,
    updates: Partial<InsertCandidateInteraction & { updatedAt: string }>
  ): Promise<CandidateInteraction | undefined> {
    const [updated] = await db
      .update(candidateInteractions)
      .set(updates)
      .where(eq(candidateInteractions.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
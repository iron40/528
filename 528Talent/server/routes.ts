import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertCandidateSchema, insertContactSchema, insertSubscriptionSchema, insertCompanySchema } from "@shared/schema";
import { z } from "zod";

const searchParamsSchema = z.object({
  search: z.string().optional(),
  skills: z.array(z.string()).optional(),
  experienceMin: z.coerce.number().optional(),
  experienceMax: z.coerce.number().optional(),
  location: z.string().optional(),
  status: z.string().optional(),
}).parse;

export async function registerRoutes(app: Express) {
  app.get("/api/candidates", async (req, res) => {
    try {
      const filters = searchParamsSchema({
        search: req.query.search,
        skills: req.query.skills ? JSON.parse(req.query.skills as string) : undefined,
        experienceMin: req.query.experienceMin,
        experienceMax: req.query.experienceMax,
        location: req.query.location,
        status: req.query.status,
      });

      const candidates = await storage.getCandidates(filters);
      res.json(candidates);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid search parameters" });
      }
      throw error;
    }
  });

  app.get("/api/candidates/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const candidate = await storage.getCandidate(id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.json(candidate);
  });

  app.post("/api/candidates", async (req, res) => {
    try {
      const candidate = insertCandidateSchema.parse(req.body);
      const result = await storage.createCandidate(candidate);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid candidate data" });
      }
      throw error;
    }
  });

  app.patch("/api/candidates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertCandidateSchema.partial().parse(req.body);
      const result = await storage.updateCandidate(id, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
      if (!result) {
        return res.status(404).json({ message: "Candidate not found" });
      }
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid update data" });
      }
      throw error;
    }
  });

  app.delete("/api/candidates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.updateCandidate(id, {
        status: 'archived',
        updatedAt: new Date().toISOString(),
      });
      res.status(204).end();
    } catch (error) {
      throw error;
    }
  });

  app.post("/api/subscribe", async (req, res) => {
    try {
      const subscription = insertSubscriptionSchema.parse(req.body);
      const existing = await storage.getSubscription(subscription.email);
      if (existing) {
        return res.status(400).json({ message: "Email already subscribed" });
      }
      const result = await storage.createSubscription(subscription);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid subscription data" });
      }
      throw error;
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const contact = insertContactSchema.parse(req.body);
      const result = await storage.createContact(contact);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data" });
      }
      throw error;
    }
  });

  app.get("/api/companies", async (req, res) => {
    try {
      const filters = {
        search: req.query.search as string,
        industry: req.query.industry as string,
        status: req.query.status as string,
      };

      const companies = await storage.getCompanies(filters);
      res.json(companies);
    } catch (error) {
      throw error;
    }
  });

  app.get("/api/companies/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const company = await storage.getCompany(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json(company);
  });

  app.post("/api/companies", async (req, res) => {
    try {
      const company = insertCompanySchema.parse(req.body);
      const result = await storage.createCompany(company);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid company data" });
      }
      throw error;
    }
  });

  app.patch("/api/companies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertCompanySchema.partial().parse(req.body);
      const result = await storage.updateCompany(id, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
      if (!result) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid update data" });
      }
      throw error;
    }
  });

  app.get("/api/companies/:id/interactions", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const interactions = await storage.getCompanyInteractions(id);
      res.json(interactions);
    } catch (error) {
      throw error;
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  profileComplete: integer("profile_complete").notNull().default(0),
  winStreak: integer("win_streak").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tender schema
export const tenders = pgTable("tenders", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  location: text("location"),
  status: text("status").notNull(),
  issuer: text("issuer").notNull(),
  winChance: integer("win_chance").notNull(),
  dueDate: timestamp("due_date"),
  lng: text("lng"),
  lat: text("lat"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Quotes schema
export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  supplierId: text("supplier_id").notNull(),
  amount: text("amount").notNull(),
  delayIncrease: text("delay_increase"),
  submissionId: text("submission_id"),
  submissionRisk: text("submission_risk"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// BEE Tasks schema
export const beeTasks = pgTable("bee_tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  status: text("status").notNull(),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Site Meetings schema
export const siteMeetings = pgTable("site_meetings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  status: text("status").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Bid Openings schema
export const bidOpenings = pgTable("bid_openings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  dateTime: timestamp("date_time").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Smart Contracts schema
export const smartContracts = pgTable("smart_contracts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  contractNumber: text("contract_number").notNull(),
  progress: integer("progress").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Chat messages schema
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  sender: text("sender").notNull(), // 'user' or 'ai'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertTenderSchema = createInsertSchema(tenders).omit({ id: true, createdAt: true });
export const insertQuoteSchema = createInsertSchema(quotes).omit({ id: true, createdAt: true });
export const insertBeeTaskSchema = createInsertSchema(beeTasks).omit({ id: true, createdAt: true });
export const insertSiteMeetingSchema = createInsertSchema(siteMeetings).omit({ id: true, createdAt: true });
export const insertBidOpeningSchema = createInsertSchema(bidOpenings).omit({ id: true, createdAt: true });
export const insertSmartContractSchema = createInsertSchema(smartContracts).omit({ id: true, createdAt: true });
export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({ id: true, createdAt: true });

// Insert Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertTender = z.infer<typeof insertTenderSchema>;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type InsertBeeTask = z.infer<typeof insertBeeTaskSchema>;
export type InsertSiteMeeting = z.infer<typeof insertSiteMeetingSchema>;
export type InsertBidOpening = z.infer<typeof insertBidOpeningSchema>;
export type InsertSmartContract = z.infer<typeof insertSmartContractSchema>;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;

// Select Types
export type User = typeof users.$inferSelect;
export type Tender = typeof tenders.$inferSelect;
export type Quote = typeof quotes.$inferSelect;
export type BeeTask = typeof beeTasks.$inferSelect;
export type SiteMeeting = typeof siteMeetings.$inferSelect;
export type BidOpening = typeof bidOpenings.$inferSelect;
export type SmartContract = typeof smartContracts.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;

// Dashboard response schema
export const dashboardResponseSchema = z.object({
  user: z.object({
    name: z.string(),
    profileComplete: z.number(),
    winStreak: z.number()
  }),
  tender: z.object({
    title: z.string(),
    status: z.string(),
    issuer: z.string(),
    winChance: z.number(),
    lagngiacts: z.string(),
    competitor: z.string()
  }),
  quote: z.object({
    id: z.string(),
    amount: z.string(),
    delayIncrease: z.string(),
    submissionId: z.string(),
    submissionRisk: z.string(),
    supplierRisk: z.string()
  }),
  mapboxToken: z.string().optional(),
  mapMarkers: z.array(z.object({
    lng: z.number(),
    lat: z.number(),
    type: z.string(),
    popupText: z.string()
  })),
  beeTasks: z.array(z.object({
    name: z.string(),
    status: z.string(),
    statusColor: z.string()
  })),
  analytics: z.object({
    rfqs: z.number(),
    success: z.number(),
    progress: z.number()
  }),
  siteMeetings: z.array(z.object({
    id: z.string(),
    title: z.string(),
    date: z.string(),
    location: z.string(),
    status: z.string(),
    statusClass: z.string(),
    imageUrl: z.string()
  })),
  tendersDue: z.array(z.object({
    id: z.string(),
    project: z.string(),
    dueDate: z.string(),
    status: z.string(),
    statusClass: z.string()
  })),
  tendersPickUp: z.array(z.object({
    id: z.string(),
    title: z.string(),
    deadline: z.string(),
    deadlineStatus: z.string(),
    imageUrl: z.string()
  })),
  bidOpenings: z.array(z.object({
    id: z.string(),
    title: z.string(),
    dateTime: z.string(),
    status: z.string(),
    statusClass: z.string()
  })),
  smartContracts: z.array(z.object({
    id: z.string(),
    title: z.string(),
    contractNumber: z.string(),
    progress: z.number(),
    progressClass: z.string()
  })),
  submittedTenders: z.array(z.object({
    id: z.string(),
    title: z.string(),
    status: z.string(),
    statusClass: z.string()
  })),
  activeTasks: z.array(z.object({
    id: z.string(),
    title: z.string(),
    status: z.string(),
    statusClass: z.string()
  }))
});

export type DashboardResponse = z.infer<typeof dashboardResponseSchema>;

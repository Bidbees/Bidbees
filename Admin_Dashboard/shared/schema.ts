import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Admin users schema
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("admin"),
  lastLogin: timestamp("last_login"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// System services schema
export const systemServices = pgTable("system_services", {
  id: serial("id").primaryKey(),
  serviceId: text("service_id").notNull().unique(),
  name: text("name").notNull(),
  status: text("status").notNull().default("healthy"),
  uptime: text("uptime"),
  lastIncident: timestamp("last_incident"),
  metricEndpoint: text("metric_endpoint"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// System metrics schema
export const systemMetrics = pgTable("system_metrics", {
  id: serial("id").primaryKey(),
  serviceId: text("service_id").references(() => systemServices.serviceId),
  metricType: text("metric_type").notNull(),
  value: integer("value").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Support tickets schema
export const supportTickets = pgTable("support_tickets", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("open"),
  priority: text("priority").notNull().default("medium"),
  assigneeId: integer("assignee_id").references(() => adminUsers.id),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at"),
});

// Ticket comments schema
export const ticketComments = pgTable("ticket_comments", {
  id: serial("id").primaryKey(),
  ticketId: integer("ticket_id").notNull().references(() => supportTickets.id),
  authorId: integer("author_id").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Content moderation schema
export const moderationQueue = pgTable("moderation_queue", {
  id: serial("id").primaryKey(),
  contentType: text("content_type").notNull(),
  contentId: text("content_id").notNull(),
  reason: text("reason").notNull(),
  status: text("status").notNull().default("pending"),
  moderatorId: integer("moderator_id").references(() => adminUsers.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at"),
});

// Financial transactions schema
export const financialTransactions = pgTable("financial_transactions", {
  id: serial("id").primaryKey(),
  transactionId: text("transaction_id").notNull().unique(),
  amount: integer("amount").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull(),
  userId: integer("user_id"),
  description: text("description"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// System configurations schema
export const systemConfigurations = pgTable("system_configurations", {
  id: serial("id").primaryKey(),
  configKey: text("config_key").notNull().unique(),
  configValue: text("config_value").notNull(),
  description: text("description"),
  lastModifiedBy: integer("last_modified_by").references(() => adminUsers.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Email templates schema
export const emailTemplates = pgTable("email_templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  variables: jsonb("variables"),
  lastModifiedBy: integer("last_modified_by").references(() => adminUsers.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User activity logs schema
export const userActivityLogs = pgTable("user_activity_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  activityType: text("activity_type").notNull(),
  details: jsonb("details"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Admin activity logs schema
export const adminActivityLogs = pgTable("admin_activity_logs", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id").references(() => adminUsers.id).notNull(),
  activityType: text("activity_type").notNull(),
  details: jsonb("details"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Feature flags schema
export const featureFlags = pgTable("feature_flags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  enabled: boolean("enabled").notNull().default(false),
  targetGroups: jsonb("target_groups"),
  lastModifiedBy: integer("last_modified_by").references(() => adminUsers.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Insert Schemas
export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({ id: true, createdAt: true, updatedAt: true });
export const insertSystemServiceSchema = createInsertSchema(systemServices).omit({ id: true, createdAt: true, updatedAt: true });
export const insertSystemMetricSchema = createInsertSchema(systemMetrics).omit({ id: true });
export const insertSupportTicketSchema = createInsertSchema(supportTickets).omit({ id: true, createdAt: true, updatedAt: true, resolvedAt: true });
export const insertTicketCommentSchema = createInsertSchema(ticketComments).omit({ id: true, createdAt: true });
export const insertModerationQueueSchema = createInsertSchema(moderationQueue).omit({ id: true, createdAt: true, updatedAt: true, resolvedAt: true });
export const insertFinancialTransactionSchema = createInsertSchema(financialTransactions).omit({ id: true, createdAt: true, updatedAt: true });
export const insertSystemConfigurationSchema = createInsertSchema(systemConfigurations).omit({ id: true, createdAt: true, updatedAt: true });
export const insertEmailTemplateSchema = createInsertSchema(emailTemplates).omit({ id: true, createdAt: true, updatedAt: true });
export const insertUserActivityLogSchema = createInsertSchema(userActivityLogs).omit({ id: true, createdAt: true });
export const insertAdminActivityLogSchema = createInsertSchema(adminActivityLogs).omit({ id: true, createdAt: true });
export const insertFeatureFlagSchema = createInsertSchema(featureFlags).omit({ id: true, createdAt: true, updatedAt: true });

// Insert Types
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type InsertSystemService = z.infer<typeof insertSystemServiceSchema>;
export type InsertSystemMetric = z.infer<typeof insertSystemMetricSchema>;
export type InsertSupportTicket = z.infer<typeof insertSupportTicketSchema>;
export type InsertTicketComment = z.infer<typeof insertTicketCommentSchema>;
export type InsertModerationQueue = z.infer<typeof insertModerationQueueSchema>;
export type InsertFinancialTransaction = z.infer<typeof insertFinancialTransactionSchema>;
export type InsertSystemConfiguration = z.infer<typeof insertSystemConfigurationSchema>;
export type InsertEmailTemplate = z.infer<typeof insertEmailTemplateSchema>;
export type InsertUserActivityLog = z.infer<typeof insertUserActivityLogSchema>;
export type InsertAdminActivityLog = z.infer<typeof insertAdminActivityLogSchema>;
export type InsertFeatureFlag = z.infer<typeof insertFeatureFlagSchema>;

// Select Types
export type AdminUser = typeof adminUsers.$inferSelect;
export type SystemService = typeof systemServices.$inferSelect;
export type SystemMetric = typeof systemMetrics.$inferSelect;
export type SupportTicket = typeof supportTickets.$inferSelect;
export type TicketComment = typeof ticketComments.$inferSelect;
export type ModerationQueue = typeof moderationQueue.$inferSelect;
export type FinancialTransaction = typeof financialTransactions.$inferSelect;
export type SystemConfiguration = typeof systemConfigurations.$inferSelect;
export type EmailTemplate = typeof emailTemplates.$inferSelect;
export type UserActivityLog = typeof userActivityLogs.$inferSelect;
export type AdminActivityLog = typeof adminActivityLogs.$inferSelect;
export type FeatureFlag = typeof featureFlags.$inferSelect;
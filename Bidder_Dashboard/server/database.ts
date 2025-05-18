import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { 
  users, tenders, quotes, beeTasks, siteMeetings, 
  bidOpenings, smartContracts, chatMessages,
  type User, type Tender, type Quote, type BeeTask, 
  type SiteMeeting, type BidOpening, type SmartContract, 
  type ChatMessage, type InsertUser, type InsertTender,
  type InsertQuote, type InsertBeeTask, type InsertSiteMeeting,
  type InsertBidOpening, type InsertSmartContract, type InsertChatMessage
} from "@shared/schema";
import { eq } from "drizzle-orm";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Postgres client
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Connection string for migrations and schema setup
const migrationClient = postgres(databaseUrl, { max: 1 });
const db = drizzle(migrationClient);

// Connection string for query operations
const queryClient = postgres(databaseUrl);
const queryDb = drizzle(queryClient);

// Run migrations
export async function runMigrations() {
  try {
    console.log("Running migrations...");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
}

// Database Interface
export interface IDatabaseAdapter {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Tender operations
  getTender(id: number): Promise<Tender | undefined>;
  getTenders(): Promise<Tender[]>;
  createTender(tender: InsertTender): Promise<Tender>;
  
  // Quote operations
  getQuote(id: number): Promise<Quote | undefined>;
  getQuotes(): Promise<Quote[]>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  
  // BeeTask operations
  getBeeTask(id: number): Promise<BeeTask | undefined>;
  getBeeTasks(): Promise<BeeTask[]>;
  createBeeTask(task: InsertBeeTask): Promise<BeeTask>;
  
  // SiteMeeting operations
  getSiteMeeting(id: number): Promise<SiteMeeting | undefined>;
  getSiteMeetings(): Promise<SiteMeeting[]>;
  createSiteMeeting(meeting: InsertSiteMeeting): Promise<SiteMeeting>;
  
  // BidOpening operations
  getBidOpening(id: number): Promise<BidOpening | undefined>;
  getBidOpenings(): Promise<BidOpening[]>;
  createBidOpening(opening: InsertBidOpening): Promise<BidOpening>;
  
  // SmartContract operations
  getSmartContract(id: number): Promise<SmartContract | undefined>;
  getSmartContracts(): Promise<SmartContract[]>;
  createSmartContract(contract: InsertSmartContract): Promise<SmartContract>;
  
  // ChatMessage operations
  getChatMessage(id: number): Promise<ChatMessage | undefined>;
  getChatMessagesByUserId(userId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // File storage with Supabase
  uploadFile(bucketName: string, path: string, file: File): Promise<string>;
  getFileUrl(bucketName: string, path: string): Promise<string | null>;
}

// Supabase Database Adapter Implementation
export class SupabaseDatabaseAdapter implements IDatabaseAdapter {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await queryDb.select().from(users).where(eq(users.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await queryDb.select().from(users).where(eq(users.username, username));
    return result.length > 0 ? result[0] : undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await queryDb.insert(users).values(user).returning();
    return result[0];
  }

  // Tender operations
  async getTender(id: number): Promise<Tender | undefined> {
    const result = await queryDb.select().from(tenders).where(eq(tenders.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getTenders(): Promise<Tender[]> {
    return await queryDb.select().from(tenders);
  }

  async createTender(tender: InsertTender): Promise<Tender> {
    const result = await queryDb.insert(tenders).values(tender).returning();
    return result[0];
  }

  // Quote operations
  async getQuote(id: number): Promise<Quote | undefined> {
    const result = await queryDb.select().from(quotes).where(eq(quotes.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getQuotes(): Promise<Quote[]> {
    return await queryDb.select().from(quotes);
  }

  async createQuote(quote: InsertQuote): Promise<Quote> {
    const result = await queryDb.insert(quotes).values(quote).returning();
    return result[0];
  }

  // BeeTask operations
  async getBeeTask(id: number): Promise<BeeTask | undefined> {
    const result = await queryDb.select().from(beeTasks).where(eq(beeTasks.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getBeeTasks(): Promise<BeeTask[]> {
    return await queryDb.select().from(beeTasks);
  }

  async createBeeTask(task: InsertBeeTask): Promise<BeeTask> {
    const result = await queryDb.insert(beeTasks).values(task).returning();
    return result[0];
  }

  // SiteMeeting operations
  async getSiteMeeting(id: number): Promise<SiteMeeting | undefined> {
    const result = await queryDb.select().from(siteMeetings).where(eq(siteMeetings.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getSiteMeetings(): Promise<SiteMeeting[]> {
    return await queryDb.select().from(siteMeetings);
  }

  async createSiteMeeting(meeting: InsertSiteMeeting): Promise<SiteMeeting> {
    const result = await queryDb.insert(siteMeetings).values(meeting).returning();
    return result[0];
  }

  // BidOpening operations
  async getBidOpening(id: number): Promise<BidOpening | undefined> {
    const result = await queryDb.select().from(bidOpenings).where(eq(bidOpenings.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getBidOpenings(): Promise<BidOpening[]> {
    return await queryDb.select().from(bidOpenings);
  }

  async createBidOpening(opening: InsertBidOpening): Promise<BidOpening> {
    const result = await queryDb.insert(bidOpenings).values(opening).returning();
    return result[0];
  }

  // SmartContract operations
  async getSmartContract(id: number): Promise<SmartContract | undefined> {
    const result = await queryDb.select().from(smartContracts).where(eq(smartContracts.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getSmartContracts(): Promise<SmartContract[]> {
    return await queryDb.select().from(smartContracts);
  }

  async createSmartContract(contract: InsertSmartContract): Promise<SmartContract> {
    const result = await queryDb.insert(smartContracts).values(contract).returning();
    return result[0];
  }

  // ChatMessage operations
  async getChatMessage(id: number): Promise<ChatMessage | undefined> {
    const result = await queryDb.select().from(chatMessages).where(eq(chatMessages.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getChatMessagesByUserId(userId: number): Promise<ChatMessage[]> {
    return await queryDb.select().from(chatMessages).where(eq(chatMessages.userId, userId));
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const result = await queryDb.insert(chatMessages).values(message).returning();
    return result[0];
  }

  // File storage with Supabase
  async uploadFile(bucketName: string, path: string, file: File): Promise<string> {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(path, file, {
        upsert: true,
      });

    if (error) {
      console.error("Error uploading file:", error);
      throw error;
    }

    return data.path;
  }

  async getFileUrl(bucketName: string, path: string): Promise<string | null> {
    const { data } = await supabase.storage
      .from(bucketName)
      .getPublicUrl(path);

    return data.publicUrl || null;
  }
}

// Create and export database instance
export const databaseAdapter = new SupabaseDatabaseAdapter();
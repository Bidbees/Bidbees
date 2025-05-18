import { databaseAdapter } from "./database";
import { users, type User, type InsertUser, chatMessages, type InsertChatMessage, type ChatMessage } from "@shared/schema";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCurrentUser(): Promise<User | undefined>;
  saveChatMessage(message: { userId: number; content: string; sender: string }): Promise<ChatMessage>;
  getChatHistory(userId: number): Promise<ChatMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatMessages: Map<number, ChatMessage>;
  private currentUserId: number | null = null;
  currentId: number;
  currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.chatMessages = new Map();
    this.currentId = 1;
    this.currentMessageId = 1;
    
    // Add a default user
    this.createUser({
      username: "sxulsh",
      password: "password123",
      name: "Sxulsh",
      profileComplete: 75,
      winStreak: 3
    });
    
    // Set current user for demo
    this.currentUserId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }
  
  async getCurrentUser(): Promise<User | undefined> {
    if (this.currentUserId) {
      return this.getUser(this.currentUserId);
    }
    return undefined;
  }
  
  async saveChatMessage(message: { userId: number; content: string; sender: string }): Promise<ChatMessage> {
    const id = this.currentMessageId++;
    const now = new Date();
    const chatMessage: ChatMessage = { 
      id, 
      userId: message.userId,
      content: message.content,
      sender: message.sender,
      createdAt: now
    };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }
  
  async getChatHistory(userId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.userId === userId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}

// Database-backed storage implementation using Supabase
export class DatabaseStorage implements IStorage {
  private currentUserId: number | null = null;
  
  constructor() {
    // Initialize with a default user if needed
    this.ensureDefaultUser();
  }
  
  private async ensureDefaultUser() {
    try {
      // Check if default user exists
      const existingUser = await databaseAdapter.getUserByUsername("sxulsh");
      
      if (!existingUser) {
        // Create default user
        await this.createUser({
          username: "sxulsh",
          password: "password123", // In production, this should be hashed
          name: "Sxulsh",
          profileComplete: 75,
          winStreak: 3
        });
      }
      
      // Set current user for demo
      this.currentUserId = existingUser?.id || 1;
    } catch (error) {
      console.error("Failed to ensure default user:", error);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return databaseAdapter.getUser(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return databaseAdapter.getUserByUsername(username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    return databaseAdapter.createUser(insertUser);
  }
  
  async getCurrentUser(): Promise<User | undefined> {
    if (this.currentUserId) {
      return this.getUser(this.currentUserId);
    }
    return undefined;
  }
  
  async saveChatMessage(message: { userId: number; content: string; sender: string }): Promise<ChatMessage> {
    return databaseAdapter.createChatMessage({
      userId: message.userId,
      content: message.content,
      sender: message.sender
    });
  }
  
  async getChatHistory(userId: number): Promise<ChatMessage[]> {
    return databaseAdapter.getChatMessagesByUserId(userId);
  }
}

// Choose which storage implementation to use based on environment
// Use MemStorage for development and DatabaseStorage for production
const useDbStorage = process.env.NODE_ENV === "production" || process.env.USE_DATABASE === "true";

export const storage = useDbStorage ? new DatabaseStorage() : new MemStorage();
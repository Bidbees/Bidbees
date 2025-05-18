import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import jwt from "jsonwebtoken";

// Mock data for initial development
const mockUsers = [
  {
    id: 1,
    username: "admin",
    email: "admin@bidbees.com",
    role: "admin",
    name: "Admin User",
    createdAt: new Date("2023-01-01"),
    lastLogin: new Date("2023-12-01"),
    status: "active",
  },
  {
    id: 2,
    username: "moderator",
    email: "moderator@bidbees.com",
    role: "moderator",
    name: "Content Moderator",
    createdAt: new Date("2023-02-15"),
    lastLogin: new Date("2023-11-28"),
    status: "active",
  },
  {
    id: 3,
    username: "support",
    email: "support@bidbees.com",
    role: "support",
    name: "Support Agent",
    createdAt: new Date("2023-03-10"),
    lastLogin: new Date("2023-11-30"),
    status: "active",
  },
];

const mockServiceStatus = [
  { id: "auth-service", name: "Authentication Service", status: "healthy", uptime: "99.98%", lastIncident: null },
  { id: "bidder-service", name: "Bidder Service", status: "healthy", uptime: "99.95%", lastIncident: "2023-11-15" },
  { id: "tender-service", name: "Tender Service", status: "degraded", uptime: "98.5%", lastIncident: "2023-11-29" },
  { id: "payment-service", name: "Payment Service", status: "healthy", uptime: "99.99%", lastIncident: null },
  { id: "notification-service", name: "Notification Service", status: "healthy", uptime: "99.9%", lastIncident: "2023-11-20" },
];

const mockSystemMetrics = {
  cpu: { current: 45, history: [42, 45, 43, 47, 44, 42, 41, 45, 48, 47] },
  memory: { current: 62, history: [58, 60, 62, 65, 63, 62, 64, 66, 63, 62] },
  disk: { current: 73, history: [70, 71, 72, 72, 73, 73, 73, 74, 74, 73] },
  network: { current: 38, history: [32, 35, 37, 40, 42, 38, 36, 34, 33, 38] }
};

const mockTickets = [
  { id: 1, title: "Login Issue", status: "open", priority: "high", assignee: "Support Agent", created: "2023-11-28", updated: "2023-11-29" },
  { id: 2, title: "Payment Failed", status: "in-progress", priority: "critical", assignee: "Support Lead", created: "2023-11-27", updated: "2023-11-29" },
  { id: 3, title: "Document Upload Error", status: "open", priority: "medium", assignee: null, created: "2023-11-29", updated: "2023-11-29" },
  { id: 4, title: "Account Verification", status: "resolved", priority: "low", assignee: "Support Agent", created: "2023-11-25", updated: "2023-11-28" },
  { id: 5, title: "Bid Submission Failed", status: "in-progress", priority: "high", assignee: "Technical Support", created: "2023-11-26", updated: "2023-11-29" },
];

const mockRevenue = {
  daily: [12500, 13200, 14100, 13800, 15000, 14700, 15200],
  monthly: [380000, 395000, 410000, 425000, 440000, 460000],
  transactions: [
    { id: "tx-1001", amount: 5000, type: "subscription", status: "completed", date: "2023-11-29" },
    { id: "tx-1002", amount: 2500, type: "fee", status: "completed", date: "2023-11-29" },
    { id: "tx-1003", amount: 12000, type: "subscription", status: "pending", date: "2023-11-29" },
    { id: "tx-1004", amount: 4500, type: "fee", status: "completed", date: "2023-11-28" },
    { id: "tx-1005", amount: 8000, type: "subscription", status: "failed", date: "2023-11-28" },
  ]
};

// Auth middleware for protected routes
const authMiddleware = (req: Request, res: Response, next: Function) => {
  // For development, allow all requests
  if (process.env.NODE_ENV === "development") {
    req.user = mockUsers[0]; // Set admin user for development
    return next();
  }

  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const secret = process.env.JWT_SECRET || "development-jwt-secret";
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Authentication endpoint
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        username: z.string().min(1),
        password: z.string().min(1),
      });

      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid login credentials" });
      }

      const { username, password } = result.data;
      
      // For development, accept any login with admin/admin or predefined users
      if (process.env.NODE_ENV === "development" && 
          ((username === "admin" && password === "admin") || 
           mockUsers.some(u => u.username === username))) {
        
        const user = mockUsers.find(u => u.username === username) || mockUsers[0];
        
        const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          process.env.JWT_SECRET || "development-jwt-secret",
          { expiresIn: "24h" }
        );
        
        return res.status(200).json({ 
          token,
          user: {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      }
      
      // In production, perform actual auth here
      return res.status(401).json({ message: "Invalid login credentials" });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Authentication failed" });
    }
  });

  // Dashboard overview data
  app.get("/api/admin/dashboard", authMiddleware, async (req: Request, res: Response) => {
    try {
      const dashboardData = {
        userCount: 1250,
        activeUsers: 875,
        newUsersToday: 42,
        pendingApprovals: 15,
        systemHealth: {
          overallStatus: "healthy",
          services: mockServiceStatus,
          metrics: mockSystemMetrics
        },
        recentActivity: [
          { type: "user_signup", user: "newbidder123", timestamp: "2023-11-29T14:35:00Z" },
          { type: "tender_created", user: "govagency5", timestamp: "2023-11-29T13:22:00Z" },
          { type: "bid_submitted", user: "contractor7", timestamp: "2023-11-29T12:17:00Z" },
          { type: "payment_processed", user: "supplier22", timestamp: "2023-11-29T10:45:00Z" },
          { type: "support_ticket", user: "bidder19", timestamp: "2023-11-29T09:30:00Z" },
        ],
        tickets: {
          open: 12,
          inProgress: 8,
          resolved: 35,
          critical: 3
        },
        revenue: {
          daily: mockRevenue.daily,
          monthly: mockRevenue.monthly,
          forecast: 480000
        }
      };
      
      return res.status(200).json(dashboardData);
    } catch (error) {
      console.error("Dashboard data error:", error);
      return res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // User management endpoints
  app.get("/api/admin/users", authMiddleware, async (req: Request, res: Response) => {
    try {
      // In production, fetch from database
      return res.status(200).json({ users: mockUsers });
    } catch (error) {
      console.error("User fetch error:", error);
      return res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get("/api/admin/users/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const user = mockUsers.find(u => u.id === userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      return res.status(200).json({ user });
    } catch (error) {
      console.error("User detail error:", error);
      return res.status(500).json({ message: "Failed to fetch user details" });
    }
  });

  // System health endpoints
  app.get("/api/admin/health", authMiddleware, async (req: Request, res: Response) => {
    try {
      return res.status(200).json({ 
        services: mockServiceStatus,
        metrics: mockSystemMetrics
      });
    } catch (error) {
      console.error("Health status error:", error);
      return res.status(500).json({ message: "Failed to fetch system health" });
    }
  });

  // Support tickets endpoints
  app.get("/api/admin/tickets", authMiddleware, async (req: Request, res: Response) => {
    try {
      return res.status(200).json({ tickets: mockTickets });
    } catch (error) {
      console.error("Tickets fetch error:", error);
      return res.status(500).json({ message: "Failed to fetch support tickets" });
    }
  });

  // Financial endpoints
  app.get("/api/admin/finance", authMiddleware, async (req: Request, res: Response) => {
    try {
      return res.status(200).json(mockRevenue);
    } catch (error) {
      console.error("Finance data error:", error);
      return res.status(500).json({ message: "Failed to fetch financial data" });
    }
  });

  // Module summary endpoints (for quick access buttons)
  app.get("/api/admin/modules/summary", authMiddleware, async (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        modules: [
          { id: "bidder", name: "Bidder", activeUsers: 850, pendingIssues: 12 },
          { id: "bee", name: "BEE", activeUsers: 320, pendingIssues: 5 },
          { id: "courier", name: "Courier", activeUsers: 115, pendingIssues: 3 },
          { id: "tenderer", name: "Tenderer", activeUsers: 275, pendingIssues: 8 },
          { id: "supplier", name: "Supplier", activeUsers: 430, pendingIssues: 7 },
          { id: "drone", name: "Drone Contractor", activeUsers: 65, pendingIssues: 2 }
        ]
      });
    } catch (error) {
      console.error("Module summary error:", error);
      return res.status(500).json({ message: "Failed to fetch module summary" });
    }
  });

  return httpServer;
}
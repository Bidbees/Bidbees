import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard data endpoint
  app.get("/api/dashboard", async (req: Request, res: Response) => {
    try {
      const user = await storage.getCurrentUser();
      const userData = user || {
        name: "Sxulsh",
        profileComplete: 75,
        winStreak: 3
      };

      const dashboardData = {
        user: userData,
        tender: {
          title: "Construction in Eastern Cape",
          status: "70 Mid",
          issuer: "30",
          winChance: 80,
          lagngiacts: "arore",
          competitor: "Competitor #75.9 won 5 similar tenders"
        },
        quote: {
          id: "4156",
          amount: "R10,000",
          delayIncrease: "1%",
          submissionId: "709",
          submissionRisk: "high risk!",
          supplierRisk: "Risk"
        },
        mapboxToken: process.env.MAPBOX_ACCESS_TOKEN,
        mapMarkers: [
          { lng: 22.9375, lat: -28.7282, type: 'green', popupText: 'Western Cape Opportunity' },
          { lng: 24.9923, lat: -29.1007, type: 'yellow', popupText: 'Eastern Cape Project' },
          { lng: 28.2293, lat: -25.7479, type: 'red', popupText: 'Gauteng Tender - Critical' },
          { lng: 29.4627, lat: -23.8978, type: 'green', popupText: 'Limpopo, view this RFQ' },
          { lng: 18.4241, lat: -33.9249, type: 'yellow', popupText: 'Cape Town Infrastructure' },
          { lng: 31.0218, lat: -29.8587, type: 'orange', popupText: 'Durban Commercial Building' },
        ]
      };

      return res.status(200).json(dashboardData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // AI Chat endpoint
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        message: z.string().min(1)
      });

      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid message format" });
      }

      const { message } = result.data;
      
      // Save the user's message
      if (req.session.userId) {
        await storage.saveChatMessage({
          userId: req.session.userId,
          content: message,
          sender: "user"
        });
      }

      // Process the message and generate a response
      // This is a simple implementation - in production, this would connect to an AI service
      let reply = "I'm analyzing your request about ";
      
      if (message.toLowerCase().includes("tender")) {
        reply += "tenders. There are several new tenders available in your area. Would you like more specific information about any particular sector?";
      } else if (message.toLowerCase().includes("bee") || message.toLowerCase().includes("task")) {
        reply += "BEE tasks. You currently have 2 active tasks and 3 upcoming ones. Would you like me to help prioritize them?";
      } else if (message.toLowerCase().includes("quote") || message.toLowerCase().includes("pricing")) {
        reply += "pricing and quotes. Based on historical data, similar projects in this region have been quoted between R8,000 and R12,000. Would you like assistance with preparing a competitive quote?";
      } else {
        reply += `"${message}". I'm here to help with any bidding or tender-related questions you have.`;
      }

      // Save the AI's response
      if (req.session.userId) {
        await storage.saveChatMessage({
          userId: req.session.userId,
          content: reply,
          sender: "ai"
        });
      }

      return res.status(200).json({ reply });
    } catch (error) {
      console.error("Error processing chat message:", error);
      return res.status(500).json({ message: "Failed to process your message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

import { createServer, type ViteDevServer } from "vite";
import type { Express } from "express";
import type { Server } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Logs a message with a timestamp.
 */
export function log(message: string) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

/**
 * Serves static files from the build directory in production.
 */
export function serveStatic(app: Express) {
  app.use(express.static(path.resolve(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
  });
}

/**
 * Sets up Vite development server with HMR.
 */
export async function setupVite(app: Express, httpServer: Server) {
  const vite: ViteDevServer = await createServer({
    server: {
      middlewareMode: true,
    },
    root: path.resolve(__dirname, "../client"),
    appType: "spa",
  });

  // Use Vite's connect instance as middleware
  app.use(vite.middlewares);

  // Serve index.html for all other requests
  app.use("*", async (req, res) => {
    try {
      const indexPath = path.resolve(__dirname, "../client/index.html");
      let html = await vite.transformIndexHtml(req.originalUrl, "");
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      console.error(e);
      vite.ssrFixStacktrace(e as Error);
      res.status(500).end("Internal Server Error");
    }
  });

  return vite;
}
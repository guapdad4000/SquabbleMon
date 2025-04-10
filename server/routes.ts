import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import express from "express";
import { log } from "./vite";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static game files from the root directory
  const rootDir = path.resolve(process.cwd());
  log(`Serving static files from ${rootDir}`);

  // Serve all static files in the root directory
  app.use(express.static(rootDir));

  // Also serve assets from public directory
  app.use(express.static(path.join(rootDir, "public")));

  // For API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Default route to serve the game
  app.get("*", (req, res) => {
    res.sendFile(path.join(rootDir, "index.html"));
  });

  const httpServer = createServer(app);

  return httpServer;
}

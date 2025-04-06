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
  
  // Serve individual static files
  app.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'index.html'));
  });
  
  app.get('/style.css', (req, res) => {
    res.sendFile(path.join(rootDir, 'style.css'));
  });
  
  app.get('/script.js', (req, res) => {
    res.sendFile(path.join(rootDir, 'script.js'));
  });

  // For API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  const httpServer = createServer(app);

  return httpServer;
}

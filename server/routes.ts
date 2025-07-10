import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { getGoogleSheetsService } from "./services/googleSheets";
import { getEmailService } from "./services/emailService";

export async function registerRoutes(app: Express): Promise<Server> {
  // Google Sheets service will be initialized lazily when needed

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Send to Google Sheets (focus on this integration)
      try {
        const googleSheetsService = getGoogleSheetsService();
        await googleSheetsService.appendContactToSheet(contact);
        console.log('Successfully added contact to Google Sheets');
      } catch (sheetsError) {
        console.error('Failed to add contact to Google Sheets:', sheetsError);
      }
      
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  // Contact form submission endpoint for new contact page
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Send to Google Sheets (focus on this integration)
      try {
        const googleSheetsService = getGoogleSheetsService();
        await googleSheetsService.appendContactToSheet(contact);
        console.log('Successfully added contact to Google Sheets');
      } catch (sheetsError) {
        console.error('Failed to add contact to Google Sheets:', sheetsError);
      }
      
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  // Get all contacts (for potential admin dashboard)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contacts" 
      });
    }
  });

  // Test endpoint to check integrations
  app.get("/api/test-integrations", async (req, res) => {
    const results = {
      googleSheets: { status: 'unknown', error: null },
      email: { status: 'unknown', error: null }
    };

    // Test Google Sheets
    try {
      const googleSheetsService = getGoogleSheetsService();
      await googleSheetsService.initializeSheet();
      results.googleSheets.status = 'success';
    } catch (error) {
      results.googleSheets.status = 'error';
      results.googleSheets.error = error.message;
    }

    // Test Email Service
    try {
      const emailService = getEmailService();
      results.email.status = 'success';
    } catch (error) {
      results.email.status = 'error';
      results.email.error = error.message;
    }

    res.json(results);
  });

  const httpServer = createServer(app);
  return httpServer;
}

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { getGoogleSheetsService } from "./services/googleSheets";
import { getEmailService } from "./services/emailService";
import { getHubSpotService } from "./services/hubspotService";

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
      
      // Send to HubSpot
      try {
        const hubspotService = getHubSpotService();
        await hubspotService.submitToHubspot(contact);
        console.log('Successfully submitted contact to HubSpot');
      } catch (hubspotError) {
        console.error('Failed to submit contact to HubSpot:', hubspotError);
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
      
      // Send to HubSpot
      try {
        const hubspotService = getHubSpotService();
        await hubspotService.submitToHubspot(contact);
        console.log('Successfully submitted contact to HubSpot');
      } catch (hubspotError) {
        console.error('Failed to submit contact to HubSpot:', hubspotError);
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
      googleSheets: { status: 'unknown' as 'unknown' | 'success' | 'error', error: null as string | null },
      email: { status: 'unknown' as 'unknown' | 'success' | 'error', error: null as string | null },
      hubspot: { status: 'unknown' as 'unknown' | 'success' | 'error', error: null as string | null }
    };

    // Test Google Sheets
    try {
      const googleSheetsService = getGoogleSheetsService();
      await googleSheetsService.initializeSheet();
      results.googleSheets.status = 'success';
    } catch (error) {
      results.googleSheets.status = 'error';
      results.googleSheets.error = error instanceof Error ? error.message : String(error);
    }

    // Test Email Service
    try {
      const emailService = getEmailService();
      results.email.status = 'success';
    } catch (error) {
      results.email.status = 'error';
      results.email.error = error instanceof Error ? error.message : String(error);
    }

    // Test HubSpot Service
    try {
      const hubspotService = getHubSpotService();
      results.hubspot.status = 'success';
    } catch (error) {
      results.hubspot.status = 'error';
      results.hubspot.error = error instanceof Error ? error.message : String(error);
    }

    res.json(results);
  });

  const httpServer = createServer(app);
  return httpServer;
}

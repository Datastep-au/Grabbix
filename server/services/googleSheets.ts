import { google } from 'googleapis';
import { Contact } from '@shared/schema';

interface GoogleSheetsConfig {
  privateKey: string;
  clientEmail: string;
  sheetId: string;
}

export class GoogleSheetsService {
  private sheets: any;
  private sheetId: string;

  constructor(config: GoogleSheetsConfig) {
    // Handle private key formatting - it might be base64 encoded or have escaped newlines
    let privateKey = config.privateKey;
    
    // Remove any quotes around the key
    privateKey = privateKey.replace(/^["']|["']$/g, '');
    
    // Handle different newline encodings
    if (privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }
    
    // Ensure the key has proper PEM formatting
    if (!privateKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
      throw new Error('Invalid private key format. Key must start with "-----BEGIN PRIVATE KEY-----". Check that the GOOGLE_SHEETS_PRIVATE_KEY environment variable is set correctly.');
    }
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        private_key: privateKey,
        client_email: config.clientEmail,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
    this.sheetId = config.sheetId;
  }

  async appendContactToSheet(contact: Contact): Promise<void> {
    try {
      const timestamp = new Date().toISOString();
      const values = [
        timestamp,
        contact.name,
        contact.email,
        contact.phone || '',
        contact.company || '',
        contact.customerSize || '',
        contact.message || '',
        contact.location || '',
        contact.spaceType || ''
      ];

      // Skip initialization for now and try direct append
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.sheetId,
        range: 'A:I',  // Simple column range
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [values]
        }
      });

      console.log('Contact added to Google Sheets successfully');
    } catch (error) {
      console.error('Error adding contact to Google Sheets:', error);
      throw error;
    }
  }

  async initializeSheet(): Promise<void> {
    try {
      // Check if sheet exists and has headers
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.sheetId,
        range: 'A1:I1'
      });

      if (!response.data.values || response.data.values.length === 0) {
        // Add headers if they don't exist
        const headers = [
          'Timestamp',
          'Name',
          'Email',
          'Phone',
          'Company',
          'Customer Size',
          'Message',
          'Location',
          'Space Type'
        ];

        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.sheetId,
          range: 'A1:I1',
          valueInputOption: 'RAW',
          requestBody: {
            values: [headers]
          }
        });

        console.log('Sheet headers initialized');
      }
    } catch (error) {
      console.error('Error initializing sheet:', error);
      throw error;
    }
  }
}

// Export singleton instance
let googleSheetsService: GoogleSheetsService | null = null;

export function getGoogleSheetsService(): GoogleSheetsService {
  if (googleSheetsService) {
    return googleSheetsService;
  }

  let privateKey = '';
  let clientEmail = '';
  
  // Check if we have a JSON string in GOOGLE_SHEETS_PRIVATE_KEY
  const privateKeyEnv = process.env.GOOGLE_SHEETS_PRIVATE_KEY || '';
  
  if (privateKeyEnv.startsWith('{')) {
    // Parse JSON service account file
    try {
      const serviceAccount = JSON.parse(privateKeyEnv);
      privateKey = serviceAccount.private_key;
      clientEmail = serviceAccount.client_email;
    } catch (error) {
      throw new Error('Failed to parse Google Sheets service account JSON');
    }
  } else {
    // Use individual environment variables
    privateKey = privateKeyEnv;
    clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL || '';
  }
  
  const config = {
    privateKey,
    clientEmail,
    sheetId: process.env.GOOGLE_SHEETS_SHEET_ID || ''
  };

  if (!config.privateKey || !config.clientEmail || !config.sheetId) {
    throw new Error('Google Sheets configuration is incomplete');
  }

  googleSheetsService = new GoogleSheetsService(config);
  return googleSheetsService;
}
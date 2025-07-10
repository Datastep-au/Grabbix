import sgMail from '@sendgrid/mail';
import { Contact } from '@shared/schema';

interface EmailConfig {
  apiKey: string;
  fromEmail: string;
  toEmail: string;
}

export class EmailService {
  private fromEmail: string;
  private toEmail: string;

  constructor(config: EmailConfig) {
    // Validate API key format
    if (!config.apiKey.startsWith('SG.')) {
      throw new Error('SendGrid API key must start with "SG."');
    }
    
    sgMail.setApiKey(config.apiKey);
    this.fromEmail = config.fromEmail;
    this.toEmail = config.toEmail;
  }

  async sendContactNotification(contact: Contact): Promise<void> {
    try {
      const htmlContent = `
        <h2>New Contact Form Submission - Grabbix</h2>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${contact.company || 'Not provided'}</p>
        <p><strong>Customer Size:</strong> ${contact.customerSize || 'Not provided'}</p>
        <p><strong>Location:</strong> ${contact.location || 'Not provided'}</p>
        <p><strong>Space Type:</strong> ${contact.spaceType || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${contact.message || 'No message provided'}</p>
        <hr>
        <p><small>This notification was sent from your Grabbix website contact form.</small></p>
      `;

      const textContent = `
        New Contact Form Submission - Grabbix

        Timestamp: ${new Date().toLocaleString()}
        Name: ${contact.name}
        Email: ${contact.email}
        Phone: ${contact.phone || 'Not provided'}
        Company: ${contact.company || 'Not provided'}
        Customer Size: ${contact.customerSize || 'Not provided'}
        Location: ${contact.location || 'Not provided'}
        Space Type: ${contact.spaceType || 'Not provided'}
        
        Message:
        ${contact.message || 'No message provided'}

        ---
        This notification was sent from your Grabbix website contact form.
      `;

      const msg = {
        to: this.toEmail,
        from: this.fromEmail,
        subject: `New Contact Form Submission - ${contact.name}`,
        text: textContent,
        html: htmlContent,
      };

      await sgMail.send(msg);
      console.log('Contact notification email sent successfully');
    } catch (error) {
      console.error('Error sending contact notification email:', error);
      throw error;
    }
  }
}

// Export singleton instance
let emailService: EmailService | null = null;

export function getEmailService(): EmailService {
  if (!emailService) {
    const config = {
      apiKey: process.env.SENDGRID_API_KEY || '',
      fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@grabbix.com',
      toEmail: process.env.NOTIFICATION_EMAIL || ''
    };

    if (!config.apiKey) {
      throw new Error('SendGrid API key is not configured');
    }

    if (!config.toEmail) {
      throw new Error('Notification email is not configured');
    }

    emailService = new EmailService(config);
  }

  return emailService;
}
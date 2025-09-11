import { Contact } from "@shared/schema";

export interface HubSpotConfig {
  portalId: string;
  formId: string;
  accessToken?: string;
}

export interface HubSpotFormField {
  name: string;
  value: string;
}

export interface HubSpotFormPayload {
  fields: HubSpotFormField[];
}

export class HubSpotService {
  private portalId: string;
  private formId: string;
  private accessToken?: string;

  constructor(config: HubSpotConfig) {
    this.portalId = config.portalId;
    this.formId = config.formId;
    this.accessToken = config.accessToken;
  }

  async submitToHubspot(formData: Contact | Partial<Contact>): Promise<{ statusCode: number; result: string }> {
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${this.portalId}/${this.formId}`;
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };

    // Add optional authentication header if token exists
    if (this.accessToken) {
      headers["Authorization"] = `Bearer ${this.accessToken}`;
    }

    // Map form fields to HubSpot internal field names
    const payload: HubSpotFormPayload = {
      fields: [
        { name: "firstname", value: formData.name || "" },
        { name: "email", value: formData.email || "" },
        { name: "phone", value: formData.phone || "" },
        { name: "company", value: formData.company || "" },
        { name: "address", value: formData.location || "" },
        { name: "type_of_space", value: formData.spaceType || "" },
        { name: "potential_customers", value: formData.customerSize || "" },
        { name: "message", value: formData.message || "" }
      ]
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });

      const result = await response.text();
      
      if (response.status === 200 || response.status === 204) {
        console.log('Successfully submitted to HubSpot');
        return { statusCode: response.status, result };
      } else {
        console.error('HubSpot API error:', response.status, result);
        throw new Error(`HubSpot API error: ${response.status} - ${result}`);
      }
    } catch (error) {
      console.error('Error submitting to HubSpot:', error);
      throw error;
    }
  }
}

// Factory function to create HubSpot service instance
export function getHubSpotService(): HubSpotService {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = process.env.HUBSPOT_FORM_ID_CONTACT;
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!portalId) {
    throw new Error('HUBSPOT_PORTAL_ID environment variable is required');
  }

  if (!formId) {
    throw new Error('HUBSPOT_FORM_ID_CONTACT environment variable is required');
  }

  return new HubSpotService({
    portalId,
    formId,
    accessToken
  });
}
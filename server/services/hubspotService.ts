import { Contact } from "@shared/schema";

const DEFAULT_PORTAL_ID = "443160596";
const DEFAULT_FORM_ID = "d7fbda95-f1e7-4dc3-96ee-8559ed55d0f3";
const TYPE_OF_SPACE_FIELD =
  "span_style__background_color___ffffff__font_weight__500__color___374151___type_of_space__span_";

export interface HubSpotConfig {
  portalId: string;
  formId: string;
  accessToken?: string;
  region?: string;
}

export interface HubSpotFormField {
  name: string;
  value: string;
}

export interface HubSpotFormPayload {
  fields: HubSpotFormField[];
}

function splitName(fullName: string): { firstname: string; lastname: string } {
  const trimmed = (fullName || "").trim();
  if (!trimmed) return { firstname: "", lastname: "" };
  const idx = trimmed.indexOf(" ");
  if (idx === -1) return { firstname: trimmed, lastname: "" };
  return {
    firstname: trimmed.slice(0, idx),
    lastname: trimmed.slice(idx + 1).trim(),
  };
}

export class HubSpotService {
  private portalId: string;
  private formId: string;
  private accessToken?: string;
  private region: string;

  constructor(config: HubSpotConfig) {
    this.portalId = config.portalId;
    this.formId = config.formId;
    this.accessToken = config.accessToken;
    this.region = config.region || "na1";
  }

  private get submissionUrl(): string {
    // HubSpot region-specific Forms Submission endpoints
    const host =
      this.region === "eu1"
        ? "api-eu1.hsforms.com"
        : "api.hsforms.com";
    return `https://${host}/submissions/v3/integration/submit/${this.portalId}/${this.formId}`;
  }

  async submitToHubspot(formData: Contact | Partial<Contact>): Promise<{ statusCode: number; result: string }> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.accessToken) {
      headers["Authorization"] = `Bearer ${this.accessToken}`;
    }

    const { firstname, lastname } = splitName(formData.name || "");

    const payload: HubSpotFormPayload = {
      fields: [
        { name: "firstname", value: firstname },
        { name: "lastname", value: lastname },
        { name: "email", value: formData.email || "" },
        { name: "phone", value: formData.phone || "" },
        { name: "company", value: formData.company || "" },
        { name: "address", value: formData.location || "" },
        { name: TYPE_OF_SPACE_FIELD, value: formData.spaceType || "" },
        { name: "potential_customers", value: formData.customerSize || "" },
        { name: "additional_details", value: formData.message || "" },
      ],
    };

    const response = await fetch(this.submissionUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const result = await response.text();

    if (response.status === 200 || response.status === 204) {
      return { statusCode: response.status, result };
    }

    throw new Error(`HubSpot API error: ${response.status} - ${result}`);
  }
}

export function getHubSpotService(): HubSpotService {
  const portalId = process.env.HUBSPOT_PORTAL_ID || DEFAULT_PORTAL_ID;
  const formId = process.env.HUBSPOT_FORM_ID_CONTACT || DEFAULT_FORM_ID;
  const accessToken =
    process.env.HUBSPOT_API_KEY || process.env.HUBSPOT_ACCESS_TOKEN;
  const region = process.env.HUBSPOT_REGION;

  return new HubSpotService({
    portalId,
    formId,
    accessToken,
    region,
  });
}
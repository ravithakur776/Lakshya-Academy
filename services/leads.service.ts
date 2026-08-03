import type { Lead, LeadSource, ContactFormData } from "@/types/lead.types";
import type { ApiResponse, PaginatedResponse, PaginationParams } from "@/types/api.types";

/**
 * Leads Service
 *
 * Handles all lead/inquiry operations via API routes.
 */
export const leadsService = {
  /**
   * Creates a new lead from a contact/inquiry form
   */
  async createLead(data: {
    name: string;
    phone: string;
    email?: string;
    grade?: string;
    targetExam?: string;
    source?: LeadSource;
    interestedIn?: string[];
  }): Promise<ApiResponse<Lead>> {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  /**
   * Submits a contact form (creates lead + sends email)
   */
  async submitContactForm(data: ContactFormData): Promise<ApiResponse> {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  /**
   * Fetches leads list (admin only)
   */
  async getLeads(params?: PaginationParams): Promise<PaginatedResponse<Lead>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.pageSize) searchParams.set("pageSize", params.pageSize.toString());
    if (params?.search) searchParams.set("search", params.search);

    const response = await fetch(`/api/leads?${searchParams.toString()}`);
    return response.json();
  },
};

export type ContactStatus = "new" | "read" | "replied" | "archived";

export interface ContactInquiry {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: ContactStatus;
}

export interface CreateContactInput {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

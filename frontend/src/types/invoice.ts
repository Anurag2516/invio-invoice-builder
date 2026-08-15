import type z from "zod";
import type { invoiceSchema } from "../schema/invoice.schema";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { AuthUser } from "./auth";

export type InvoiceFormValues = z.input<typeof invoiceSchema>;

export type Status = "Draft" | "Paid" | "Sent" | "Cancelled";
export type Currency = "INR" | "USD" | "EUR";

export interface InvoiceFormData {
  invoiceNumber: string;
  status: Status;
  currency: Currency;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountRate: number;
  discountAmount: number;
  total: number;
  senderName: string;
  senderEmail: string;
  senderCompany: string;
  senderAddress: string;
  senderPhone: string;
  senderWebsite: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  notes: string;
  clientId: string;
  snapshotClientName: string;
  snapshotClientEmail: string;
  snapshotClientCompany: string;
  snapshotClientAddress: string;
  snapshotClientPhone: string;
  snapshotClientWebsite: string;
  lineItems: LineItemFormData[];
}

export interface InvoiceApiPayload {
  invoiceNumber: string;
  status: Status;
  issueDate: string;
  dueDate: string;
  currency: Currency;
  subtotal: number;
  taxRate: number;
  discountRate: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  notes?: string;
  senderName: string;
  senderEmail?: string;
  senderCompany?: string;
  senderAddress?: string;
  senderPhone?: string;
  senderWebsite?: string;
  clientId: string;
  snapshotClientName: string;
  snapshotClientEmail?: string;
  snapshotClientCompany?: string;
  snapshotClientAddress?: string;
  snapshotClientPhone?: string;
  snapshotClientWebsite?: string;
  lineItems: Omit<LineItemFormData, "id">[];
}

export interface AutoSaveApiPayload extends Partial<
  Omit<InvoiceApiPayload, "lineItems">
> {
  lineItems: Partial<Omit<LineItemFormData, "id">>[];
}

export interface InvoiceResponse {
  id: string;
  invoiceNumber: string;
  status: Status;
  currency: Currency;
  issueDate: string;
  dueDate: string;
  createdAt: string;
  subtotal: string;
  taxRate: string;
  taxAmount: string;
  discountRate: string;
  discountAmount: string;
  total: string;
  notes?: string;
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  senderName: string;
  senderEmail?: string;
  senderCompany?: string;
  senderAddress?: string;
  senderPhone?: string;
  senderWebsite?: string;
  clientId: string;
  snapshotClientName?: string;
  snapshotClientEmail?: string;
  snapshotClientCompany?: string;
  snapshotClientAddress?: string;
  snapshotClientPhone?: string;
  snapshotClientWebsite?: string;
  lineItems: LineItemResponse[];
}

export interface DraftInvoiceResponse {
  id: string;
  invoiceNumber: string;
  status: Status;
  senderName: string;
  senderEmail?: string;
  senderCompany?: string;
  senderAddress?: string;
  senderPhone?: string;
  senderWebsite?: string;
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
}

export interface LineItemFormData {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export type LineItemResponse = LineItemFormData;

export interface UserProfile extends AuthUser {
  companyName: string;
  address: string;
  phone: string;
  website: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
}

export interface UserResponse {
  name: string;
  email: string;
  companyName?: string;
  address?: string;
  phone?: string;
  website?: string;
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  createdAt: string;
}

export interface ClientFormData {
  name: string;
  email: string;
  companyName: string;
  address: string;
  phone: string;
  website: string;
}

export interface ClientResponse {
  id: string;
  name: string;
  email?: string;
  companyName?: string;
  address?: string;
  phone?: string;
  website?: string;
}

export interface InvoiceFormProps {
  register: UseFormRegister<InvoiceFormValues>;
  control: Control<InvoiceFormValues>;
  errors: FieldErrors<InvoiceFormValues>;
}

export interface InvoiceStore {
  activeInvoice: InvoiceFormData | null;
  updateActiveInvoice: (invoice: InvoiceFormData) => void;
}

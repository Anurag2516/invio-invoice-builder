import api from "@/lib/axios";
import type {
  DraftInvoiceResponse,
  InvoiceFormData,
  InvoiceResponse,
  LineItemResponse,
} from "@/types/invoice";
import { formDataToApiPayload, formDataToAutoSavePayload } from "@/mapper/invoice.mapper";

export const createDraftInvoice = async (): Promise<DraftInvoiceResponse> => {
  const res = await api.post("/api/invoice/createInvoice/draft");
  return res.data;
};

export const autoSaveInvoice = async (
  id: string,
  invoice: InvoiceFormData,
) => {
  const invoicePayload = formDataToAutoSavePayload(invoice);
  const res = await api.patch(`/api/invoice/autoSaveInvoice/${id}`, invoicePayload);
  return res.data;
};

export const updateInvoice = async (
  id: string,
  invoice: InvoiceFormData,
): Promise<InvoiceResponse> => {
  const invoicePayload = formDataToApiPayload(invoice);
  const res = await api.put(`/api/invoice/updateInvoice/${id}`, invoicePayload);
  return res.data;
};

export const getInvoice = async (id: string): Promise<InvoiceResponse> => {
  const res = await api.get(`/api/invoice/getInvoice/${id}`);
   return {
     ...res.data,
     subtotal: Number(res.data.subtotal),
     taxRate: Number(res.data.taxRate),
     taxAmount: Number(res.data.taxAmount),
     discountRate: Number(res.data.discountRate),
     discountAmount: Number(res.data.discountAmount),
     total: Number(res.data.total),
     lineItems: res.data.lineItems.map((item: LineItemResponse) => ({
       quantity: Number(item.quantity),
       rate: Number(item.rate),
       amount: Number(item.amount),
     })),
   };
};

export const getInvoices = async (): Promise<InvoiceResponse[]> => {
  const res = await api.get("/api/invoice/getInvoices");
  return res.data;
};

export const deleteInvoice = async (id: string) => {
  const res = await api.delete(`/api/invoice/deleteInvoice/${id}`);
  return res.data;
};

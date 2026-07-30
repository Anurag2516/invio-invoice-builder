import api from "@/lib/axios";
import type { Invoice } from "@/types/invoice";

export const createInvoice = async (invoice: Invoice): Promise<Invoice> => {
  const res = await api.post("api/invoice/createInvoice", invoice);

  return res.data;
};

export const updateInvoice = async (id: string, invoice: Partial<Invoice>) => {
  const res = await api.put(`api/invoice/updateInvoice/${id}`, invoice);

  return res.data;
};

export const getInvoice = async (id: string): Promise<Invoice> => {
  const res = await api.get(`api/invoice/getInvoice/${id}`);

  return res.data;
};

export const getInvoices = async (): Promise<Invoice[]> => {
  const res = await api.get("api/invoice/getInvoices");

  return res.data;
};

export const deleteInvoice = async (id: string) => {
  const res = await api.delete(`api/invoice/deleteInvoice/${id}`);

  return res.data;
};

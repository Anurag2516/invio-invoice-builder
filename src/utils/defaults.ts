import type { Invoice, InvoiceTotal, LineItem, User } from "../types/invoice";
import { generateId, generateInvoiceNumber } from "./generateId";

export const createUser = (): User => ({
  companyName: "",
  address: "",
  email: "",
  phone: "",
  website: "",
});

export const createLineItem = (serialNumber: number): LineItem => ({
  id: generateId(),
  serialNumber,
  description: "",
  quantity: 1,
  rate: 0,
  amount: 0,
});


export const createInvoiceTotal = (): InvoiceTotal => ({
  subtotal: 0,
  appliedTax: 0,
  appliedDiscount: 0,
  total: 0,
});

export const createInvoice = (existingNumbers: string[]): Invoice => ({
  id: generateId(),
  invoiceNumber: generateInvoiceNumber(existingNumbers),
  sender: createUser(),
  client: createUser(),
  issueDate: new Date().toLocaleDateString(),
  dueDate: "",
  items: [createLineItem(1)],
  currency: "INR",
  invoiceTotal: createInvoiceTotal(),
  notes: "",
});
import type { Invoice, InvoiceTotal, LineItem, User } from "../types/invoice";
import { generateId, generateInvoiceNumber } from "./generateId";

const User = (): User => ({
  companyName: "",
  address: "",
  email: "",
  phone: "",
  website: "",
});

const LineItem = (serialNumber: number): LineItem => ({
  id: generateId(),
  serialNumber,
  description: "",
  quantity: 1,
  rate: 0,
  amount: 0,
});


const InvoiceTotal = (): InvoiceTotal =>( {
  subtotal: 0,
  appliedTax: 0,
  appliedDiscount: 0,
  total: 0
})

const Invoice = (existingNumbers: string[]): Invoice => ({
  id: generateId(),
  invoiceNumber: generateInvoiceNumber(existingNumbers),
  sender: User(),
  client: User(),
  issueDate: new Date().toLocaleDateString(),
  dueDate: "",
  items: [LineItem(1)],
  currency: "INR",
  invoiceTotal: InvoiceTotal(),
  notes: ""
})
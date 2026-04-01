export interface Invoice {
  id: string;
  invoiceNumber: string;
  sender: User;
  client: User;
  issueDate: string;
  dueDate: string;
  items: LineItems[];
  currency: string;
  invoiceTotal: InvoiceTotal;
  notes: string;
}

export interface User {
  companyName: string;
  address: string;
  email: string;
  phone: string;
  website: string;
}

export interface LineItems {
  serialNumber: number;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceTotal {
  subtotal: number;
  appliedTax: number;
  appliedDiscount: number;
  total: number;
}

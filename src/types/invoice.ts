export interface Invoice {
  id: string;
  invoiceNumber: string;
  sender: User;
  client: User;
  issueDate: string;
  dueDate: string;
  items: lineItems[];
  currency: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  notes: string;
}

export interface User {
  companyName: string;
  address: string;
  email: string;
  phone: string;
  website: string;
}

export interface lineItems {
  serialNumber: number;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

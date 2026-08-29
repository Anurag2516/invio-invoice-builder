export const invoiceKey = {
  all: ["invoices"] as const,
  single: (id: string) => ["invoices", id] as const,
  nextInvoiceNumber: ["nextInvoiceNumber"],
};

export const userKey = {
  userProfile: ["user-profile"] as const
};

export const clientKey = {
  all: ["clients"] as const,
  single: (id: string) => ["clients", id] as const
}

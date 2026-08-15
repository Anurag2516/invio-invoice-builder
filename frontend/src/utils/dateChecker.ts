import type { InvoiceResponse } from "@/types/invoice";

export const dateChecker = (invoice: InvoiceResponse) => {
  if (invoice.status === "Sent") {
    return new Date() > new Date(invoice.dueDate);
  }
};

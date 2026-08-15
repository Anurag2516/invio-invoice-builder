import { create } from "zustand";
import { type InvoiceStore } from "../types/invoice";

export const useInvoiceStore = create<InvoiceStore>()((set) => ({
  activeInvoice: null,

  updateActiveInvoice: (invoice) => {
    set({ activeInvoice: invoice });
  },
}));

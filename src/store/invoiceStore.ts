import { create } from "zustand";
import type { Invoice, InvoiceStore } from "../types/invoice";
import { createEmptyInvoice, defaultLineItem } from "../utils/defaults";
import { calculatedInvoiceTotal } from "../utils/calculations";
import { persist } from "zustand/middleware";

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set, get) => ({
      invoices: [],
      activeInvoice: createEmptyInvoice(),

      newInvoice: () => {
        const { invoices } = get();
        const existingNumbers = invoices.map((number) => number.invoiceNumber);
        set({
          activeInvoice: createEmptyInvoice(existingNumbers),
        });
      },

      saveInvoice: () => {
        const { invoices, activeInvoice } = get();

        const updated: Invoice = {
          ...activeInvoice,
          updatedAt: new Date().toISOString(),
        };

        const alreadyExists: boolean = invoices.some(
          (invoice) => invoice.id === updated.id,
        );

        set({
          invoices: alreadyExists
            ? invoices.map((invoice) =>
                invoice.id === updated.id ? updated : invoice,
              )
            : [...invoices, updated],
          activeInvoice: updated,
        });
      },

      loadInvoice: (id) => {
        const { invoices } = get();

        const invoice = invoices.find((i) => i.id === id);

        if (invoice) set({ activeInvoice: invoice });
      },

      deleteInvoice: (id) => {
        const { invoices, activeInvoice, newInvoice } = get();

        set({ invoices: invoices.filter((invoice) => invoice.id !== id) });

        if (activeInvoice.id === id) newInvoice();
      },

      updateInvoice: (invoice) => {
        set({ activeInvoice: invoice });
      },

      addLineItem: () => {
        const { activeInvoice } = get();

        const nextLine = activeInvoice.items.length + 1;

        const newItem = defaultLineItem(nextLine);

        set({
          activeInvoice: {
            ...activeInvoice,
            items: [...activeInvoice.items, newItem],
          },
        });
      },

      removeLineItem: (id) => {
        const { activeInvoice } = get();

        const newItems = activeInvoice.items.filter((item) => item.id !== id);

        const reindexedItems = newItems.map((item, index) => ({
          ...item,
          serialNumber: index + 1,
        }));

        const totals = calculatedInvoiceTotal(
          reindexedItems,
          activeInvoice.invoiceTotal.appliedTax,
          activeInvoice.invoiceTotal.appliedDiscount,
        );

        set({
          activeInvoice: {
            ...activeInvoice,
            items: reindexedItems,
            invoiceTotal: totals,
          },
        });
      },
    }),
    { name: "invoice-store" },
  ),
);

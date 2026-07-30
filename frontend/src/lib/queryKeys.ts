export const invoiceKey = {
    all: ["invoices"] as const,
    single: (id: string) => ["invoices", id] as const
} 
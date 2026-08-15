import { z } from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  companyName: z.string(),
  address: z.string(),
  email: z.email(),
  phone: z.string(),
  website: z.string(),
  bankName: z.string(),
  accountHolderName: z.string(),
  accountNumber: z
    .string()
    .min(8, "Account number must be at least 8 digits")
    .max(17, "Account number cannot exceed 17 digits")
    .regex(/^\d+$/, "Account number must contain only digits")
    .or(z.literal("")),
});

export const lineItemSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Description is required"),
  quantity: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({
      error: "Quantity is required",
    }),
  ),
  rate: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({
      error: "Rate is required",
    }),
  ),
  amount: z.number(),
});

export const invoiceSchema = z.object({
  invoiceNumber: z.string(),
  status: z.enum(["Draft", "Paid", "Sent", "Cancelled"]),
  senderName: z.string().min(1, "Name is required"),
  senderCompany: z.string(),
  senderAddress: z.string(),
  senderEmail: z.email({ message: "Invalid email" }),
  senderPhone: z.string(),
  senderWebsite: z.string(),
  snapshotClientName: z.string().min(1, "Name is required"),
  snapshotClientCompany: z.string(),
  snapshotClientAddress: z.string(),
  snapshotClientEmail: z.email(),
  snapshotClientPhone: z.string(),
  snapshotClientWebsite: z.string(),
  issueDate: z.string(),
  dueDate: z.string(),
  lineItems: z.array(lineItemSchema).min(1, "Add at least one line item"),
  currency: z.enum(["INR", "USD", "EUR"]),
  subtotal: z.number(),
  taxRate: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({
      error: "Tax rate is required",
    }),
  ),
  discountRate: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({
      error: "Discount rate is required",
    }),
  ),
  taxAmount: z.number(),
  discountAmount: z.number(),
  total: z.number(),
  bankName: z.string(),
  accountHolderName: z.string(),
  accountNumber: z
    .string()
    .min(8, "Account number must be at least 8 digits")
    .max(17, "Account number cannot exceed 17 digits")
    .regex(/^\d+$/, "Account number must contain only digits")
    .or(z.literal("")),
  notes: z.string(),
});

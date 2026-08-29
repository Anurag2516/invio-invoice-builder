import z from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email({ message: "Invalid email address" }).toLowerCase(),
  companyName: z.string(),
  address: z.string(),
  phone: z.string(),
  website: z.string(),
  bankName: z.string(),
  accountHolderName: z.string(),
  accountNumber: z.union([
    z
      .string()
      .min(8, "Account number must be at least 8 digits")
      .max(17, "Account number cannot exceed 17 digits")
      .regex(/^\d+$/, "Account number must contain only digits"),
    z.literal(""),
  ]),
});

export default userProfileSchema;

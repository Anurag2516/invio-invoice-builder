import type {
  UserProfileApiPayload,
  UserProfileFormValues,
  UserResponse,
} from "@/types/invoice";

const optStr = (val?: string) => val?.trim() || undefined;

export const formDataToUserApiPayload = (
  form: UserProfileFormValues,
): UserProfileApiPayload => ({
  name: form.name,
  email: form.email,
  companyName: optStr(form.companyName),
  address: optStr(form.address),
  phone: optStr(form.phone),
  website: optStr(form.website),
  accountHolderName: optStr(form.accountHolderName),
  bankName: optStr(form.bankName),
  accountNumber: optStr(form.accountNumber),
});

export const UserResponseToformData = (
  user: UserResponse,
): UserProfileFormValues => ({
  name: user.name,
  email: user.email,
  companyName: user.companyName ?? "",
  address: user.address ?? "",
  phone: user.phone ?? "",
  website: user.website ?? "",
  accountHolderName: user.accountHolderName ?? "",
  bankName: user.bankName ?? "",
  accountNumber: user.accountNumber ?? "",
});

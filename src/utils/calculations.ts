import type { LineItem, InvoiceTotal } from "../types/invoice";

export const calculateLineAmount = (
  quantity: number,
  rate: number,
): number => {
  return Number((quantity * rate).toFixed(2));
};

export const calculateInvoiceTotal = (
  lineItems: LineItem[],
  tax: number,
  discount: number,
): InvoiceTotal => {
  const subtotal: number = Number(
    lineItems
      .reduce((initialValue, element) => initialValue + element.amount, 0)
      .toFixed(2),
  );

  const appliedDiscount: number =
    discount !== 0 ? Number((subtotal * (discount / 100)).toFixed(2)) : 0;

  const taxableAmount = subtotal - appliedDiscount;

  const appliedTax: number =
    tax !== 0 ? Number((taxableAmount * (tax / 100)).toFixed(2)) : 0;

  const total: number = Number((taxableAmount + appliedTax).toFixed(2));

  return { subtotal, appliedTax, appliedDiscount, total };
};

import type { LineItems, InvoiceTotal } from "../types/invoice";

export const calculatedLineAmount = (
  quantity: number,
  rate: number,
): number => {
  return Number((quantity * rate).toFixed(2));
};

export const calculatedInvoiceTotal = (
  lineItems: LineItems[],
  tax: number,
  discount: number,
): InvoiceTotal => {
  const subtotal: number = Number(
    lineItems
      .reduce((initialValue, element) => initialValue + element.amount, 0)
      .toFixed(2),
  );

  const appliedTax: number =
    tax !== 0 ? Number((subtotal * (tax / 100)).toFixed(2)) : 0;

  const appliedDiscount: number =
    discount !== 0 ? Number((subtotal * (discount / 100)).toFixed(2)) : 0;

  const total: number = Number(
    (subtotal + appliedTax - appliedDiscount).toFixed(2),
  );

  return { subtotal, appliedTax, appliedDiscount, total };
};

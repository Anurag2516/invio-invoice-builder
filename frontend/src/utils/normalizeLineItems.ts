import type { LineItemFormData } from "@/types/invoice";
import { calculateLineAmount } from "./calculations";

export function normalizeLineItems(
    lineItems: LineItemFormData[],
  ): LineItemFormData[] {
    return lineItems.map((item) => ({
      id: item.id ?? crypto.randomUUID(),
      description: item.description ?? "",
      quantity: Number.isFinite(Number(item.quantity))
        ? Number(item.quantity)
        : 1,
      rate: Number.isFinite(Number(item.rate)) ? Number(item.rate) : 0,
      amount: calculateLineAmount(
        Number.isFinite(Number(item.quantity)) ? Number(item.quantity) : 1,
        Number.isFinite(Number(item.rate)) ? Number(item.rate) : 0,
      ),
    }));
  }
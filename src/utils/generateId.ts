const generateId = (): string => crypto.randomUUID();

const generateInvoiceNumber = (existing: string[]): string => {
  const nums: number[] = existing
    .map((n) => parseInt(n.replace(/\D/g, ""), 10))
    .filter(Boolean);

  const next = nums.length > 0 ? Math.max(...nums) + 1 : 1;

  return `INV-${String(next).padStart(4, "0")}`;
};

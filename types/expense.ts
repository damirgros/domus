export type ExpenseCategory =
  | "REPAIR"
  | "UTILITIES"
  | "TAX"
  | "INSURANCE"
  | "OTHER";

export type Expense = {
  id: string;
  title: string;
  description?: string | null;
  amount: number | string | { toString(): string };
  propertyName: string;
  category: ExpenseCategory;
  propertyId: string;
  createdAt: Date;
};

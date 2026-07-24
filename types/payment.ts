export type PaymentStatus = "PENDING" | "PAID" | "LATE";

export type Payment = {
  id: string;
  amount: number | string | { toString(): string };
  dueDate?: Date | null;
  paidAt?: Date | null;
  status: PaymentStatus;
  leaseId: string;
  createdAt: Date;
};

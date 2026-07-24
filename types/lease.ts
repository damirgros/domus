export type LeaseStatus = "ACTIVE" | "INACTIVE";

export type Lease = {
  id: string;
  startDate: Date;
  endDate?: Date | null;
  rentAmount: number | string | { toString(): string };
  status: LeaseStatus;
  tenantId: string;
  propertyId: string;
  createdAt: Date;
  updatedAt: Date;
};

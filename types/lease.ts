export type LeaseStatus = "ACTIVE" | "INACTIVE";

export type Lease = {
  id: string;
  startDate: Date;
  endDate?: Date | null;
  rentAmount: number | string | { toString(): string };
  status: LeaseStatus;
  tenantName: string;
  tenantId: string;
  propertyId: string;
  propertyName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MaintenanceStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED";
export type PriorityStatus = "HIGH" | "MEDIUM" | "LOW";

export type MaintenanceTicket = {
  id: string;
  title: string;
  description: string;
  status: MaintenanceStatus;
  priority: PriorityStatus;
  propertyName: string;
  propertyId: string;
  createdAt: Date;
  updatedAt: Date;
};

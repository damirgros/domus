export type Tenant = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: "ACTIVE" | "INACTIVE";
  propertyName: string;
  propertyId: string;
  createdAt: Date;
  updatedAt: Date;
};

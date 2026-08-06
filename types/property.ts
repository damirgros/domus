export type Property = {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode?: string | null;
  size?: number | null;
  rooms?: number | null;
  owner: string;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PropertyFormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

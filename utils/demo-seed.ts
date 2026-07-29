import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/prisma/generated/client";
import type { Workspace } from "@/types/workspace";

const connectionUrl = new URL(process.env.POSTGRES_URL ?? "");
connectionUrl.searchParams.delete("sslmode");

const adapter = new PrismaPg({
  connectionString: connectionUrl.toString(),
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

const firstNames = [
  "Alex",
  "Bianca",
  "Carlos",
  "Diana",
  "Elias",
  "Fatima",
  "Gabriel",
  "Hannah",
  "Ivan",
  "Julia",
  "Kai",
  "Lea",
  "Mateo",
  "Nora",
  "Omar",
];

const lastNames = [
  "Adams",
  "Bennett",
  "Cole",
  "Davis",
  "Evans",
  "Foster",
  "Garcia",
  "Hughes",
  "Ibrahim",
  "Jones",
  "Kim",
  "Lewis",
  "Martin",
  "Nguyen",
  "Ortiz",
];

export default async function seed(workspace: Workspace) {
  for (let index = 0; index < 15; index += 1) {
    const number = index + 1;
    const firstName = firstNames[index];
    const lastName = lastNames[index];
    const fullName = `${firstName} ${lastName}`;

    const property = await prisma.property.create({
      data: {
        name: `${lastName} Residence`,
        address: `${number * 11} ${firstName} Street`,
        city: ["Amsterdam", "Rotterdam", "Utrecht", "Eindhoven", "The Hague"][
          index % 5
        ],
        postalCode: `${1000 + number} AB`,
        size: 55 + number * 7.5,
        rooms: 2 + (number % 4),
        owner: fullName,
        workspaceId: workspace.id,
      },
    });

    const tenant = await prisma.tenant.create({
      data: {
        fullName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        phone: `+31 6 0000 ${String(1000 + number)}`,
        status: number % 5 === 0 ? "INACTIVE" : "ACTIVE",
        propertyName: property.name,
        propertyId: property.id,
      },
    });

    const startDate = new Date(2025, index % 12, 1);
    const lease = await prisma.lease.create({
      data: {
        startDate,
        endDate: number % 4 === 0 ? new Date(2027, index % 12, 1) : null,
        rentAmount: (950 + number * 75).toFixed(2),
        status: number % 5 === 0 ? "INACTIVE" : "ACTIVE",
        tenantId: tenant.id,
        propertyId: property.id,
      },
    });

    const paymentStatus =
      number % 5 === 0 ? "LATE" : number % 3 === 0 ? "PAID" : "PENDING";
    await prisma.payment.create({
      data: {
        amount: (950 + number * 75).toFixed(2),
        dueDate: new Date(2026, index % 12, 5),
        paidAt: paymentStatus === "PAID" ? new Date(2026, index % 12, 3) : null,
        status: paymentStatus,
        leaseId: lease.id,
      },
    });

    await prisma.maintenanceTicket.create({
      data: {
        title: `${["Heating", "Plumbing", "Electrical", "Roof", "Painting"][index % 5]} inspection`,
        description: `Routine maintenance request for ${property.name}.`,
        status: (["OPEN", "IN_PROGRESS", "COMPLETED"] as const)[index % 3],
        priority: (["LOW", "MEDIUM", "HIGH"] as const)[index % 3],
        propertyName: property.name,
        propertyId: property.id,
      },
    });

    await prisma.expense.create({
      data: {
        title: `${["Boiler service", "Water repair", "Electrical check", "Roof inspection", "Insurance"][index % 5]}`,
        description: `Seed expense for ${property.name}.`,
        amount: (125 + number * 42.5).toFixed(2),
        propertyName: property.name,
        category: (
          ["REPAIR", "UTILITIES", "TAX", "INSURANCE", "OTHER"] as const
        )[index % 5],
        propertyId: property.id,
      },
    });
  }
}

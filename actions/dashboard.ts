"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardSummary() {
  try {
    const [
      propertyCount,
      tenantCount,
      leaseCount,
      maintenanceCount,
      expenseCount,
      latePaymentCount,
      activeLeaseCount,
      totalRent,
    ] = await Promise.all([
      prisma.property.count(),
      prisma.tenant.count(),
      prisma.lease.count(),
      prisma.maintenanceTicket.count(),
      prisma.expense.count(),
      prisma.payment.count({ where: { status: "LATE" } }),
      prisma.lease.count({ where: { status: "ACTIVE" } }),
      prisma.lease.aggregate({
        _sum: {
          rentAmount: true,
        },
      }),
    ]);

    return {
      propertyCount,
      tenantCount,
      leaseCount,
      maintenanceCount,
      expenseCount,
      latePaymentCount,
      activeLeaseCount,
      totalRent: totalRent._sum.rentAmount?.toString() ?? "0",
    };
  } catch (error) {
    console.error("Failed to load dashboard summary", error);
    throw new Error("Unable to load dashboard summary.");
  }
}

"use server";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

export async function getDashboardSummary() {
  const cookieStore = await cookies();
  const sessionId = await cookieStore.get("session")?.value;

  if (!sessionId) {
    throw new Error("No session found");
  }

  const workspaceScope = {
    property: {
      workspace: { sessionId },
    },
  };

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
      totalExpenses,
      expiringLeases,
    ] = await prisma.$transaction([
      prisma.property.count({
        where: {
          workspace: { sessionId },
        },
      }),
      prisma.tenant.count({
        where: workspaceScope,
      }),
      prisma.lease.count({
        where: workspaceScope,
      }),
      prisma.maintenanceTicket.count({
        where: workspaceScope,
      }),
      prisma.expense.count({
        where: workspaceScope,
      }),
      prisma.payment.count({
        where: {
          status: "LATE",
          lease: {
            property: {
              workspace: { sessionId },
            },
          },
        },
      }),
      prisma.lease.count({
        where: {
          status: "ACTIVE",
          property: {
            workspace: { sessionId },
          },
        },
      }),
      prisma.lease.aggregate({
        where: workspaceScope,
        _sum: {
          rentAmount: true,
        },
      }),
      prisma.expense.aggregate({
        where: workspaceScope,
        _sum: {
          amount: true,
        },
      }),
      prisma.lease.findMany({
        where: {
          status: "ACTIVE",
          endDate: { not: null },
          property: {
            workspace: { sessionId },
          },
        },
        select: {
          id: true,
          endDate: true,
          tenant: {
            select: {
              fullName: true,
            },
          },
          property: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          endDate: "asc",
        },
        take: 5,
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
      totalExpenses: totalExpenses._sum.amount?.toString() ?? "0",
      expiringLeases,
    };
  } catch (error) {
    console.error("Failed to load dashboard summary", error);
    throw new Error("Unable to load dashboard summary.");
  }
}

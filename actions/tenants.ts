"use server";

import { prisma } from "@/lib/prisma";

export async function getTenants() {
  return prisma.tenant.findMany();
}

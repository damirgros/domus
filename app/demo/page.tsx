import DemoPage from "@/components/ui/demo_page/DemoPage";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import seed from "@/utils/demo-seed";

export default async function Demo() {
  const cookieStore = await cookies();
  const sessionId = await cookieStore.get("session")?.value;

  let workspace = await prisma.workspace.findUnique({
    where: {
      sessionId,
    },
  });

  if (!workspace && sessionId) {
    const workspace = await prisma.workspace.create({
      data: {
        id: crypto.randomUUID(),
        accessToken: crypto.randomUUID(),
        sessionId,
      },
    });
    if (workspace) {
      seed(workspace)
        .catch((error) => {
          console.error("Seeding failed:", error);
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
    }
  }

  return <DemoPage />;
}

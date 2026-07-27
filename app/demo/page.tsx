import DemoPage from "@/components/ui/demo_page/DemoPage";
import { cookies } from "next/header";
import { prisma } from "@/lib/prisma";

export default async function Demo() {
  const sessionId = (await cookies.get("session"))?.value;

  let workspace = await prisma.workspace.findUnique({
    where: {
      sessionId: sessionId,
    },
  });

  if (!workspace) {
    await prisma.workspace.create({
      data: {
        sessionId: sessionId,
      },
    });
  }

  return <DemoPage />;
}

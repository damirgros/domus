import { NextResponse } from "next/server";
import type { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export function middleware(request: NextResponse) {
  const session = request.cookies.get("session");

  if (!session) {
    const response = NextResponse.next();

    response.cookies.set("session", randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  return NextResponse.next();
}

import { NextRequest, NextResponse } from "next/server";
import { normalizePortalRole } from "@/lib/auth/portal";

function getDefaultRoute(role: ReturnType<typeof normalizePortalRole>) {
  if (role === "tenant") return "/tenant/dashboard";
  if (role === "owner") return "/owner/dashboard";
  return "/dashboard";
}

export function middleware(request: NextRequest) {
  const portalRole = normalizePortalRole(request.cookies.get("portal_role")?.value);
  const { pathname } = request.nextUrl;

  const ownerArea = pathname.startsWith("/owner");
  const tenantArea = pathname.startsWith("/tenant");
  const managerArea = pathname === "/dashboard" || pathname.startsWith("/manager");

  const blocked =
    (ownerArea && portalRole !== "owner") ||
    (tenantArea && portalRole !== "tenant") ||
    (managerArea && portalRole !== "manager");

  if (blocked) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = getDefaultRoute(portalRole);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/owner/:path*", "/tenant/:path*", "/dashboard", "/manager/:path*"]
};

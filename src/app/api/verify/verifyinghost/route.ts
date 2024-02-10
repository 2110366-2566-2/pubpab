import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../lib/client";
import { hash } from "bcrypt";

// Get host profile
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("host_id");

  const getHostWithUser = await prisma.host.findMany({
    where: id
      ? {
          host_id: id,
        }
      : undefined, // Conditionally add where clause for findUnique
    select: {
      bank_account: true,
      users: {
        select: {
          first_name: true,
          last_name: true,
          phone_no: true,
          banner: true,
          birth_date: true,
          citizen_id: true,
        },
      },
      accommodation: {
        select: {
          accommodation_id: true,
          banner: true,
          // accommodation_status: true,
          name_a: true,
        },
      },
    },
  });

  // Check if the host is not found
  if (!getHostWithUser) {
    return NextResponse.json({ error: "Host not found" }, { status: 404 });
  }

  // Return the combined information
  return NextResponse.json(getHostWithUser, { status: 200 });
}

// Verify host profile
export async function PUT(request: NextRequest) {
  const body = await request.json();

  const hostUpdateData = {
    admin_id: body.admin_id ? body.admin_id : undefined,
  };

  const host_newIssue = await prisma.host.update({
    where: { host_id: body.host_id },
    data: hostUpdateData,
  });

  if (!host_newIssue) {
    return NextResponse.json({ error: "Host not found" }, { status: 404 });
  }
  return NextResponse.json(host_newIssue, { status: 201 });
}

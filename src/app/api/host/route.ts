import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../lib/client";

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
        },
      },
    },
  });

  // Check if the host is not found
  if (!getHostWithUser) {
    return NextResponse.json({ error: "Host not found" }, { status: 404 });
  }

  // const { users, ...hostWithoutUser } = getHostWithUser;

  // Return the combined information
  return NextResponse.json(getHostWithUser, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const hostUpdateData = {
    bank_account: body.bank_account ?? undefined,
  };

  const userUpdateData = {
    first_name: body.first_name ?? undefined,
    last_name: body.last_name ?? undefined,
    phone_no: body.phone_no ?? undefined,
    banner: body.banner ?? undefined,
  };

  const host_newIssue = await prisma.host.update({
    where: { host_id: body.host_id },
    data: hostUpdateData,
  });

  if (!host_newIssue) {
    return NextResponse.json({ error: "Host not found" }, { status: 404 });
  }

  const user_newIssue = await prisma.users.update({
    where: { user_id: body.host_id },
    data: userUpdateData,
  });

  if (!user_newIssue) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ host_newIssue, user_newIssue }, { status: 201 });
}

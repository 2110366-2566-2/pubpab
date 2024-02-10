import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../lib/client";
import { hash } from "bcrypt";

// Get all not verified host profile
export async function GET(request: NextRequest) {
  const getHostWithUser = await prisma.host.findMany({
    where: {
      admin_id: null,
    },
    select: {
      host_id: true,
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
    return NextResponse.json({ error: "All host verified" }, { status: 404 });
  }

  // Return the combined information
  return NextResponse.json(getHostWithUser, { status: 200 });
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../prisma/client";

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

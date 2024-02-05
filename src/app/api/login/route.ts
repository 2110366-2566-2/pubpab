// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/client";
import bcrypt from "bcrypt";

// POST method for user login
export async function GET(request: NextRequest) {
  const mail = request.nextUrl.searchParams.get("user") as string;
  // Query the user from the database based on the provided email
  const user = await prisma.users.findUnique({
    where: { email: mail },
    select: {
      password_hash: true,
    },
  });

  // Check if the user exists and the password matches
  if (user) {
    // Return a success response
    return NextResponse.json({ password: user.password_hash });
  } else {
    // Return an error response if login fails
    return NextResponse.json(
      { success: false, msg: "Invalid email or password" },
      { status: 401 },
    );
  }
}

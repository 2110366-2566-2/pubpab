import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../lib/client";

// Get traveler profile
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("traveler_id");

  const gettravelerWithUser = await prisma.traveler.findMany({
    where: id
      ? {
          traveler_id: id,
        }
      : undefined, // Conditionally add where clause for findUnique
    select: {
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

  // Check if the traveler is not found
  if (!gettravelerWithUser) {
    return NextResponse.json({ error: "traveler not found" }, { status: 404 });
  }

  // const { users, ...travelerWithoutUser } = gettravelerWithUser;

  // Return the combined information
  return NextResponse.json(gettravelerWithUser, { status: 200 });
}

// result GET
// [
//   {
//       "users": {
//           "first_name": "John",
//           "last_name": "Doe",
//           "phone_no": "1234567890",
//           "banner": "https://example.com/banner.jpg"
//       }
//   }
// ]

// Edit traveler profile
export async function PUT(request: NextRequest) {
  const body = await request.json();

  const travelerUpdateData = {};

  const userUpdateData = {
    first_name: body.first_name ? body.first_name : undefined,
    last_name: body.last_name ? body.last_name : undefined,
    phone_no: body.phone_no ? body.phone_no : undefined,
    banner: body.banner ? body.banner : undefined,
    email: body.email ? body.email : undefined,
    password_hash: body.password ? await hash(body.password, 12) : undefined,
  };

  const traveler_newIssue = await prisma.traveler.update({
    where: { traveler_id: body.traveler_id },
    data: travelerUpdateData,
  });

  if (!traveler_newIssue) {
    return NextResponse.json({ error: "traveler not found" }, { status: 404 });
  }

  const user_newIssue = await prisma.users.update({
    where: { user_id: body.traveler_id },
    data: userUpdateData,
  });

  if (!user_newIssue) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(
    { traveler_newIssue, user_newIssue },
    { status: 201 },
  );
}

// result PUT
// {
//   "traveler_newIssue": {
//       "traveler_id": "User-12345678"
//   },
//   "user_newIssue": {
//       "user_id": "User-12345678",
//       "citizen_id": "1234567890124",
//       "first_name": "John",
//       "last_name": "Dode",
//       "email": "jodfhn.doe@example.com",
//       "password_hash": "hdfashed_password",
//       "salt": "sadflt123                       ",
//       "birth_date": "1990-01-01T00:00:00.000Z",
//       "age": 32,
//       "is_traveler": true,
//       "phone_no": "1234567890",
//       "gender": "M",
//       "banner": "https://example.com/banner.jpg"
//   }
// }

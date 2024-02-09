// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/client";
import { compare, hash } from "bcrypt";
// POST method for creating a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Hash the password using bcrypt

    // Create a new user in the database
    const newUser = await prisma.users.create({
      data: {
        user_id: body.user_id,
        citizen_id: body.citizen_id,
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password_hash: await hash(body.password, 12),
        salt: body.salt, // You may want to generate a random salt here
        birth_date: new Date(body.birth_date),
        age: body.age,
        phone_no: body.phone_no,
        gender: body.gender,
        banner: body?.banner,
        host: body?.host,
        messages: body?.messages,
        problem: body?.problem,
        is_traveler: body.is_traveler,
      },
    });

    // Return the newly created user
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error during user creation:", error);
    return NextResponse.json(
      { success: false, msg: "Error during user creation" },
      { status: 500 },
    );
  }
}

// test unique = id , email, salt
// {
//     "user_id": "1",
//     "citizen_id": "1234567890123",
//     "first_name": "Puta",
//     "last_name": "Realman",
//     "email": "puta@gmail.com",
//     "password": "puta",
//     "salt": "1",
//     "birth_date": "1990-01-01",
//     "age": 34,
//     "phone_no": "1234567890",
//     "gender": "M",
//     "is_traveler": true
//   }

// user_id       String     @id @db.VarChar(36)
// citizen_id    String     @unique @db.Char(13)
// first_name    String     @db.VarChar(64)
// last_name     String     @db.VarChar(64)
// email         String     @unique
// password_hash String     @db.VarChar(255)
// salt          String     @unique @db.Char(32)
// birth_date    DateTime   @db.Date
// age           Int
// is_traveler   Boolean
// phone_no      String     @db.Char(10)
// gender        genders
// banner        String?
// host          host?
// messages      messages[]
// problem       problem[]
// traveler      traveler?

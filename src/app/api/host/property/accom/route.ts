import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../lib/client";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("accommodation_id");

  // Handle the case where id is null
  if (!id) {
    return NextResponse.json(
      { error: "Accommodation id is missing" },
      { status: 400 },
    );
  }

  const getAccomodation = await prisma.accommodation.findMany({
    where: { accommodation_id: id },
    select: {
      room: {
        select: {
          room_id: true,
          is_reserve: true,
          room_name: true,
          banner: true,
        },
      },
    },
  });

  // Check if the host is not found
  if (!getAccomodation) {
    return NextResponse.json(
      { error: "Accommodation not found" },
      { status: 404 },
    );
  }

  // const { users, ...hostWithoutUser } = getHostWithUser;

  // Return the combined information
  return NextResponse.json(getAccomodation, { status: 200 });
}

// Create accomodation profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const AccommodationData = {
      // accommodation_id: body.accommodation_id,
      host_id: body.host_id,
      qr_code: body.qr_code,
      name_a: body.name_a,
      description_a: body.description_a,
      price: body.price,
      banner: body.banner ? body.banner : null,
      address_a: body.address_a,
      city: body.city,
      province: body.province,
      distinct_a: body.distinct_a,
      postal_code: body.postal_code,
      ggmap_link: body.ggmap_link,
      rating: body.rating,
      accommodation_status: body.accommodation_status,
    };

    const acom_newIssue = await prisma.accommodation.create({
      data: AccommodationData,
    });
    return NextResponse.json(acom_newIssue, { status: 201 });
  } catch (error) {
    console.error("Error during user creation:", error);
    return NextResponse.json(
      { success: false, msg: "Error during accomodation creation" },
      { status: 500 },
    );
  }
}

// Edit accomodation profile
export async function PUT(request: NextRequest) {
  const body = await request.json();

  const AccommodationUpdateData = {
    name_a: body.name_a ? body.name_a : undefined,
    description_a: body.description_a ? body.description_a : undefined,
    address_a: body.address_a ? body.address_a : undefined,
    city: body.city ? body.city : undefined,
    province: body.province ? body.province : undefined,
    distinct_a: body.distinct_a ? body.distinct_a : undefined,
    postal_code: body.postal_code ? body.postal_code : undefined,
    accommodation_status: body.accommodation_status
      ? body.accommodation_status
      : undefined,
  };

  const acom_newIssue = await prisma.accommodation.update({
    where: { accommodation_id: body.accommodation_id },
    data: AccommodationUpdateData,
  });

  if (!acom_newIssue) {
    return NextResponse.json(
      { error: "accommodation not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(acom_newIssue, { status: 201 });
}

// Delete accomodation profile
export async function DELETE(request: NextRequest) {
  const body = await request.json();

  const deleteResult = await prisma.accommodation.delete({
    where: { accommodation_id: body.accommodation_id },
  });

  if (!deleteResult) {
    return NextResponse.json(
      { error: "Accommodation not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

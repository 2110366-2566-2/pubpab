import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../lib/client";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("host_id");

  // Handle the case where id is null
  if (!id) {
    return NextResponse.json({ error: "Host id is missing" }, { status: 400 });
  }

  const getHostProperties = await prisma.accommodation.findMany({
    where: { host_id: id },
  });

  // Check if the host is not found
  if (!getHostProperties) {
    return NextResponse.json({ error: "Host not found" }, { status: 404 });
  }

  // const { users, ...hostWithoutUser } = getHostWithUser;

  // Return the combined information
  return NextResponse.json(getHostProperties, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const AccommodationUpdateData = {
    name_a: body.name_a ?? undefined,
    description_a: body.description_a ?? undefined,
    address_a: body.address_a ?? undefined,
    city: body.city ?? undefined,
    province: body.province ?? undefined,
    distinct_a: body.distinct_a ?? undefined,
    postal_code: body.postal_code ?? undefined,
    accommodation_status: body.postal_code ?? undefined,
  };

  const acom_newIssue = await prisma.accommodation.update({
    where: { accommodation_id: body.accommodation_id },
    data: AccommodationUpdateData,
  });

  if (!acom_newIssue) {
    return NextResponse.json({ error: "Host not found" }, { status: 404 });
  }

  return NextResponse.json(acom_newIssue, { status: 201 });
}

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

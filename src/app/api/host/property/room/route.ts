import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../../lib/client";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("room_id");

  // Handle the case where id is null
  if (!id) {
    return NextResponse.json({ error: "room id is missing" }, { status: 400 });
  }

  const getRoom = await prisma.room.findMany({
    where: { room_id: id },
  });

  // Check if the host is not found
  if (!getRoom) {
    return NextResponse.json({ error: "room not found" }, { status: 404 });
  }

  // Return the combined information
  return NextResponse.json(getRoom, { status: 200 });
}

// Create room profile
export async function POST(request: NextRequest) {
  const body = await request.json();

  const RoomData = {
    // room_id: body.room_id,
    accommodation_id: body.accommodation_id,
    room_name: body.room_name,
    price: body.price,
    floor: body.floor,
    is_reserve: body.is_reserve,
    room_no: body.room_no,
    smoking: body.smoking,
    noise: body.noise,
    pet: body.pet,
    washing_machine: body.washing_machine,
    bed_type: body.bed_type,
    restroom: body.restroom,
    wifi_available: body.wifi_available,
    max_resident_no: body.max_resident_no,
  };

  try {
    const room = await prisma.room.create({
      data: RoomData,
    });

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 },
    );
  }
}

// Edit room profile
export async function PUT(request: NextRequest) {
  const body = await request.json();

  const RoomUpdateData = {
    room_name: body.room_name ? body.room_name : undefined,
    price: body.price ? body.price : undefined,
    floor: body.floor ? body.floor : undefined,
    is_reserve: body.is_reserve ? body.is_reserve : undefined,
    room_no: body.room_no ? body.room_no : undefined,
    smoking: body.smoking ? body.smoking : undefined,
    noise: body.noise ? body.noise : undefined,
    pet: body.pet ? body.pet : undefined,
    washing_machine: body.washing_machine ? body.washing_machine : undefined,
    bed_type: body.bed_type ? body.bed_type : undefined,
    restroom: body.restroom ? body.restroom : undefined,
    wifi_available: body.wifi_available ? body.wifi_available : undefined,
    max_resident_no: body.max_resident_no ? body.max_resident_no : undefined,
  };

  const room_newIssue = await prisma.room.update({
    where: { room_id: body.room_id },
    data: RoomUpdateData,
  });

  if (!room_newIssue) {
    return NextResponse.json({ error: "room not found" }, { status: 404 });
  }

  return NextResponse.json(room_newIssue, { status: 201 });
}

// Delete room profile
export async function DELETE(request: NextRequest) {
  const body = await request.json();

  const deleteResult = await prisma.room.delete({
    where: { room_id: body.room_id },
  });

  if (!deleteResult) {
    return NextResponse.json({ error: "room not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

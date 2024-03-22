"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import PropertyRoomCard from "@/components/card/PropertyRoomCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { getImageUrlFromS3 } from "@/lib/s3";
import { useEffect, useState } from "react";

// const allow = [
//   { id: "pet", label: "Pet" },
//   { id: "noise", label: "Noise" },
//   { id: "smoking", label: "Smoking" },
// ] as const;

// const facility = [
//   { id: "wifi", label: "Wifi" },
//   { id: "restroom", label: "Restroom" },
//   { id: "washingMachine", label: "Washing Machine" },
// ] as const;

type RoomData = {
  room_id?: string;
  room_name?: string;
  banner?: string;
  price?: number;
  floor?: number;
  is_reserve?: boolean;
  room_no?: string;
  smoking?: boolean;
  noise?: boolean;
  pet?: boolean;
  washing_machine?: boolean;
  bed_type?: "KING" | "QUEEN";
  rest_room?: boolean;
  wifi_available?: boolean;
  accommodation_id?: string;
  max_adult?: number;
  max_children?: number;
};

const formSchema = z.object({
  room_name: z.string().max(64, "Name must be less than 64 characters long."),
  // description: z
  //   .string()
  //   .max(64, "Description must be less than 64 characters long."),
  banner: z.string(),
  price: z.coerce.number().min(0, "Price must not be less than 0."),
  is_reserve: z.boolean(),
  max_adult: z.coerce
    .number()
    .min(0, "The number of adult must not be less than 0."),
  max_children: z.coerce
    .number()
    .min(0, "The number of children must not be less than 0."),
  floor: z.coerce.number(),
  room_no: z.string(),
  smoking: z.boolean().default(false).optional(),
  noise: z.boolean().default(false).optional(),
  pet: z.boolean().default(false).optional(),
  washing_machine: z.boolean().default(false).optional(),
  restroom: z.boolean().default(false).optional(),
  wifi_available: z.boolean().default(false).optional(),
  bed_type: z.enum(["KING", "QUEEN"]),
  accommodation_id: z.string(),
  // allow: z.array(z.string()).refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one item.",
  // }),

  // facility: z.array(z.string()).refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one item.",
  // }),
});

function HostEditRoomForm({ roomData }: { roomData: RoomData }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      room_name: roomData.room_name,
      price: roomData.price,
      floor: roomData.floor,
      is_reserve: roomData.is_reserve,
      room_no: roomData.room_no,
      smoking: roomData.smoking,
      noise: roomData.noise,
      pet: roomData.pet,
      washing_machine: roomData.washing_machine,
      bed_type: roomData.bed_type,
      restroom: roomData.rest_room,
      wifi_available: roomData.wifi_available,
      max_adult: roomData.max_adult,
      max_children: roomData.max_children,
    },
  });
  const router = useRouter();
  const deleteRoom = trpc.host.room.delete.useMutation();
  const mutation = trpc.host.room.update.useMutation();
  const onInvalid = (errors: unknown) => console.error(errors);

  let filePath = "";
  if (roomData.banner !== "null") {
    filePath =
      "accommodation/" +
      roomData.accommodation_id +
      "/" +
      roomData.room_id +
      "/" +
      roomData.banner;
  }

  function onBack() {
    router.back();
  }

  async function OpenTheRoom() {
    await mutation.mutateAsync({
      room_id: roomData.room_id ? roomData.room_id : "",
      is_reserve: false,
    });
    await router.back();
  }

  async function CloseTheRoom() {
    await mutation.mutateAsync({
      room_id: roomData.room_id ? roomData.room_id : "",
      is_reserve: true,
    });
    await router.back();
  }

  function getOpenOrClose() {
    if (roomData.is_reserve) {
      return (
        <Button
          className="text-grey-800 mt-15 mr-7 w-40 border border-black bg-[#F4EDEA] hover:text-white"
          onClick={OpenTheRoom}
        >
          Open this room
        </Button>
      );
    } else {
      return (
        <Button
          className="text-grey-800 mt-15 mr-7 w-40 border border-black bg-[#F4EDEA] hover:text-white"
          onClick={CloseTheRoom}
        >
          Close this room
        </Button>
      );
    }
  }

  function DeleteHandle() {
    deleteRoom.mutate({
      room_id: roomData.room_id ? roomData.room_id : "",
    });
    router.back();
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      ...values,
      room_id: roomData.room_id ? roomData.room_id : "",
    });
  }
  return (
    <div>
      <Button
        className="text-grey-800 mt-15 mb-4 w-40 border border-black bg-[#F4EDEA] hover:text-white"
        onClick={onBack}
      >
        Back
      </Button>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Room Information</CardTitle>
          <CardDescription>Make changes to room here.</CardDescription>
        </CardHeader>
        <div className="mx-4">
          <PropertyRoomCard
            title="Suite"
            imageUrl={filePath}
            status={roomData.is_reserve ? "Unavailable" : "Available"}
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onInvalid)}
              className="mx-4 my-4 space-y-4"
            >
              <FormField
                control={form.control}
                name="room_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Name"
                        className="border border-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Description"
                        className="border border-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Price"
                        className="border border-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <FormField
                    control={form.control}
                    name="floor"
                    render={({ field }) => (
                      <FormItem className="mb-4 mr-7">
                        {" "}
                        <FormLabel>Floor</FormLabel>
                        <FormControl>
                          <Input {...field} className="border border-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <FormField
                    control={form.control}
                    name="room_no"
                    render={({ field }) => (
                      <FormItem className="mb-4 mr-7">
                        {" "}
                        <FormLabel>Room Number</FormLabel>
                        <FormControl>
                          <Input {...field} className="border border-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <FormField
                    control={form.control}
                    name="max_adult"
                    render={({ field }) => (
                      <FormItem className="mb-4 mr-7">
                        {" "}
                        <FormLabel>Adult</FormLabel>
                        <FormControl>
                          <Input {...field} className="border border-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <FormField
                    control={form.control}
                    name="max_children"
                    render={({ field }) => (
                      <FormItem className="mb-4 mr-7">
                        {" "}
                        <FormLabel>Children</FormLabel>
                        <FormControl>
                          <Input {...field} className="border border-black" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <div className="text-lg">Allow</div>
                <FormField
                  control={form.control}
                  name="smoking"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Smoking</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="noise"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Noise</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pet"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Pet</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <div className="text-lg"> Facility </div>
                <FormField
                  control={form.control}
                  name="washing_machine"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Washing Machine</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="restroom"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Restroom</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="wifi_available"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Wifi Available</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              {getOpenOrClose()}
              <div>
                <Button
                  type="submit"
                  className="text-grey-800 mt-15 ml-0 mr-2 w-40 border border-black bg-[#F4EDEA] hover:text-white"
                >
                  Save Changes
                </Button>
                <Button
                  className="text-grey-800 mt-15 w-40 border border-black bg-[#F4EDEA] hover:text-white"
                  onClick={DeleteHandle}
                >
                  Delete Room
                </Button>
              </div>
              {/* <Button type="submit" className="mt-10">
                      Save Changes
                    </Button>
                    <Button type="submit" className="mt-10">
                      Delete Room
                    </Button>
                  </div> */}
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}

export default function RoomEditForm({ room_id }: { room_id: string }) {
  const roomDataQuery = trpc.host.room.find.useQuery({
    room_id: room_id,
  });
  if (roomDataQuery.status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <HostEditRoomForm
      roomData={{
        room_id: room_id,
        accommodation_id: roomDataQuery.data?.accommodation_id,
        room_name: roomDataQuery.data?.room_name,
        banner: roomDataQuery.data?.banner,
        price: roomDataQuery.data?.price,
        floor: roomDataQuery.data?.floor,
        is_reserve: roomDataQuery.data?.is_reserve,
        room_no: roomDataQuery.data?.room_no,
        smoking: roomDataQuery.data?.smoking,
        noise: roomDataQuery.data?.noise,
        pet: roomDataQuery.data?.pet,
        washing_machine: roomDataQuery.data?.washing_machine,
        bed_type: roomDataQuery.data?.bed_type,
        rest_room: roomDataQuery.data?.restroom,
        wifi_available: roomDataQuery.data?.wifi_available,
        max_adult: roomDataQuery.data?.max_adult,
        max_children: roomDataQuery.data?.max_children,
      }}
    />
  );
}

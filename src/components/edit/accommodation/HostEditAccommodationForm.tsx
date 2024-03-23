/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import PropertyAccomCard from "@/components/card/PropertyAccomCard";
import PropertyRoomCard from "@/components/card/PropertyRoomCard";
import GoogleMapView from "@/components/GoogleMapView";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingScreen from "@/components/ui/loading-screen";
import { trpc } from "@/lib/trpc/client";
import {
  deleteObjectInS3,
  getImageUrlFromS3,
  moveObjectInS3,
  uploadImageToS3Tmp,
} from "@/lib/s3";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name_a: z
    .string()
    .max(64, "Accomodation name must be less than 64 characters long."),
  description_a: z.string(),
  qr_code: z.string(),
  address_a: z
    .string()
    .max(255, "Address must be less than 255 characters long."),
  city: z.string().max(100, "City must be less than 100 characters long."),
  province: z
    .string()
    .max(100, "Province must be less than 100 characters long."),
  district: z
    .string()
    .max(100, "District must be less than 100 characters long."),
  postalcode: z.string().length(5, "Invalid postal code format."),
  accommodation_status: z.enum(["OPEN", "CLOSE"]),
  ggmap_link: z
    .string()
    .regex(
      /^https?:\/\/www\.google\.com\/maps\/search\/\?api=1&query=[\d.-]+,[\d.-]+$/,
    ),
  rating: z
    .number()
    .max(
      5,
      "Oh! I think you're overrated your accommodation. You should be shame!",
    ),
});

type AccommodationData = {
  accommodation_id?: string;
  name_a?: string;
  description_a?: string;
  qr_code?: string;
  address_a?: string;
  city?: string;
  province?: string;
  district?: string;
  postalcode?: string;
  ggmap_link?: string;
  accommodation_status?: "OPEN" | "CLOSE";
  rating?: number;
  banner?: string;
};

function HostEditAccommodationForm({
  accommodationData,
}: {
  accommodationData: AccommodationData;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_a: accommodationData.name_a,
      description_a: accommodationData.description_a,
      address_a: accommodationData.address_a,
      city: accommodationData.city,
      province: accommodationData.province,
      district: accommodationData.district,
      postalcode: accommodationData.postalcode,
      ggmap_link: accommodationData.ggmap_link,
      accommodation_status: accommodationData.accommodation_status,
      qr_code: accommodationData.qr_code,
      rating: accommodationData.rating,
    },
  });
  const router = useRouter();
  const onInvalid = (errors: unknown) => console.error(errors);
  let filePath = "";
  if (accommodationData.banner !== "null") {
    filePath =
      "accommodation/" +
      accommodationData.accommodation_id +
      "/" +
      accommodationData.banner;
  }

  const [selectedImage, setSelectedImage] = useState<string>("");

  const deleteAccom = trpc.host.accomodation.delete.useMutation();
  const mutation = trpc.host.accomodation.update.useMutation();

  const findRoom = trpc.host.room.findMany.useQuery({
    accommodation_id: accommodationData.accommodation_id || "",
  });

  if (findRoom.error) {
    return <div>Error: {findRoom.error.message}</div>;
  }

  if (findRoom.isLoading) {
    return <div>Loading...</div>;
  }

  const rooms = findRoom.data;

  const propertyData = rooms.flatMap((entry) =>
    entry.room.map((room) => ({
      link: room.banner,
      image: "/room1.png",
      title: room.room_name,
      status: room.is_reserve,
      id: room.room_id,
    })),
  );

  const handleAddRoomClick = () => {
    router.push(
      `../../add/room?accommodation_id=${accommodationData.accommodation_id}`,
    );
  };

  const handleDeleteClick = () => {
    deleteAccom.mutate({
      accommodation_id: accommodationData.accommodation_id
        ? accommodationData.accommodation_id
        : "",
    });
    router.back();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    await uploadImageToS3Tmp(file);
    setSelectedImage(file.name);
  };

  function onBack() {
    const isImageChange = selectedImage !== "";
    if (isImageChange) {
      deleteObjectInS3("temp/" + selectedImage);
    }
    router.back();
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const isImageChange = selectedImage !== "";
    if (isImageChange) {
      const newFilePath =
        "accommodation/" +
        accommodationData.accommodation_id +
        "/" +
        selectedImage;
      moveObjectInS3("temp/" + selectedImage, newFilePath);
      deleteObjectInS3(filePath);
    }
    mutation.mutateAsync({
      ...values,
      accommodation_id: accommodationData.accommodation_id
        ? accommodationData.accommodation_id
        : "",
      banner: isImageChange ? selectedImage : accommodationData.banner,
    });
    setSelectedImage("");
  }
  return (
    <div>
      <Button
        className="text-grey-800 mt-15 mb-4 w-40 border border-black bg-[#F4EDEA] hover:text-white"
        onClick={onBack}
      >
        Back
      </Button>
      <Card className="my-4 max-w-2xl flex-wrap gap-4 px-4 py-4">
        <CardHeader>
          <CardTitle>Property Information</CardTitle>
          <CardDescription>Make changes to property here.</CardDescription>
        </CardHeader>
        <div className="mb-4">
          <PropertyAccomCard
            imageUrl={selectedImage === "" ? filePath : "temp/" + selectedImage}
            title={accommodationData.name_a || ""}
            status={accommodationData.accommodation_status || ""}
            id={accommodationData.accommodation_id || ""}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input
            id="picture"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div className="mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onInvalid)}
              className="space-y-4 px-4"
            >
              <div>
                <FormField
                  control={form.control}
                  name="name_a"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Property Name"
                          className="border border-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description_a"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Property Description"
                          className="border border-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <label className="text-xl">Location</label>
              </div>
              <div className="w-full md:w-2/3">
                <FormField
                  control={form.control}
                  name="address_a"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Address"
                          className="border border-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="mb-4 mr-7">
                        {" "}
                        {/* Add margin bottom and right */}
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City"
                            className="border border-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem className="mb-4 mr-7">
                        {" "}
                        {/* Add margin bottom */}
                        <FormLabel>District</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="District"
                            className="border border-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        {" "}
                        {/* Add margin bottom and right */}
                        <FormLabel>Province</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Province"
                            className="border border-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalcode"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        {" "}
                        {/* Add margin bottom */}
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Postal Code"
                            className="border border-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <FormField
                  control={form.control}
                  name="ggmap_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Google Map Link</FormLabel>
                      <GoogleMapView
                        onMapMarker={field.value}
                        onMapClick={field.onChange}
                      />
                      <FormControl>
                        <Input className="border border-black" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                onClick={handleAddRoomClick}
                className="text-grey-800 mt-15 mr-7 w-40 border border-black bg-[#F4EDEA] hover:text-white"
              >
                Add New Room
              </Button>
              <div className="px-4 py-4">
                {propertyData.map((property, index) => (
                  <div key={index} className="mb-4">
                    <Link
                      href={{
                        pathname: "/edit/host/room",
                        query: {
                          room_id: property.id,
                        },
                      }}
                    >
                      <PropertyRoomCard
                        title={property.title}
                        imageUrl={
                          "accommodation/" +
                          accommodationData.accommodation_id +
                          "/" +
                          property.id +
                          "/" +
                          property.link
                        }
                        status={property.status ? "Available" : "Unavailable"}
                      />
                    </Link>
                  </div>
                ))}
              </div>
              <Button
                type="submit"
                className="text-grey-800 mt-15 mr-7 w-40 border border-black bg-[#F4EDEA] hover:text-white"
              >
                Save changes
              </Button>
              <Button
                className="text-grey-800 mt-15 mr-7 w-40 border border-black bg-[#F4EDEA] hover:text-white"
                onClick={handleDeleteClick}
              >
                Delete Property
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}

export default function AccommodationEditForm({
  accommodation_id,
}: {
  accommodation_id: string;
}) {
  const { data: session } = useSession();
  const accommodationDataQuery = trpc.host.accomodation.find.useQuery({
    host_id: session?.user?.id,
    accommodation_id: accommodation_id,
  });
  if (accommodationDataQuery.status === "loading") {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
    // <div>Loading...</div>;
  }
  return (
    <HostEditAccommodationForm
      accommodationData={{
        accommodation_id: accommodation_id,
        name_a: accommodationDataQuery.data?.name_a,
        description_a: accommodationDataQuery.data?.description_a,
        qr_code: accommodationDataQuery.data?.qr_code,
        address_a: accommodationDataQuery.data?.address_a,
        city: accommodationDataQuery.data?.city,
        province: accommodationDataQuery.data?.province,
        district: accommodationDataQuery.data?.distinct_a,
        postalcode: accommodationDataQuery.data?.postal_code,
        ggmap_link: accommodationDataQuery.data?.ggmap_link,
        accommodation_status: accommodationDataQuery.data?.accommodation_status,
        rating: accommodationDataQuery.data?.rating,
        banner: accommodationDataQuery.data?.banner,
      }}
    />
  );
}

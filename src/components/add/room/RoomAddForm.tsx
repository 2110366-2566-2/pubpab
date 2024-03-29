"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
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

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";

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

const formSchema = z.object({
  room_name: z.string().max(64, "Name must be less than 64 characters long."),
  floor: z.coerce.number().min(1),
  // description: z
  //   .string()
  //   .max(64, "Description must be less than 64 characters long."),
  price: z.coerce.number().min(0, "Price must not be less than 0."),
  adult: z.coerce
    .number()
    .min(0, "The number of adult must not be less than 0."),
  children: z.coerce
    .number()
    .min(0, "The number of adult must not be less than 0."),
  room_no: z.string(),
  bed_type: z.enum(["KING", "QUEEN"]),
  is_reserve: z.boolean(),
  max_adult: z.number(),
  max_children: z.number(),
  smoking: z.boolean().default(false),
  noise: z.boolean().default(false),
  pet: z.boolean().default(false),
  washing_machine: z.boolean().default(false),
  restroom: z.boolean().default(false),
  wifi_available: z.boolean().default(false),
  accommodation_id: z.string(),
  // allow: z.array(z.string()).refine((value) => value.some((item) =>d
  // }),

  // facility: z.array(z.string()).refine((value) => value.some((item) => item), {
  //   message: "You have to select at least one item.",
  // }),
});

export default function RoomAddForm() {
  const router = useRouter();
  const mutation = trpc.host.room.create.useMutation();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      max_adult: 2,
      max_children: 1,
      accommodation_id: searchParams.get("accommodation_id") || "",
      is_reserve: false,
      smoking: false,
      noise: false,
      pet: false,
      washing_machine: false,
      restroom: false,
      wifi_available: false,
    },
  });

  const onInvalid = (errors: unknown) => console.error(errors);
  const handleBackClick = () => {
    router.back();
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      ...values,
    });
    router.back();
  }
  return (
    <div>
      <Button
        className="text-grey-800 mt-15 mb-4 w-40 border border-black bg-[#F4EDEA] hover:text-white"
        onClick={handleBackClick}
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
            imageUrl={"/room1.jpeg"}
            status="Available"
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
                    name="adult"
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
                    name="children"
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
              <FormField
                control={form.control}
                name="bed_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bed Type</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Bed Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="KING">KING</SelectItem>
                        <SelectItem value="QUEEN">QUEEN</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <div>
                <Button
                  type="submit"
                  className="text-grey-800 mt-15 ml-0 mr-2 w-40 border border-black bg-[#F4EDEA] hover:text-white"
                >
                  Add Room
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

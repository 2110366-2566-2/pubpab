"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import user from "@/../public/User.svg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc/client";

import HostEditProperties from "../properties/HostEditProperties";
import PropertyRoomCard from "../propertycard/PropertyRoomCard";
import { Input } from "../ui/input";

const formSchema = z
  .object({
    first_name: z
      .string()
      .max(64, "Firstname must be less than 64 characters long."),
    last_name: z
      .string()
      .max(64, "Lastname must be less than 64 characters long."),
    bank_account: z
      .string()
      .length(10, "Invalid Bank Account.")
      .regex(/^\d+$/, "Invalid Bank Account."),
    email: z
      .string()
      .regex(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "Invalid email format.",
      ),
    password: z
      .string()
      .min(12, "Password must be at least 12 characters long.")
      .optional(),
    confirmed_password: z
      .string()
      .min(12, "Password must be at least 12 characters long.")
      .optional(),
    phone_no: z
      .string()
      .length(10, "Invalid phone number format.")
      .regex(/^\d+$/, "Invalid phone number format."),
  })
  .superRefine(({ confirmed_password, password }, ctx) => {
    if (confirmed_password !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

type HostData = {
  first_name?: string;
  last_name?: string;
  bank_account?: string;
  email?: string;
  phone_no?: string;
};

function HostProfileForm({ hostData }: { hostData: HostData }) {
  const { data: session } = useSession();
  const router = useRouter();
  const mutation = trpc.host.profile.update.useMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bank_account: hostData.bank_account,
      email: hostData.email,
      first_name: hostData.first_name,
      last_name: hostData.last_name,
      phone_no: hostData.phone_no,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutation.mutate({ ...values, host_id: session?.user.id });
    router.push("/");
  }
  return (
    <main className="mt-4 min-h-screen grow px-4">
      <div className="mx-auto max-w-4xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Host Editing Page
        </h2>
      </div>
      <Tabs defaultValue="profile_edit_form" className="mt-4">
        <TabsList className="flex w-full justify-center">
          <TabsTrigger value="profile_edit_form" className="flex-1">
            Profile
          </TabsTrigger>
          <TabsTrigger value="properties_edit_form" className="flex-1">
            Properties
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile_edit_form">
          <div className="flex justify-center">
            <div className="w-full">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Make changes to profile here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="relative mt-8 flex items-center justify-center gap-x-4">
                    <Image src={user} alt="" className="w-20 lg:w-16"></Image>
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <a href="#">
                          <span className="absolute inset-0"></span>
                          Profile
                        </a>
                      </p>
                      <p className="text-gray-600">Edit Profile</p>
                    </div>
                  </div>
                  <div className="mt-0 flex flex-col items-center justify-center gap-12 lg:flex-row lg:gap-6">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                      >
                        <div className="mt-8 flex flex-col items-center justify-center gap-12 lg:flex-row lg:gap-6">
                          <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Firstname</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Lastname</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="phone_no"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="M">Male</SelectItem>
                              <SelectItem value="F">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                        <FormField
                          control={form.control}
                          name="bank_account"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bank Account</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* <FormField
                      control={form.control}
                      name="citizen_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Citizen ID</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="confirmed_password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirmed Password</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* <FormField
                      control={form.control}
                      name="birth_date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Birth</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <Select onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Gender" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="M">Male</SelectItem>
                                  <SelectItem value="F">Female</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="bank_account"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bank Account</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="citizen_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Citizen ID</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                        <Button
                          type="submit"
                          className="text-grey-800 mt-10 border border-black bg-[#F4EDEA] hover:text-white"
                        >
                          Save changes
                        </Button>
                      </form>
                    </Form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="properties_edit_form">
          <div className="flex justify-center">
            <div className="w-full">
              <Card>
                <CardHeader>
                  <CardTitle>Property Information</CardTitle>
                  <CardDescription>
                    Make changes to property here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <HostEditProperties />
                  <label className="text-xl font-bold">Rooms</label>
                  <PropertyRoomCard
                    title="Studio Rooms"
                    imageUrl="/room1.jpeg"
                    status="Available"
                  />
                  <PropertyRoomCard
                    title="Deluxe Rooms"
                    imageUrl="/room2.jpeg"
                    status="Unavailable"
                  />
                  <PropertyRoomCard
                    title="Suites Rooms"
                    imageUrl="/room3.jpeg"
                    status="Available"
                  />
                  <div>
                    <Button
                      type="submit"
                      className="text-grey-800 mt-15 mr-7 w-40 border border-black bg-[#F4EDEA] hover:text-white"
                    >
                      Save changes
                    </Button>
                    <Button
                      type="submit"
                      className="text-grey-800 mt-15 w-40 border border-black bg-[#F4EDEA] hover:text-white"
                    >
                      Delete Property
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default function HostEditForm() {
  const { data: session } = useSession();
  const hostDataQuery = trpc.host.profile.find.useQuery({
    host_id: session?.user?.id,
  });
  if (hostDataQuery.status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <HostProfileForm
      hostData={{
        bank_account: hostDataQuery.data?.bank_account ?? "",
        email: hostDataQuery.data?.users?.email,
        first_name: hostDataQuery.data?.users?.first_name ?? "",
        last_name: hostDataQuery.data?.users?.last_name ?? "",
        phone_no: hostDataQuery.data?.users?.phone_no ?? "",
      }}
    />
  );
}

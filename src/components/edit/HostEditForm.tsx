"use client";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import user from "/public/user.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { trpc } from "@/lib/trpc/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HostEditProperties from "../properties/HostEditProperties";
import PropertyRoomCard from "../propertycard/PropertyRoomCard";

const formSchema = z
  .object({
    citizen_id: z
      .string()
      .length(13, "Invalid Citizen ID.")
      .regex(/^\d+$/, "Invalid Citizen ID."),
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
      .min(12, "Password must be at least 12 characters long."),
    confirmed_password: z
      .string()
      .min(12, "Password must be at least 12 characters long."),
    birth_date: z.date(),
    phone_no: z
      .string()
      .length(10, "Invalid phone number format.")
      .regex(/^\d+$/, "Invalid phone number format."),
    gender: z.enum(["M", "F"]),
  })
  .superRefine(({ confirmed_password, password }, ctx) => {
    if (confirmed_password !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

export default function HostEditForm() {
  const mutation = trpc.user.create.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutation.mutate({ ...values, user_type: "Travelers" });
  }
  return (
    <main className="mt-4 min-h-screen px-4">
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
            <div className="w-full max-w-4xl">
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
                    <div className="text-sm leading-6 ">
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
                        <FormField
                          control={form.control}
                          name="birth_date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date of Birth</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
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
                        />
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
            <div className="w-full max-w-4xl">
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

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
    <main className="min-h-screent mt-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Admin Editing Page
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
          <Card>
            <CardHeader>
              <CardTitle>Host Profile Information</CardTitle>
              <CardDescription>Make changes to profile here.</CardDescription>
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
                    <Button type="submit" className="mt-10">
                      Verify
                    </Button>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

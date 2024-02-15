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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminVerifyProperties from "./AdminVerifyProperties";
import VerifyRoomCard from "@/components/verify/VerifyRoomCard";

const formSchema = z.object({
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
  phone_no: z
    .string()
    .length(10, "Invalid phone number format.")
    .regex(/^\d+$/, "Invalid phone number format."),
});

export default function AdminUnverifiedHostForm({
  unhost_id,
}: {
  unhost_id: string;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const mutation = trpc.verification.verifyHost.useMutation();
  const getHost = trpc.host.profile.findMany.useQuery({
    host_id: unhost_id || undefined,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutation.mutate({ admin_id: session?.user?.id, host_id: unhost_id });
    router.push("/");
  }
  return (
    <main className="min-h-screent mt-8 px-4">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Admin Verifying Page
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
                {/* <Image src={user} alt="" className="w-20 lg:w-16"></Image> */}
                <Image src="/User.svg" width={40} height={40} alt="user" />
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
                              <Input
                                placeholder="Firstname"
                                className="border border-black"
                                readOnly
                                {...field}
                              />
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
                              <Input
                                placeholder="Lastname"
                                className="border border-black"
                                readOnly
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                      name="phone_no"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Phone Number"
                              className="border border-black"
                              readOnly
                              {...field}
                            />
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
                            <Input
                              placeholder="Bank Account"
                              className="border border-black"
                              readOnly
                              {...field}
                            />
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
                            <Input
                              placeholder="Citizen ID"
                              className="border border-black"
                              readOnly
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="text-grey-800 mt-10 border border-black bg-[#F4EDEA] hover:text-white"
                    >
                      Verify
                    </Button>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>
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
                  <AdminVerifyProperties />
                  <VerifyRoomCard
                    title="Studio Rooms"
                    imageUrl="/room1.jpeg"
                    status="Verified"
                  />
                  <VerifyRoomCard
                    title="Deluxe Rooms"
                    imageUrl="/room2.jpeg"
                    status="Verified"
                  />
                  <VerifyRoomCard
                    title="Suites Rooms"
                    imageUrl="/room3.jpeg"
                    status="Unverified"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

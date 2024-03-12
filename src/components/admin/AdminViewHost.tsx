"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
//import { useSearchParams } from "react-router-dom";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import LoadingScreen from "@/components/ui/loading-screen";
import { trpc } from "@/lib/trpc/client";

const formSchema = z
  .object({
    host_id: z.string(),
    admin_id: z.string(),
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
  host_id?: string;
  admin_id?: string;
};

function HostProfileForm({ hostData }: { hostData: HostData }) {
  //const { data: session } = useSession();
  const router = useRouter();
  const verifyHost = trpc.verification.verifyHost.useMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      admin_id: hostData.admin_id,
      host_id: hostData.host_id,
      bank_account: hostData.bank_account,
      email: hostData.email,
      first_name: hostData.first_name,
      last_name: hostData.last_name,
      phone_no: hostData.phone_no,
    },
  });

  function onInvalid(errors: unknown) {
    console.error(errors);
  }

  function onSubmit() {
    verifyHost.mutate({
      host_id: hostData.host_id ? hostData.host_id : "",
      admin_id: hostData.admin_id ? hostData.admin_id : "",
    });
    router.push("/");
  }
  return (
    <main className="mt-4 min-h-screen px-4">
      <div className="mx-auto max-w-4xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Host Editing Page
        </h2>
      </div>
      <div className="flex justify-center">
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
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
                    onSubmit={form.handleSubmit(onSubmit, onInvalid)}
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
                              <Input {...field} readOnly />
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
                              <Input {...field} readOnly />
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
                            <Input {...field} readOnly />
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
                            <Input {...field} readOnly />
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
                            <Input {...field} readOnly />
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
        </div>
      </div>
    </main>
  );
}

export default function HostViewForm() {
  const queryParameters = new URLSearchParams(window.location.search);
  const hostDataQuery = trpc.host.profile.find.useQuery({
    host_id: queryParameters.get("host_id") || "",
  });

  const host_id = queryParameters.get("host_id");
  const admin_id = queryParameters.get("admin_id");
  if (hostDataQuery.status === "loading") {
    // return <div>Loading...</div>;
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }
  return (
    <HostProfileForm
      hostData={{
        host_id: host_id || "",
        admin_id: admin_id || "",
        bank_account: hostDataQuery.data?.bank_account ?? "",
        email: hostDataQuery.data?.users?.email,
        first_name: hostDataQuery.data?.users?.first_name ?? "",
        last_name: hostDataQuery.data?.users?.last_name ?? "",
        phone_no: hostDataQuery.data?.users?.phone_no ?? "",
      }}
    />
  );
}

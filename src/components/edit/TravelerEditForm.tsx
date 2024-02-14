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
import { trpc } from "@/lib/trpc/client";
import user from "/public/user.svg";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    first_name: z
      .string()
      .max(64, "Firstname must be less than 64 characters long."),
    last_name: z
      .string()
      .max(64, "Lastname must be less than 64 characters long."),
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

export default function TravelerEditForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const updatemutation = trpc.traveler.profile.update.useMutation();
  const getTraveler = trpc.traveler.profile.findMany.useQuery({
    traveler_id: session?.user?.id || undefined,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    updatemutation.mutate({ ...values, traveler_id: session?.user?.id });
    router.push("/");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   first_name: getTraveler?.data?.[0]?.users?.first_name || undefined,
    // },
  });
  return (
    <main className="min-h-screent mt-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Traveler Information Editing Form
        </h2>
      </div>
      {/* <p className="text-sm text-slate-500 dark:text-slate-400">Profile</p>
      <div className="items-left mt-0 flex flex-col justify-center gap-0 lg:flex-row lg:gap-6">
        <Image src={user} alt="" className="w-10 lg:w-8"></Image>
      </div> */}

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="mt-8 flex flex-col items-center justify-center gap-12 lg:flex-row lg:gap-6">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={
                          getTraveler?.data?.[0]?.users?.first_name || undefined
                        }
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
                        defaultValue={
                          getTraveler?.data?.[0]?.users?.last_name || undefined
                        }
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
              name="phone_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={
                        getTraveler?.data?.[0]?.users?.phone_no || undefined
                      }
                      {...field}
                    />
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
                    <Input
                      defaultValue={
                        getTraveler?.data?.[0]?.users?.email || undefined
                      }
                      {...field}
                    />
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

            <Button type="submit" className="mt-10">
              Save changes
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

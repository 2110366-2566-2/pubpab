"use client";
import { trpc } from "@/lib/trpc/client";

export default function HelloWorld() {
  const { data } = trpc.hello.useQuery();
  return <div>{data?.message}</div>;
}

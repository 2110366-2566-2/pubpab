"use client";
import TRPCProvider from "@/lib/trpc/Provider";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Providers = (props: Props) => {
  return (
    <TRPCProvider>
      <SessionProvider>{props.children}</SessionProvider>
    </TRPCProvider>
  );
};

export default Providers;

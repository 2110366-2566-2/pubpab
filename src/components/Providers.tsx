"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import TRPCProvider from "@/lib/trpc/Provider";

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

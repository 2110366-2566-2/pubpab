// pages/extra/extra.tsx
import phuket from "/public/phuket.png";
import ladprao from "/public/ladprao.png";
import pattaya from "/public/pattaya.png";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";

import React from "react";
import Properties from "@/components/hosts/properties";
const Extra = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div className="h-16 w-full bg-[#004B64]"></div>
      <div className="mx-auto flex max-w-prose flex-col justify-center">
        <Button variant="outline" className="flex justify-start">
          {" "}
          Need to Verify{" "}
        </Button>
        <Properties imageUrl={ladprao} />{" "}
        {/* Call the component and pass the imageUrl prop */}
        <Properties imageUrl={ladprao} />{" "}
        {/* Call the component and pass the imageUrl prop */}
      </div>
    </div>
  );
};
export default Extra;

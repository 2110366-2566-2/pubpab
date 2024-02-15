// pages/extra/extra.tsx

import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import React from "react";
import UnverifiedHost from "@/components/editDetails/verify/UnverifiedHost";

const Extra = async () => {
  // const session = await getServerSession(authOptions);

  return (
    <div>
      <div className="h-16 w-full bg-[#004B64]"></div>
      <div className="mx-auto flex max-w-prose flex-col justify-center">
        <Button variant="outline" className="flex justify-start">
          {" "}
          Need to Verify{" "}
        </Button>
        <UnverifiedHost imageUrl={"/public/chefSmart.png"} />{" "}
        <UnverifiedHost imageUrl={"/public/taengooTVselfie.jpg"} />{" "}
      </div>
    </div>
  );
};
export default Extra;

//add this to parama's part "Admin (Host Profile)"
// import pattaya from "/public/pattaya.png";
// import phuket from "/public/phuket.png";
// import ladprao from "/public/ladprao.png";
// import Properties2 from "@/components/hosts/properties2";
// return (
//   <div>
//     <div className="h-16 w-full bg-[#004B64]"></div>
//     <div className="mx-auto flex max-w-prose flex-col justify-center">
//       <Properties2 imageUrl={ladprao} />{" "}
//       <Properties2 imageUrl={pattaya} />{" "}

//     </div>
//   </div>
// );

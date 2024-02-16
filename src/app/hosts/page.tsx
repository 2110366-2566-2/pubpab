// pages/extra/extra.tsx

import chefSmart from "@/../public/chefSmart.png";
import ta from "@/../public/taengooTVselfie.jpg";
import { Button } from "@/components/ui/button";
import UnverifiedHost from "@/components/verify/UnverifiedHost";

const Extra = async () => {
  return (
    <div>
      <div className="h-16 w-full bg-[#004B64]"></div>
      <div className="mx-auto flex max-w-prose flex-col justify-center">
        <Button variant="outline" className="flex justify-start">
          {" "}
          Need to Verify{" "}
        </Button>
        <UnverifiedHost imageUrl={chefSmart} /> <UnverifiedHost imageUrl={ta} />{" "}
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

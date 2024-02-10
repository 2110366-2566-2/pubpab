import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Register from "@/components/Register";
import React from "react";
const Extra = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="my-12 flex justify-center">
      <Register />
    </div>
  );
};
export default Extra;

// pages/extra/extra.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import React from "react";
const Extra = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex items-center justify-center">
      <div className="mt-9 grid grid-cols-2 rounded bg-sky-700 p-2 text-slate-100 shadow">
        <p>Name:</p>
        <p>{session?.user?.name}</p>
        <p>Email:</p>
        <p>{session?.user?.email}</p>
        {/* <p>Role:</p>
        <p>{session?.user.role}</p> */}
      </div>
    </div>
  );
};
export default Extra;

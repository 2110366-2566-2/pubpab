// pages/extra/extra.tsx
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";
const Extra = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex items-center justify-center">
      <div className="mt-9 grid grid-cols-2 rounded bg-sky-700 p-2 text-slate-100 shadow">
        {/* <h1>Cannot access permission denied.</h1> */}
        <p>This role:</p>
        <p>{session?.user?.role}</p>
        <p>id:</p>
        <p>{session?.user?.id}</p>
        <p>name</p>
        {/* <p>{session?.user?.name}</p> */}
        {/* <p>Role:</p>
        <p>{session?.user.role}</p> */}
      </div>
    </div>
  );
};
export default Extra;

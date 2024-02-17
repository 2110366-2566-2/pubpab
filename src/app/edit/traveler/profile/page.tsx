import { getServerSession } from "next-auth";

import TravelerEditForm from "@/components/edit/profile/TravelerEditForm";
import { authOptions } from "@/lib/authOptions";

export default async function TravelerEditPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <h1 className="text-lg">Not logged in</h1>;
  }
  if (session.user.role !== "Travelers") {
    return <h1 className="text-lg">Not a host</h1>;
  }
  return (
    <div className="my-12 flex min-h-screen justify-center">
      <TravelerEditForm />
    </div>
  );
}

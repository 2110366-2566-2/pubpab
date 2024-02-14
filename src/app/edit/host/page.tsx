import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HostEditForm from "@/components/edit/HostEditForm";
import { getServerSession } from "next-auth";

export default async function HostEditPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <h1 className="text-lg">Not logged in</h1>;
  }
  if (session.user.role !== "Hosts") {
    return <h1 className="text-lg">Not a host</h1>;
  }
  return (
    <div className="my-12 flex justify-center">
      <HostEditForm />
    </div>
  );
}

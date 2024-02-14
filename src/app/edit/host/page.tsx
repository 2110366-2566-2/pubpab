import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HostEditForm from "@/components/edit/HostEditForm";
import { server } from "@/lib/trpc/serverClient";
import { getServerSession } from "next-auth";

export type HostData = {
  bank_account: string;
  first_name: string;
  last_name: string;
  phone_no: string;
  email: string;
};

export default async function HostEditPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <h1 className="text-lg">Not logged in</h1>;
  }
  if (session.user.role !== "Hosts") {
    return <h1 className="text-lg">Not a host</h1>;
  }
  const data = await server.host.profile.find({ host_id: session.user.id });
  const hostData: HostData = {
    bank_account: data.bank_account ?? "",
    first_name: data.users.first_name ?? "",
    last_name: data.users.last_name ?? "",
    phone_no: data.users.phone_no ?? "",
    email: data.users.email,
  };
  return (
    <div className="my-12 flex justify-center">
      <HostEditForm hostData={hostData} />
    </div>
  );
}

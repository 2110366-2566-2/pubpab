// import { getServerSession } from "next-auth";

import HostEditForm from "@/components/edit/profile/HostEditForm";
// import { authOptions } from "@/lib/authOptions";

export default async function HostEditProfilePage() {
  // const session = await getServerSession(authOptions);
  // if (!session?.user) {
  //   return <h1 className="text-lg">Not logged in</h1>;
  // }
  // if (session.user.role !== "Hosts") {
  //   return <h1 className="text-lg">Not a host</h1>;
  // }
  return (
    <div className="mx-auto my-12 flex max-w-3xl justify-center">
      <HostEditForm />
    </div>
  );
}

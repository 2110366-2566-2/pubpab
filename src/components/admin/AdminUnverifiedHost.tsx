/* eslint-disable react/jsx-key */
"use client";

import UnverifiedHostCard from "@/components/card/UnverifiedHostCard";
import { trpc } from "@/lib/trpc/client";

export default function AdminUnverifiedHost() {
  const unverifiedHost = trpc.verification.getUnverifiedHosts.useQuery().data;

  if (unverifiedHost == null) {
    return null;
  }

  const unverifiedHostData = unverifiedHost.map((host) => ({
    id: host.host_id,
    banner: host.users.banner,
    first_name: host.users.first_name,
    last_name: host.users.last_name,
    phone_no: host.users.phone_no,
  }));
  return (
    <div>
      {unverifiedHostData.map((property) => (
        <UnverifiedHostCard
          imageUrl={property.banner || ""}
          first_name={property.first_name || ""}
          last_name={property.last_name || ""}
        />
      ))}
      {/* <div className="mx-auto my-4 flex max-w-prose flex-col justify-center space-y-4 px-4">
        <label className="text-4xl font-bold">Unverified Host</label>
        <VerifyPropertyCard
          title="Menorca Hotel"
          imageUrl={"/Menorca.webp"}
          status="Verified"
        />
        <VerifyPropertyCard
          title="Bellagio Hotel"
          imageUrl={"/Bellagio.webp"}
          status="Unverified"
        />
        <VerifyPropertyCard
          title="East Hotel"
          imageUrl={"/easthotel.jpeg"}
          status="Verified"
        />
      </div> */}
    </div>
  );
}

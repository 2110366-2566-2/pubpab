"use-client";

import VerifyPropertyCard from "@/components/card/VerifyHostCard";

export default function AdminHostProperties() {
  return (
    <div>
      <div className="mx-auto my-4 flex max-w-prose flex-col justify-center space-y-4 px-4">
        <label className="text-4xl font-bold">My Properties</label>
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
      </div>
    </div>
  );
}

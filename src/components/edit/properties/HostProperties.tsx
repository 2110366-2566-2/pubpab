import Link from "next/link";

import PropertyAccomCard from "@/components/card/PropertyAccomCard";

export default function HostProperties() {
  return (
    <div className="px-4 py-4">
      <div className="mb-4">
        <Link href="/edit/host/accomodation">
          <PropertyAccomCard
            title="Menorca Hotel"
            imageUrl={"/Menorca.webp"}
            status="Opened"
          />
        </Link>
      </div>
      <div className="mb-4">
        {" "}
        {/* Add margin bottom of 4 */}
        <Link href="/edit/host/accomodation">
          <PropertyAccomCard
            title="Bellagio Hotel"
            imageUrl={"/Bellagio.webp"}
            status="Closed"
          />
        </Link>
      </div>
      <div className="mb-4">
        {" "}
        {/* Add margin bottom of 4 */}
        <Link href="/edit/host/accomodation">
          <PropertyAccomCard
            title="East Hotel"
            imageUrl={"/easthotel.jpeg"}
            status="Opened"
          />
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";

import PropertyCard from "@/components/propertycard/PropertyCard";

export default function HostProperties() {
  return (
    <div className="px-4 py-4">
      <div className="mb-4">
        <Link href="/editDetails/properties/host">
          <PropertyCard
            title="Menorca Hotel"
            imageUrl={"/Menorca.webp"}
            status="Opened"
          />
        </Link>
      </div>
      <div className="mb-4">
        {" "}
        {/* Add margin bottom of 4 */}
        <Link href="/editDetails/properties/host">
          <PropertyCard
            title="Bellagio Hotel"
            imageUrl={"/Bellagio.webp"}
            status="Closed"
          />
        </Link>
      </div>
      <div className="mb-4">
        {" "}
        {/* Add margin bottom of 4 */}
        <Link href="/editDetails/properties/host">
          <PropertyCard
            title="East Hotel"
            imageUrl={"/easthotel.jpeg"}
            status="Opened"
          />
        </Link>
      </div>
    </div>
  );
}

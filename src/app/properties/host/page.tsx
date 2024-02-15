import HostEditProperties from "@/components/properties/HostEditProperties";
import PropertyRoomCard from "@/components/propertycard/PropertyRoomCard";
export default async function HostEditPropertiesPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col space-y-8">
        <div>
          <HostEditProperties />
        </div>
      </div>
    </div>
  );
}

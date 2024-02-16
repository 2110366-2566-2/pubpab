import HostEditProperties from "@/components/properties/HostEditProperties";
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

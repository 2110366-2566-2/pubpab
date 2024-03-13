import HostEditAccommodationForm from "@/components/edit/accommodation/HostEditAccommodationForm";

export default async function HostEditAccommodationPage({
  searchParams,
}: {
  searchParams: {
    accommodation_id: string;
  };
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <HostEditAccommodationForm
          accommodation_id={searchParams.accommodation_id}
        />
      </div>
    </div>
  );
}

import HostEditAccomodationForm from "@/components/edit/accomodation/HostEditAccomodationForm";

export default async function HostEditAccomodationPage({
  searchParams,
}: {
  searchParams: {
    accommodation_id: string;
  };
}) {
  console.log(searchParams.accommodation_id);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <HostEditAccomodationForm
          accommodation_id={searchParams.accommodation_id}
        />
      </div>
    </div>
  );
}

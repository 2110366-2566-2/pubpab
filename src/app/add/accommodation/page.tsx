import AccomodationAddForm from "@/components/add/accommodation/AccommodationAddForm";

export default async function AccommodationAddPage() {
  return (
    <div className="flex justify-center px-4 py-12">
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col space-y-8">
          <div>
            <AccomodationAddForm />
          </div>
        </div>
      </div>
    </div>
  );
}
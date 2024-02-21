import HostEditAccomodationForm from "@/components/edit/accomodation/HostEditAccomodationForm";

export default async function HostEditAccomodationPage() {
  const divElement = document.querySelector(".relative.rounded-lg.bg-white.shadow-md");
  const id = divElement?.getAttribute("data-accom-id");
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <HostEditAccomodationForm
          accommodation_id = {id? id : ""}
        />
      </div>
    </div>
  );
}
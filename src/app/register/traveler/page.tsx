import TravelerRegisterForm from "@/components/register/TravelerRegisterForm";

export default async function TravelerRegisterPage() {
  return (
    <div className="flex justify-center px-4 py-12">
      <div className="flex min-h-screen max-w-sm grow">
        <TravelerRegisterForm />
      </div>
    </div>
  );
}

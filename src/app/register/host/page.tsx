import HostRegisterForm from "@/components/register/HostRegisterForm";

export default async function HostRegisterPage() {
  return (
    <div className="flex min-h-screen justify-center px-4 py-12">
      <div className="flex max-w-sm grow">
        <HostRegisterForm />
      </div>
    </div>
  );
}

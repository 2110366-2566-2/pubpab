import HostRegisterForm from "@/components/register/HostRegisterForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function HostRegisterPage() {
  return (
    <div className="ietms-center my-12 flex min-h-screen justify-center px-4 py-12">
      <Link href="/register/" className="pr-10">
        <Button
          type="submit"
          className="text-grey-800 border border-black bg-[#F4EDEA] hover:text-white"
        >
          Back
        </Button>
      </Link>
      <div className="flex max-w-sm grow">
        <HostRegisterForm />
      </div>
    </div>
  );
}

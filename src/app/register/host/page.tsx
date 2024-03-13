import Link from "next/link";

import HostRegisterForm from "@/components/register/HostRegisterForm";
import { Button } from "@/components/ui/button";

export default async function HostRegisterPage() {
  return (
    <div className="my-12 flex min-h-screen items-center justify-center px-4 py-12">
      <div className="inline-block">
        <Link href="/register/" className="pr-10">
          <Button
            type="submit"
            className="text-grey-800 bg-[#F4EDEA] hover:text-white"
          >
            Back
          </Button>
        </Link>
      </div>
      <div className="flex max-w-sm grow">
        <HostRegisterForm />
      </div>
    </div>
  );
}

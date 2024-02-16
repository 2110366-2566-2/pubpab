import Link from "next/link";

import TravelerRegisterForm from "@/components/register/TravelerRegisterForm";
import { Button } from "@/components/ui/button";

export default async function TravelerRegisterPage() {
  return (
    <div className="flex justify-center px-4 py-12">
      <Link href="/register/" className="pr-10">
        <Button
          type="submit"
          className="text-grey-800 bg-[#F4EDEA] hover:text-white"
        >
          Back
        </Button>
      </Link>
      <div className="flex min-h-screen max-w-sm grow">
        <TravelerRegisterForm />
      </div>
    </div>
  );
}

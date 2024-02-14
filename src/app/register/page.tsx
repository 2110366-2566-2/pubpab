import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function RegisterPage() {
  return (
    <div className="my-12 flex flex-col items-center gap-6">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
          Who are you?
        </h2>
      </div>
      <div className="flex gap-6">
        <Link href="/register/host">
          <Button
            type="submit"
            className="text-grey-800 border border-black bg-[#F4EDEA] hover:text-white"
          >
            Host
          </Button>
        </Link>
        <Link href="/register/traveler">
          <Button
            type="submit"
            className="text-grey-800 border border-black bg-[#F4EDEA] hover:text-white"
          >
            Traveler
          </Button>
        </Link>
      </div>
    </div>
  );
}

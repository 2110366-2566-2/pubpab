import Link from "next/link";

import TravelerRegisterForm from "@/components/register/TravelerRegisterForm";
import { Button } from "@/components/ui/button";
import AccomodationAddForm from "@/components/add/accommodation/AccommodationAddForm";

export default async function TravelerRegisterPage() {
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

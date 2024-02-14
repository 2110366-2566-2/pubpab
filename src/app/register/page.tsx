import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function RegisterPage() {
  return (
    <div className="my-12 flex flex-col items-center gap-6">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Who are you?
        </h2>
      </div>
      <div className="flex gap-6">
        <Link href="/register/host" className="hover:text-slate-600">
          <Button type="submit">Host</Button>
        </Link>
        <Link href="/register/traveler" className="hover:text-slate-600">
          <Button type="submit">Traveler</Button>
        </Link>
      </div>
    </div>
  );
}

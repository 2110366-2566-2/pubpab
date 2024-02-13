import Link from "next/link";

export default async function RegisterPage() {
  return (
    <div className="my-12 flex flex-col items-center gap-6">
      <h1>Who are you?</h1>
      <div className="flex gap-6">
        <Link href="/register/host" className="hover:text-slate-600">
          Host
        </Link>
        <Link href="/register/traveler" className="hover:text-slate-600">
          Traveler
        </Link>
      </div>
    </div>
  );
}
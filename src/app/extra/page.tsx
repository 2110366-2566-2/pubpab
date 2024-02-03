// pages/extra/extra.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/option";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section>
      <h1>Home</h1>
      <h1>Server Side Rendered</h1>
      <pre>{JSON.stringify(session)}</pre>
      <h1>Client Side Rendered</h1>
    </section>
  );
}

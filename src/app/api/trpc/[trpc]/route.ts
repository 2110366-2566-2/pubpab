import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    onError: ({ path, error }) => {
      console.error(
        `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
      );
    },
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };

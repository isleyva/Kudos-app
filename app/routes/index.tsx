import { requierUserId } from "~/utils/auth.server";
import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  await requierUserId(request);
  return null;
}

export default function Index() {
  return (
    <div className="h-screen w-full bg-red-4">
      <h1 className="font-bold">Index</h1>

    </div>
  );
}

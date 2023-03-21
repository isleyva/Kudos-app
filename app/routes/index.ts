import { requierUserId } from "~/utils/auth.server";
import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  await requierUserId(request);
  return redirect("/home");
};

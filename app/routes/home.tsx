import { requierUserId } from "~/utils/auth.server";
import { LoaderFunction, json } from "@remix-run/node";
import { UserPanel } from "~/components/user-pannel";
import { Layout } from "~/components/Layout";
import { getOtherUsers } from '../utils/users.server';
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requierUserId(request);
    const users = await getOtherUsers(userId);
    return json({ users })
}


export default function Home() {
    const { users } = useLoaderData();
    console.log(users)
    return (

        <Layout>
            <div className="h-full flex">
                <UserPanel users={users} />
            </div>

        </Layout>
    );
}

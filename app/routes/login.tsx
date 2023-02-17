import { Layout } from "~/components/Layout";
import { FormField } from "~/components/Form-field";
import { useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        fiel: string
    ) => {
        setFormData((form) => ({
            ...form,
            [fiel]: event.target.value,
        }));
    };

    return (
        <Layout>
            <div className="h-full flex justify-center items-center flex-col gap-y-4 ">
                <h2 className="text-5xl font-extrabold text-yellow-300">
                    Welcome to Kudos!
                </h2>
                <p className="font-semibold text-slate-300">
                    Log In To Give Some Praise!
                </p>
                <form method="post" className="rounded-2xl bg-gray-200 p-6 w-96" >
                    <FormField
                        htmlFor="email"
                        label="Email"
                        value={formData.email}
                        onChange={e => handleInputChange(e, "email")}
                    />
                    <FormField
                        htmlFor="password"
                        label="Password"
                        value={formData.password}
                        onChange={e => handleInputChange(e, "password")}
                        type="password"
                    />

                    <div className="w-full text-center">
                        <input
                            type="submit"
                            className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
                            value="Sign In"

                        />
                    </div>
                </form>
            </div>
        </Layout>
    );
}
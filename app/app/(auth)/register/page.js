
import { redirect } from "next/navigation";
import FormPage from "./form";
import { auth } from "@/auth";

export default async function RegisterPage() {
    const session = await auth()

    if (session) {
        redirect("/");
    }

    return (
        <main className="h-screen grid grid-cols-1 md:grid-cols-2 items-center justify-center">
            <div className="hidden md:flex h-full justify-center items-center border-r">Hello</div>
            <div className="flex h-full justify-center items-center">
                <FormPage />
            </div>
        </main>
    );
}
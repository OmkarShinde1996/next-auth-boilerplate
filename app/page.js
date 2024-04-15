
import { auth } from "@/auth";
import LoginLogoutButton from "@/components/global/LoginLogoutButton";

export default async function Home() {
  const session = await auth()
  return (
    <main className="flex flex-col gap-2 h-screen justify-center items-center">
        <LoginLogoutButton session={session}/>
    </main>
  );
}

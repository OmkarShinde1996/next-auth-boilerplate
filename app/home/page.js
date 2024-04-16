
import { auth } from "@/auth";
import LoginLogoutButton from "@/components/global/LoginLogoutButton";
import { getUserByEmailOnServer } from "@/lib/queries";

export default async function Home() {
  const session = await auth()
  let user = null
  if(session){
    user = await getUserByEmailOnServer(session?.user?.email)
  }
  return (
    <main className="flex flex-col gap-2 h-screen justify-center items-center">
        <LoginLogoutButton session={session} user={user}/>
    </main>
  );
}

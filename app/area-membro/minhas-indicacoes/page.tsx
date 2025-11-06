import { cookies } from "next/headers";
import CardReferral from "./components/cardReferral";
import { ButtonBack } from "./components/buttonBack";

export default async function MinhasIndicacoes() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("userLogged");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

 return (
   <div className="bg-black/25 min-h-screen p-4 relative">
    <div className="flex absolute top-4 right-4 gap-2">
      <ButtonBack />
    </div>
    <div className="mt-5 lg:max-w-5xl lg:mx-auto lg:mt-10">
        <h1 className="font-bold lg:text-2xl">Minhas indicações</h1>

        <CardReferral user={user} />
    </div>
   </div>
 );
}

import { cookies } from "next/headers";
import IndicationForm from "./components/indicationForm";
import ButtonLogout from "./components/buttonLogout";
import ButtonMyIndications from "./components/buttonMyIndications";



export default async function AreaMembro() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("userLogged");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

 return (
   <div className="bg-black/25 min-h-screen p-4 relative">
    <div className="lg:mx-auto lg:max-w-5xl">
      <div className="mb-8 mt-10">
        <h1 className="font-bold lg:text-2xl">Área do Membro</h1>
        <p className="text-base">Olá, seja bem-vindo <strong>{user.nome}</strong> à área exclusiva para membros!</p>
      <div className="flex absolute top-4 right-4 gap-2">
        <ButtonMyIndications />
        <ButtonLogout />
      </div>
      </div>
        <span className="flex mt-[30px] font-medium text-lg">Indicação de negócio</span>
    <IndicationForm user={user} />
    </div>
   </div>
 );
}
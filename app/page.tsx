import ButtonAreaMembro from "./components/button";
import IntentForm from "./components/intentForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-black/25 relative">
      <div className="absolute top-4 right-4">
        <ButtonAreaMembro />
      </div>
      <div className="px-4 lg:max-w-5xl lg:mx-auto">
        <h1 className="pt-12 font-bold lg:text-2xl">Página de intenção</h1>
          <IntentForm />

      </div>
    </div>

  );
}

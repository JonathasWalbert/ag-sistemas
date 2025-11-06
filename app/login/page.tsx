import LoginForm from "./components/loginForm";

export default function Login() {
 return (
   <div className="min-h-screen flex items-center justify-between bg-black/25">
    <div className="p-4 lg:mx-auto lg:max-w-2xl w-full">
        <LoginForm />
    </div>
   </div>
 );
}
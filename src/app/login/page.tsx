import Image from "next/image";
import { LoginForm } from "./_components/login-form";

export default function Login() {
  return (
    <div className="h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-auto p-4 md:p-8">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Welcome to Protocol</h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Protocol Smart Accounts are secured with Passkeys. Passkeys are a passwordless authentication method that
            provides a more secure and convenient alternative to traditional passwords or seed phrases
          </p>
          <LoginForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

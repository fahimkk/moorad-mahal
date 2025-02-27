import { LoginForm } from "@/components/shared-components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mahal | Login",
};

export default function Page() {
  return (
    <div className="flex mt-20 w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
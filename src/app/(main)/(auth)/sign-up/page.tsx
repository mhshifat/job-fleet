import SignUpForm from "@/components/modules/auth/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobFleet | Register",
  description: "Create a new account",
};

export default function SignUpPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center relative">
      <h3 className="text-xl font-black font-geist-mono text-primary text-left self-start">Register</h3>
      
      <SignUpForm />
    </div>
  )
}
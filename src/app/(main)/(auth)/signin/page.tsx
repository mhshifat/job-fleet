import SigninForm from "@/components/modules/auth/signin-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobFleet | Login",
  description: "Login to your account",
};

export default function SigninPage() {
  return (
    <div>
      <h3 className="text-xl font-black font-geist-mono text-primary">Login</h3>
      
      <SigninForm />
    </div>
  )
}
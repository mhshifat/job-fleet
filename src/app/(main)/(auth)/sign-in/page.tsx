import SigninForm from "@/components/modules/admin/auth/signin-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobFleet | Login",
  description: "Login to your account",
};

export default function SigninPage() {
  return (
    <div>
      <h3 className="text-xl font-black font-geist-mono text-primary">Login</h3>
      <p className="text-xl font-semibold font-geist-mono text-foreground/50 mt-1">Welcome Back!</p>

      <SigninForm />
    </div>
  )
}
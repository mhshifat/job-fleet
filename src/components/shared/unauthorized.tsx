import Link from "next/link";
import Button from "../ui/button";

export default function Unauthorized() {
  return (
    <div className="flex flex-col gap-1 h-screen justify-center items-center bg-background">
      <h1 className="font-archivo text-6xl font-normal text-foreground/50">Unauthorized</h1>
      <Link href="/">
        <Button variant="link">Go Home</Button>
      </Link>
    </div>
  )
}
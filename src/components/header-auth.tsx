import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function AuthButton({isAuthenticated}: {isAuthenticated: boolean}) {

  return isAuthenticated ? (
    <div className="flex items-center gap-4">
      Hey, there!
      <Button onClick={signOutAction} variant={"outline"}>
        Sign out
      </Button>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}

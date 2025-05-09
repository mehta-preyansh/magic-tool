import Link from "next/link";
import { Button } from "./ui/button";
import SignOutButton from "./sign-out-button";

export default function AuthButton({isAuthenticated}: {isAuthenticated: boolean}) {
  return isAuthenticated ? (
    <div className="flex items-center gap-4">
      Hey, there!
      <SignOutButton />
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

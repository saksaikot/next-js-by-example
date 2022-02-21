import Link from "next/link";
import { useQueryClient } from "react-query";

import { useSignOut, useUser } from "../hooks/user";
// import { fetchJson } from "../lib/api";

export default function NavBar() {
  const user = useUser();
  const { signOut } = useSignOut();
  const queryClient = useQueryClient();
  const handleSignOut = async () => signOut();
  return (
    <nav className="py-3 px-2 shadow-sm ">
      <ul className="flex justify-between">
        <li className=" text-lg font-semibold">
          <Link href="/">
            <a>Next Shop</a>
          </Link>
        </li>
        {user ? (
          <li>
            <span className="mr-3">{user.name}</span>
            <span>
              <button onClick={handleSignOut}>Sign out</button>
            </span>
          </li>
        ) : (
          <li>
            <Link href="/sign-in">
              <a>Sign in</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

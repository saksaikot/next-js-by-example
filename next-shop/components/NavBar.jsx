import Link from "next/link";
import { useQueryClient } from "react-query";
import { useSetCartOpen } from "../hooks/pages";

import { useSignOut, useUser } from "../hooks/user";
// import { fetchJson } from "../lib/api";

export default function NavBar() {
  const user = useUser();
  const { signOut } = useSignOut();

  const { setCartOpen } = useSetCartOpen();
  const handleSignOut = async () => signOut();
  return (
    <nav className="py-3 px-2 shadow-sm ">
      <ul className="flex justify-between gap-3">
        <li className=" text-lg font-semibold">
          <Link href="/">
            <a>Next Shop</a>
          </Link>
        </li>
        <li className="flex-1"></li>
        {user ? (
          <>
            <li>
              <button onClick={() => setCartOpen(true)}>Cart Items</button>
            </li>
            <li className="mr-3">{user.name}</li>
            <li>
              <button onClick={handleSignOut}>Sign out</button>
            </li>
          </>
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

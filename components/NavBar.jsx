import Link from "next/link";

import { useUser } from "../hooks/user";

export default function NavBar() {
  const user = useUser();
  const handleSignOut = async () => {
    const response = await fetchJson("/api/logout");
    // setUser(undefined);
  };
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

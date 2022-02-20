import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchJson } from "../lib/api";
export default function NavBar() {
  const [user, setUser] = useState();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetchJson("/api/user");
        setUser(response);
      } catch (error) {}
    })();
  }, []);
  return (
    <nav className="py-3 px-2">
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
              <button>Sign out</button>
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

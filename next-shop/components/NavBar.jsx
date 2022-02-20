import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "react-query";
import { fetchJson } from "../lib/api";
const FIVE_MINUTES = 60 * 5 * 100;

export default function NavBar() {
  const { data: user } = useQuery(
    "user",
    async () => {
      try {
        const response = await fetchJson("/api/user");
        return response;
      } catch (error) {
        return undefined;
      }
    },
    {
      staleTime: FIVE_MINUTES,
      cacheTime: Infinity,
    }
  );
  // const [user, setUser] = useState();
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await fetchJson("/api/user");
  //       setUser(response);
  //     } catch (error) {}
  //   })();
  // }, []);
  const handleSignOut = async () => {
    const response = await fetchJson("/api/logout");
    // setUser(undefined);
  };
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

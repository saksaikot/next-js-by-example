import React from "react";
import Link from "next/link";
export default function NavBar() {
  const user = undefined;
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
            <span className="mr-3">{user}</span>
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

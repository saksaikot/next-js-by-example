import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
      </ul>
      <style jsx>{`
        ul {
          list-style: none;
          display: flex;
          gap: 1rem;
          padding: 0;
        }
      `}</style>
    </nav>
  );
}

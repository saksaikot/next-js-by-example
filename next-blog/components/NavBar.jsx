import Link from "next/link";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";

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
      <ThemeSwitch />
      <style jsx>{`
        ul {
          list-style: none;
          display: flex;
          gap: 1rem;
          padding: 0;
        }
        nav {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </nav>
  );
}

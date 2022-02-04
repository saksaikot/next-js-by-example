import React from "react";
import Link from "next/link";

export default function index() {
  console.log("[Index page] rendered");
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>My blog</h2>
      </main>
    </>
  );
}

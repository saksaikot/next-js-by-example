import React from "react";
import Link from "next/link";
import NavBar from "../components/NavBar";

export default function index() {
  console.log("[Index page] rendered");
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h2>My blog</h2>
      </main>
    </>
  );
}

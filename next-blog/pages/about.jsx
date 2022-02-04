import React from "react";
import NavBar from "../components/NavBar";

export default function AboutPage() {
  console.log("[About page] rendered");

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h2>About page</h2>
      </main>
    </>
  );
}

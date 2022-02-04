import React from "react";
import NavBar from "../components/NavBar";

export default function _app({ Component, pageProps }) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Component {...pageProps} />
    </>
  );
}
